"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
exports.default = new discord_js_1.SlashCommandBuilder()
    .setName("oauths")
    .setDescription("🎉 Manage oauths")
    .setDescriptionLocalizations({
    "fr": "🎉 Gérer les oAuths",
})
    .addSubcommand(subcommand => subcommand
    .setName("join")
    .setDescription("🎡 Join the server")
    .setDescriptionLocalizations({
    "fr": "🎡 Faire rejoindre les oAuths au serveur",
})
    .addIntegerOption(option => option
    .setName("quantity")
    .setDescription("🎱 Quantity")
    .setDescriptionLocalizations({
    "fr": "🎱 La quantité d'oAuths à rejoindre",
}))
    .addStringOption(option => option
    .setName("locale")
    .setDescription("🎎 The locale")
    .setAutocomplete(false)
    .setDescriptionLocalizations({
    "fr": "🎎 La langue",
}))
    .addIntegerOption(option => option
    .setName("interval")
    .setDescription("🎄 The interval")
    .setDescriptionLocalizations({
    "fr": "🎄 L'intervalle",
})))
    .addSubcommand(subcommand => subcommand
    .setName("stop")
    .setDescription("🎢 Make stop joining an server")
    .setDescriptionLocalizations({
    "fr": "🎢 Arrêter de rejoindre un serveur",
})
    .addStringOption(option => option
    .setName("guildid")
    .setDescription("🎁 The guild id")
    .setDescriptionLocalizations({
    "fr": "🎁 L'id du serveur",
})
    .setRequired(true)
    .setAutocomplete(true)))
    .addSubcommand(subcommand => subcommand
    .setName("list")
    .setDescription("🎗 List the oAuths")
    .setDescriptionLocalizations({
    "fr": "🎗 Lister les oAuths",
}));
//# sourceMappingURL=options.js.map