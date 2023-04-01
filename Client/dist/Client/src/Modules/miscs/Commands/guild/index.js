"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const Commands_1 = __importDefault(require("../../../../Class/Commands"));
const options_1 = __importDefault(require("./options"));
const cmd = new Commands_1.default(options_1.default, []);
cmd.setHandler({ sub: "invite" }, async (interaction) => {
    await interaction.deferReply({ ephemeral: true });
    const args = {
        guild: interaction.options.getString('server')
    };
    const guild = await interaction.client.guilds.fetch(args.guild);
    if (!guild) {
        interaction.editReply('Guild not found.');
        return false;
    }
    const invite = await guild.invites.create((await guild.channels.fetch()).filter(c => c.type === discord_js_1.ChannelType.GuildText).first()).catch(() => "Uknown error");
    if (typeof invite === 'string') {
        interaction.editReply(invite);
        return false;
    }
    else
        interaction.editReply(invite.url);
    return true;
});
exports.default = cmd;
//# sourceMappingURL=index.js.map