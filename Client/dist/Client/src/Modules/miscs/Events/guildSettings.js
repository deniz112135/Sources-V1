"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OnReady = exports.onGuildAdded = void 0;
const __1 = require("../../../..");
exports.onGuildAdded = {
    name: 'guildCreate',
    run: async (guild) => {
        __1.Client.database.Settings.create({
            where: {
                bot: __1.Client.user.id,
                guild: guild.id
            }
        }).catch(() => { });
        await __1.Client.pushCommandGuild(guild.id).catch(err => {
            console.error(`try to push command on guild ${guild.id} but failed: ${err?.message ?? 'unknown error'}`);
        });
    }
};
exports.OnReady = {
    name: 'ready',
    run: async () => {
        const guilds = await __1.Client.guilds.fetch();
        guilds.forEach(async (guild) => {
            const settings = await __1.Client.database.Settings.findOne({
                where: {
                    bot: __1.Client.user.id,
                    guild: guild.id
                },
                raw: true
            });
            if (!settings) {
                await __1.Client.database.Settings.create({
                    where: {
                        bot: __1.Client.user.id,
                        guild: guild.id
                    }
                }).catch(() => { });
            }
            if (__1.Client.Vars.debugCMD)
                await __1.Client.pushCommandGuild(guild.id);
        });
    }
};
//# sourceMappingURL=guildSettings.js.map