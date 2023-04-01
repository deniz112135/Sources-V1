"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
exports.default = new discord_js_1.SlashCommandBuilder()
    .setName("role")
    .setDescription("💙 Define the role to give after the verification")
    .setDescriptionLocalizations({
    "fr": "💙 Définir le rôle à donner après la vérification",
})
    .addRoleOption(option => option
    .setName("role")
    .setDescription("The role to give after the verification")
    .setDescriptionLocalizations({
    "fr": "Le rôle à donner après la vérification"
})
    .setRequired(true));
//# sourceMappingURL=options.js.map