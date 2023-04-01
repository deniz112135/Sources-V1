"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerBot = void 0;
exports.registerBot = {
    name: 'ready',
    run: async (client) => {
        const bot = await client.database.Bots.findOne({
            where: {
                id: client.user.id
            }
        });
        if (!bot) {
            await client.database.Bots.create({
                id: client.user.id,
                secret: client.Vars.Client.secret,
                token: client.Vars.Client.token
            }).catch(err => {
                console.log(err);
            });
            (await client.guilds.fetch()).forEach(async (guild) => {
                await client.pushCommandGuild(guild.id);
            });
            await client.deleteGlobalCommands();
        }
        else
            await client.database.Bots.update({
                secret: client.Vars.Client.secret,
                token: client.Vars.Client.token
            }, {
                where: {
                    id: client.user.id
                }
            }).catch(err => {
                console.log(err);
            });
    }
};
//# sourceMappingURL=registerBot.js.map