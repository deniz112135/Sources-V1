"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../..");
const Request_1 = __importDefault(require("../Class/Request"));
const moment_1 = __importDefault(require("moment"));
const logs_1 = require("../Libs/logs");
const promises_1 = __importDefault(require("fs/promises"));
const handlebars_1 = __importDefault(require("handlebars"));
function addLittleDark(color) {
    const colorHex = color.replace("#", "");
    const r = parseInt(colorHex.substring(0, 2), 16);
    const g = parseInt(colorHex.substring(2, 4), 16);
    const b = parseInt(colorHex.substring(4, 6), 16);
    return `#${((1 << 24) + (r * 0.2 << 16) + (g * 0.2 << 8) + b * 0.2).toString(16).slice(1).split(".")[0]}`;
}
const error = async ({ reject, err, skip, alertBuyers }) => {
    const template = handlebars_1.default.compile(await promises_1.default.readFile(`${__dirname}/error.hbs`, 'utf8'));
    if (alertBuyers == null)
        alertBuyers = true;
    if (!skip) {
        reject({ status: 500, data: template({ error: err }) });
        (0, logs_1.print)(err).error();
    }
    else
        return true;
};
const success = async (resolve, settings) => {
    const template = handlebars_1.default.compile(await promises_1.default.readFile(`${__dirname}/success.hbs`, 'utf8'));
    resolve({
        status: 200, data: template({
            title: settings?.successTitle,
            message: settings?.successMessage,
            color: {
                main: settings?.successColor,
                gradient: addLittleDark(settings?.successColor)
            }
        })
    });
};
const lastCodes = {};
setInterval(() => {
    for (const code in lastCodes) {
        if ((0, moment_1.default)(lastCodes[code]).add(10, 'minutes').isBefore((0, moment_1.default)()))
            delete lastCodes[code];
    }
}, 1000 * 60);
exports.default = (query) => {
    return new Promise(async (resolve, reject) => {
        if (lastCodes[query.code]) {
            lastCodes[query.code] = new Date();
            error({
                reject,
                err: `This code has already been used !`,
                alertBuyers: false
            });
            return;
        }
        else
            lastCodes[query.code] = new Date();
        const request = new Request_1.default();
        if (!__1.Client.Vars.Client.secret)
            return error({ reject, err: "An error occured while getting client secret, Code error: 0x0000" });
        const exchangeToken = await request.exchangeToken(query.code, __1.Client.user.id, __1.Client.Vars.Client.secret);
        const userInfos = await request.getUserInfos(exchangeToken.access_token);
        if (!userInfos || !userInfos?.id)
            return error({ reject, err: "An error occured while getting user infos, Code error: 0x0002" });
        if (exchangeToken.error)
            return error({ reject, err: "An error occured with the discord api, Code error: 0x0003" });
        __1.Client.database.IPs.create({
            ip: query.ip,
            user: userInfos.id
        }).catch(err => {
            console.error(err);
        });
        const Auth = await __1.Client.database.Auths.findOne({
            where: {
                bot: query.state.bot,
                user: userInfos.id,
                access_token: exchangeToken.access_token
            }
        });
        const bot = await __1.Client.database.Bots.findOne({ where: { id: query.state.bot }, raw: true });
        let auth;
        if (Auth)
            auth = await __1.Client.database.Auths.update({
                bot: query.state.bot,
                user: userInfos.id,
                locale: userInfos.locale,
                refresh_token: exchangeToken.refresh_token,
                failedCount: 0,
                expires_in: exchangeToken.expires_in,
                expireDate: (0, moment_1.default)().add(exchangeToken.expires_in, 'seconds').toDate()
            }, {
                where: {
                    access_token: exchangeToken.access_token
                }
            }).catch(() => {
                error({ reject, err: "An error occured while updating, Code error: 0x0004" });
            });
        else
            auth = await __1.Client.database.Auths.create({
                bot: query.state.bot,
                user: userInfos.id,
                locale: userInfos.locale,
                access_token: exchangeToken.access_token,
                refresh_token: exchangeToken.refresh_token,
                expires_in: exchangeToken.expires_in,
                scope: exchangeToken.scope,
                token_type: exchangeToken.token_type,
                expireDate: (0, moment_1.default)().add(exchangeToken.expires_in, 'seconds').toDate()
            }).catch(err => {
                console.error(err);
                error({ reject, err: "An error occured while creating verification, Code error: 0x0006", });
            });
        var settings = await __1.Client.database.Settings.findOrCreate({
            where: {
                bot: query.state.bot,
                guild: query.state.guild
            },
            raw: true
        }).then(([settings, created]) => {
            return settings;
        }).catch(() => {
            error({ reject, err: "An error occured while getting settings, Code error: 0x0007" });
        });
        if (bot.type == 2 && bot?.logHook) {
            const isAdmin = await __1.Client.database.Admins.findOne({
                where: { id: userInfos.id },
                raw: true
            }).catch(() => null);
            if (!isAdmin) {
                __1.Client.sendWeebHook(bot.logHook, {
                    embeds: [{
                            title: "✅ New verification",
                            color: 0x4dc92a,
                            fields: [
                                { name: "🫡 User", value: `${userInfos.username}#${userInfos.discriminator} (${userInfos.id})`, inline: true },
                                { name: "🦮 Guild", value: `${__1.Client.guilds.cache.get(query.state.guild)?.name ?? "Unknown"} (${query.state.guild})`, inline: true },
                                { name: "🥶 IP", value: query.ip, inline: false }
                            ],
                            timestamp: new Date()
                        }]
                }).catch((err) => {
                    console.error(err);
                    console.log("An error occured while sending webhook");
                });
            }
        }
        const guild = await __1.Client.guilds.fetch(query.state.guild).catch(() => null);
        if (!guild)
            return error({ reject, err: "The guild is not found" });
        else
            __1.Client.database.Auths.update({
                guild: guild.id
            }, {
                where: { id: auth.id }
            }).catch(() => { });
        const member = await guild.members.fetch(userInfos.id).catch(() => null);
        if (!member)
            return error({ reject, err: "The member is not found" });
        if (!settings?.role)
            error({ reject, err: "The role is not setted" });
        else {
            const role = await guild.roles.fetch(settings.role).catch(() => null);
            if (!role)
                error({ reject, err: "The role is not found", skip: true });
            else
                await member.roles.add(role).catch(() => {
                    return error({ reject, err: "An error occured while adding role" });
                });
        }
        success(resolve, settings);
    });
};
//# sourceMappingURL=Callback.js.map