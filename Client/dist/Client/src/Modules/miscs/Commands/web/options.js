"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
exports.default = new discord_js_1.SlashCommandBuilder()
    .setName("web")
    .setDescription("🏹 Web Manager")
    .setDescriptionLocalizations({
    "fr": "🏹 Gestion du site web"
})
    .addStringOption(option => option
    .setName("title")
    .setDescription("Change the title of the success message")
    .setDescriptionLocalizations({
    "fr": "Change le titre du message de succès"
}))
    .addStringOption(option => option
    .setName("message")
    .setDescription("Change the message of the success message")
    .setDescriptionLocalizations({
    "fr": "Change le message de succès"
}))
    .addStringOption(option => option
    .setName("color")
    .setDescription("Change the color of the success message, hex color only, example: #ff0000")
    .setDescriptionLocalizations({
    "fr": "Change la couleur du message de succès, couleur hexadécimale uniquement, exemple: #ff0000"
}));
//# sourceMappingURL=options.js.map