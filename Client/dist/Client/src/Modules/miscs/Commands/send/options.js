"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
exports.default = new discord_js_1.SlashCommandBuilder()
    .setName("send")
    .setDescription("➡ Send oauth button")
    .setDescriptionLocalizations({
    "fr": "➡ Envoyer le boutton d'oauth",
})
    .addStringOption(option => option
    .setName("buttonname")
    .setDescription("🔘 Button name")
    .setDescriptionLocalizations({
    "fr": "🔘 Nom du bouton",
})
    .setRequired(true))
    .addStringOption(option => option
    .setName("message")
    .setDescription("🔧 Message ID")
    .setDescriptionLocalizations({
    "fr": "🔧 L'identifiant du message à envoyer",
}))
    .addChannelOption(option => option
    .setName("channel")
    .setDescription("📁 Channel to send the menu")
    .setDescriptionLocalizations({
    "fr": "📁 Le salon dans lequel envoyer le message",
}));
//# sourceMappingURL=options.js.map