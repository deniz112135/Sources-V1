"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
exports.default = new discord_js_1.SlashCommandBuilder()
    .setName("logs")
    .setDescription("👻 Define the webhook url for the logs")
    .setDescriptionLocalizations({
    "fr": "👻 Définir l'url du webhook pour les logs"
})
    .addStringOption(option => option
    .setName("url")
    .setDescription("🔗 Webhook url")
    .setDescriptionLocalizations({
    "fr": "🔗 Url du webhook"
})
    .setRequired(true));
//# sourceMappingURL=options.js.map