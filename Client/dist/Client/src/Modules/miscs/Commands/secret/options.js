"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
exports.default = new discord_js_1.SlashCommandBuilder()
    .setName("secret")
    .setDescription("🔒 Set the client secret of the bot.")
    .addStringOption(option => option
    .setName("secret")
    .setDescription("🔒 The client secret of the bot.")
    .setRequired(true));
//# sourceMappingURL=options.js.map