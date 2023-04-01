"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Commands_1 = __importDefault(require("../../../../Class/Commands"));
const discord_js_1 = require("discord.js");
const options_1 = __importDefault(require("./options"));
const __1 = require("../../../../..");
const cmd = new Commands_1.default(options_1.default, []);
cmd.setHandler({}, async (interaction) => {
    await interaction.deferReply({ ephemeral: true });
    var args = {
        buttonName: interaction.options.get("buttonname").value,
        message: interaction.options.get("message")?.value,
        channel: interaction.options.get("channel")?.channel
    };
    const message = await interaction.channel.messages.fetch(args.message).catch(() => null);
    if (!message) {
        interaction.editReply({ content: "Message not found" });
        return false;
    }
    if (!args.channel) {
        args.channel = interaction.channel;
    }
    else if (args.channel.type !== discord_js_1.ChannelType.GuildText) {
        interaction.editReply({ content: "Channel must be a text channel" });
        return false;
    }
    const redirect_uri = encodeURIComponent(`${__1.Client.Vars.Discord.REDIRECTION_URI}/callback`);
    const state = encodeURIComponent(JSON.stringify({
        guild: interaction.guildId,
        bot: __1.Client.user.id
    }));
    const callbackURL = `${__1.Client.Vars.Discord.API_BASE}/oauth2/authorize?client_id=${__1.Client.user.id}&redirect_uri=${redirect_uri}${encodeURI("&response_type=code&scope=identify guilds.join")}&state=${state}`;
    const Settings = await __1.Client.database.Settings.findCreateFind({
        where: {
            bot: __1.Client.user.id,
            guild: interaction.guildId
        },
        attributes: ["role"],
        raw: true
    });
    const row = new discord_js_1.ActionRowBuilder()
        .addComponents(new discord_js_1.ButtonBuilder()
        .setLabel(args.buttonName)
        .setStyle(discord_js_1.ButtonStyle.Link)
        .setURL(callbackURL));
    args.channel.send({
        components: [row],
        embeds: message.embeds,
        content: message.content
    });
    interaction.editReply({ content: `Message sent${!Settings[0]?.role ? "\n**Don't forget to set a role with command `/role`**" : ""}` });
});
exports.default = cmd;
//# sourceMappingURL=index.js.map