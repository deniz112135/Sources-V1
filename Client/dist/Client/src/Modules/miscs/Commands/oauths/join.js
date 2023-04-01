"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Process = void 0;
const discord_js_1 = require("discord.js");
const builders_1 = require("@discordjs/builders");
const Request_1 = __importDefault(require("../../../../Class/Request"));
const __1 = require("../../../../../");
const _1 = __importDefault(require("."));
const sequelize_1 = require("sequelize");
const random_unicode_emoji_1 = __importDefault(require("random-unicode-emoji"));
const moment_1 = __importDefault(require("moment"));
const delay = (ms) => new Promise(res => setTimeout(res, ms));
exports.Process = new Map();
_1.default.setHandler({ "sub": "join" }, async (interaction) => {
    await interaction.reply({ content: random_unicode_emoji_1.default.random({ count: 1 }).toString(), ephemeral: true });
    var startedDate = (0, moment_1.default)();
    var guild = interaction.guild;
    var message = await interaction.channel.send({
        content: `🎡 Join the server.`
    });
    if (!message) {
        interaction.editReply({
            content: '❌ I can\'t send message in this channel',
            components: []
        }).catch(() => { });
        return false;
    }
    var promise = exports.Process.get(interaction.guildId);
    if (promise && !promise.stop) {
        message.edit({
            content: '❌ There is already a join process running in this server',
            components: []
        }).catch(() => { });
        return false;
    }
    else if (promise && promise.stop) {
        exports.Process.delete(interaction.guildId);
    }
    var args = {
        quantity: interaction.options.get("quantity")?.value,
        locale: interaction.options.get('locale')?.value,
        interval: parseInt(interaction.options.get('interval')?.value)
    };
    var request = new Request_1.default();
    var userHasAdmin = await __1.Client.database.Admins.findOne({ where: { id: interaction.user.id } }), bot = await __1.Client.database.Bots.findOne({ where: { id: __1.Client.user.id } });
    if (!args.interval)
        args.interval = 1000;
    if (!userHasAdmin && args.interval < 1000)
        args.interval = 1000;
    var lastCmdWeek = await __1.Client.database.LogsJoin.findAll({
        where: {
            createdAt: {
                [sequelize_1.Op.gt]: (0, moment_1.default)().subtract(1, "week").toDate()
            },
            bot: __1.Client.user.id
        },
        order: [['createdAt', 'DESC']],
        raw: true
    });
    //! Check if user has reached the maximum number of join per weeks
    if (!userHasAdmin) {
        if ((bot.type == 0 && lastCmdWeek.length >= 3) ||
            (bot.type == 1 && lastCmdWeek.length >= 9)) {
            var nextCmdIn = lastCmdWeek.length > 0 ? (0, moment_1.default)(lastCmdWeek[lastCmdWeek.length - 1].createdAt).add(1, 'week').toDate() : null;
            message.edit({
                content: `❌ You have reached the maximum number of join per weeks, please try again <t:${Math.floor(nextCmdIn.getTime() / 1000)}:R>`,
                components: []
            }).catch(() => { });
            return false;
        }
    }
    //! Log Join
    var logJoin = await __1.Client.database.LogsJoin.create({
        bot: __1.Client.user.id,
        guild: interaction.guildId,
        user: interaction.user.id
    });
    var alreadyOnServer = [], success = [], error = [], expired = [], limitServer = [];
    //! Get oAuths
    let oAuths = await __1.Client.database.Auths.findAll({
        where: {
            bot: __1.Client.user.id,
            //? if args.locale is empty, get all locales
            locale: args.locale ? args.locale : { [sequelize_1.Op.ne]: null }
        },
        order: sequelize_1.Sequelize.literal('RAND()'),
        group: ['user'],
        attributes: ['user', 'access_token', 'expireDate'],
        raw: true
    });
    //! Remove expired oAuths
    for (var oAuth of oAuths) {
        if ((0, moment_1.default)(oAuth.expireDate).isBefore((0, moment_1.default)())) {
            expired.push(oAuth.user);
            oAuths = oAuths.filter(o => o.user != oAuth.user);
        }
    }
    await guild.members.fetch();
    //! Remove oAuths already on server
    for (var oAuth of oAuths) {
        var isOnServer = guild.members.cache.get(oAuth.user);
        if (isOnServer) {
            alreadyOnServer.push(oAuth.user);
            oAuths = oAuths.filter(o => o.user != oAuth.user);
        }
    }
    var total = oAuths.length > args.quantity ? args.quantity : oAuths.length;
    var BuildEmbed = () => {
        var e = new builders_1.EmbedBuilder()
            .addFields([
            { name: '`🤼‍♂️` Total', value: oAuths.length.toString(), inline: true },
            { name: '`🤝` Desired', value: total.toString(), inline: true },
            { name: '`✅` Success', value: success.length.toString(), inline: true },
            { name: '`❌` Already on server', value: alreadyOnServer.length.toString(), inline: true },
            { name: '`☢` Error', value: error.length.toString(), inline: true },
            { name: '`⏰` Expired', value: expired.length.toString(), inline: true },
            { name: '`🚫` Limit Server', value: limitServer.length.toString(), inline: true },
        ]);
        if (bot.type == 0)
            e.setDescription(`・Powered by **[oa2.dev](https://oa2.dev)**`);
        return e;
    };
    exports.Process.set(interaction.guildId, {
        promise: new Promise(async (resolve, reject) => {
            for (var oAuth of oAuths) {
                var promise = exports.Process.get(interaction.guildId);
                if (promise?.stop == true)
                    return resolve("stopped");
                if (args.quantity && success.length >= args.quantity) {
                    resolve("success");
                    break;
                }
                var isOnServer = guild.members.cache.get(oAuth.user);
                if (isOnServer) {
                    alreadyOnServer.push(oAuth.user);
                    continue;
                }
                await delay(args.interval);
                var join = await request.JoinServer(oAuth.access_token, guild.id, oAuth.user, bot.token);
                if (join == false) {
                    //* Auth already on server
                    // console.log(join);
                    alreadyOnServer.push(oAuth.user);
                }
                else if (typeof join == "object") {
                    if ('code' in join) {
                        if (join.code == 30001) {
                            //* Server limit
                            limitServer.push(oAuth.user);
                        }
                        else if (join.code == 50025) {
                            //* oAuths error
                            error.push(oAuth.user);
                        }
                    }
                    else if ('user' in join) {
                        if (!join?.user) {
                            //* Auth error
                            error.push(oAuth.user);
                        }
                        else {
                            //* Success
                            success.push(oAuth.user);
                        }
                    }
                    else if ('retry_after' in join) {
                        //* Ratelimit
                        await delay(join.retry_after + 1000);
                    }
                }
                continue;
            }
            return resolve("success");
        }),
        interaction: interaction,
        stop: false
    });
    var replyInterval = setInterval(() => {
        promise = exports.Process.get(interaction.guildId);
        if (promise?.stop)
            return clearInterval(replyInterval);
        var resfreshEmbed = BuildEmbed();
        resfreshEmbed.setColor(discord_js_1.Colors.Orange);
        logJoin.update({
            stats: JSON.stringify({
                total: oAuths.length,
                desired: total,
                success: success.length,
                alreadyOnServer: alreadyOnServer.length,
                error: error.length,
                expired: expired.length,
                limitServer: limitServer.length
            })
        });
        if (message.editable)
            message.edit({
                content: "",
                embeds: [resfreshEmbed]
            }).catch(() => { });
    }, 1000 * 5);
    await exports.Process.get(interaction.guildId).promise.then(async (data) => {
        promise = exports.Process.get(interaction.guildId);
        var endEmbed = BuildEmbed();
        clearInterval(replyInterval);
        endEmbed.setFooter({
            text: `End At ${(0, moment_1.default)().format('HH:mm:ss')}`
        });
        if (data === "stopped") {
            endEmbed.setTitle('🔴 Canceled');
            endEmbed.setColor(discord_js_1.Colors.Red);
            if (message.editable)
                await message.edit({
                    content: "",
                    embeds: [endEmbed],
                    components: []
                }).catch(() => { });
        }
        else {
            endEmbed.setTitle('✅ Finished');
            endEmbed.setColor(discord_js_1.Colors.Green);
            if (message.editable)
                message.edit({
                    content: "",
                    embeds: [endEmbed],
                    components: []
                }).catch(() => { });
        }
        promise.stop = true;
    }).catch(async (err) => {
        console.log(err);
        var endEmbed = BuildEmbed();
        clearInterval(replyInterval);
        endEmbed.setTitle('🔴 Error');
        endEmbed.setColor(discord_js_1.Colors.Red);
        if (message.editable)
            message.edit({
                content: "",
                embeds: [endEmbed],
                components: []
            }).catch(() => { });
        promise.stop = true;
    });
    return true;
});
//# sourceMappingURL=join.js.map