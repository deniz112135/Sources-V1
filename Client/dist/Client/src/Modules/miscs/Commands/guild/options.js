"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
exports.default = new discord_js_1.SlashCommandBuilder()
    .setName("guild")
    .setDescription("🍇 Guild")
    .setDescriptionLocalizations({
    "fr": "🍇 Gestion d'un serveur"
})
    .addSubcommand(subcommand => subcommand
    .setName("invite")
    .setDescription("📨 Create an invite")
    .setDescriptionLocalizations({
    "fr": "📨 Créer une invitation"
})
    .addStringOption(option => option
    .setName("server")
    .setDescription("🌐 Server ID")
    .setDescriptionLocalizations({
    "fr": "🌐 ID du serveur"
})
    .setRequired(true)));
//# sourceMappingURL=options.js.map