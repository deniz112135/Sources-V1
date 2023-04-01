"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Database = __importStar(require("../Database"));
const _1 = require(".");
const Request_1 = __importDefault(require("./src/Request"));
const moment_1 = __importDefault(require("moment"));
const promises_1 = __importDefault(require("fs/promises"));
const cron_1 = require("cron");
const request = new Request_1.default();
const timeBetweenAuths = 1;
const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));
const Routine = async () => {
    const startedAt = (0, moment_1.default)();
    const t1 = Date.now();
    const authsDir = await promises_1.default.mkdir(`./auths/${startedAt.format('DD-MM-YYYY HH:mm')}`, { recursive: true });
    const auths = await Database.Auths.findAll({
        order: [
            ['refreshFailed', 'DESC'],
            ['userInformationsFailed', 'DESC'],
            ['createdAt', 'ASC'],
            ['expireDate', 'ASC']
        ]
    }), bots = await Database.Bots.findAll();
    var done = 0, deletedCount = 0, refreshedCount = 0, refreshFailedDB = 0, stillAlive = 0, failedCount = 0, httpErrorCount = 0;
    console.log(`Refreshing ${auths.length} Auths ...`);
    await (0, _1.webhook)(JSON.stringify({
        embeds: [{
                title: '`⏰` Routine started',
                fields: [
                    { name: '`🧠` oAuths', value: auths.length.toString(), inline: true },
                    { name: '`🤖` Bots', value: bots.length.toString(), inline: true }
                ],
                color: 0xffa70f,
                timestamp: new Date()
            }]
    }));
    for (const auth of auths) {
        const bot = bots.find(bot => bot.id === auth.bot);
        if (!bot) {
            auth.destroy();
            deletedCount++;
            done++;
            continue;
        }
        await wait(timeBetweenAuths);
        // check if the auth is expired
        if ((0, moment_1.default)(auth.expireDate).isBefore((0, moment_1.default)().add(6, 'hours'))) {
            request.refreshToken(auth, bot.id, bot.secret).then(async (response) => {
                if (response.httpError) {
                    console.log('🐛 HTTP Error on Refresh for %s, %s', auth.id, response.httpError);
                    httpErrorCount++;
                }
                else {
                    if (response.deleted)
                        deletedCount++;
                    if (response.updated && response.success)
                        refreshedCount++;
                    if (!response.updated && response.success) {
                        promises_1.default.writeFile(`${authsDir}/${auth.id}.json`, JSON.stringify({
                            old: auth,
                            new: response
                        }));
                        refreshFailedDB++;
                    }
                }
                done++;
            });
        }
        // check if the auth is still alive
        request.getUserInfos(auth.access_token).then(async (response) => {
            if (response.httpError) {
                console.log('🐛 HTTP Error on getUserInfos for %s, %s', auth.id, response.httpError);
                httpErrorCount++;
            }
            else {
                if (response.success) {
                    if (auth.locale !== response.user.locale) {
                        auth.locale = response.user.locale;
                        await auth.save();
                    }
                    if (auth.userInformationsFailed > 0 || auth.refreshFailed > 0) {
                        auth.userInformationsFailed = 0;
                        auth.refreshFailed = 0;
                        await auth.save();
                    }
                    console.log('🟢 Still alive for %s', auth.id);
                    stillAlive++;
                }
                else {
                    if (auth.userInformationsFailed >= 4) {
                        console.log('🍅 User informations failed 3 times, deleting %s', auth.id);
                        await auth.destroy();
                        deletedCount++;
                    }
                    else {
                        console.log('🔴 Not alive for %s', auth.id);
                        auth.userInformationsFailed++;
                        await auth.save();
                        failedCount++;
                    }
                }
            }
            done++;
        });
    }
    while (done < auths.length) {
        await wait(1000);
    }
    setTimeout(() => {
        const duration = moment_1.default.duration(Date.now() - t1);
        console.log(`\n💚 Routine finished in ${duration.hours()}h ${duration.minutes()}m ${duration.seconds()}s`);
        console.log(`💚 ${deletedCount} Auths deleted, ${refreshedCount} Auths refreshed, ${failedCount} Auths failed, ${stillAlive} Auths still alive, ${auths.length} Auths total`);
        (0, _1.webhook)(JSON.stringify({
            embeds: [{
                    title: "`✅` Routine finished",
                    description: `🗓 Duration: \`${duration.hours()}h ${duration.minutes()}m ${duration.seconds()}s\``,
                    fields: [
                        { name: "`🧠` oAuths", value: auths.length, inline: true },
                        { name: "`✅` Still alive", value: stillAlive, inline: true },
                        { name: "`💙` Refreshed", value: refreshedCount, inline: true },
                        { name: "`❌` Deleted", value: deletedCount, inline: true },
                        { name: "`⚠️` Failed", value: failedCount, inline: true },
                        { name: "`💢` httpError", value: httpErrorCount, inline: true },
                        { name: '`🔌` Refresh failed', value: refreshFailedDB, inline: true },
                        { name: '`📅` Next in', value: `<t:${startedAt.add(6, 'hours').unix()}:R>`, inline: false }
                    ],
                    color: 0x0f2bff,
                    timestamp: new Date().toISOString()
                }]
        }));
    }, 1000 * 10);
};
const RoutineCron = new cron_1.CronJob('0 0 */6 * * *', Routine, null, true, 'Europe/Paris');
RoutineCron.start();
// Routine();
//# sourceMappingURL=Routine.js.map