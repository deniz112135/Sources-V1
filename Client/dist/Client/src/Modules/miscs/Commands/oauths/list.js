"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const builders_1 = require("@discordjs/builders");
const Database_1 = require("../../../../../../Database");
const __1 = require("../../../../..");
const _1 = __importDefault(require("."));
const randomDiscordColor = () => {
    const colors = Object.values(discord_js_1.Colors);
    return colors[Math.floor(Math.random() * colors.length)];
};
_1.default.setHandler({ "sub": "list" }, async (interaction) => {
    await interaction.deferReply();
    const userHasAdmin = await __1.Client.database.Admins.findOne({ where: { id: interaction.user.id } });
    let usersPerLocale, usersWithoutDuplicated;
    if (userHasAdmin) {
        usersPerLocale = await Database_1.Auths.count({
            group: ['locale'],
            attributes: ['locale', [Database_1.Auths.sequelize.fn('COUNT', Database_1.Auths.sequelize.col('locale')), 'count']]
        });
        usersWithoutDuplicated = await Database_1.Auths.count({
            group: ['locale'],
            attributes: ['locale', [Database_1.Auths.sequelize.fn('COUNT', Database_1.Auths.sequelize.fn('DISTINCT', Database_1.Auths.sequelize.col('user'))), 'count']]
        });
    }
    else {
        usersPerLocale = await Database_1.Auths.count({
            where: { bot: __1.Client.user.id },
            group: ['locale'],
            attributes: ['locale', [Database_1.Auths.sequelize.fn('COUNT', Database_1.Auths.sequelize.col('locale')), 'count']]
        });
        usersWithoutDuplicated = await Database_1.Auths.count({
            where: { bot: __1.Client.user.id },
            group: ['locale'],
            attributes: ['locale', [Database_1.Auths.sequelize.fn('COUNT', Database_1.Auths.sequelize.fn('DISTINCT', Database_1.Auths.sequelize.col('user'))), 'count']]
        });
    }
    const embed = new builders_1.EmbedBuilder()
        .setTitle("💫 List of the oAuths")
        .setColor(randomDiscordColor())
        .addFields([
        {
            name: "Users per locale",
            value: `Total: \`${usersPerLocale.reduce((a, b) => a + b.count, 0)}\`
                \n${usersPerLocale.sort((a, b) => b.count - a.count).map((locale) => `**${locale.locale}**: \`${locale.count}\``).join("\n")}`,
            inline: true
        }
    ]);
    if (userHasAdmin) {
        embed.addFields([
            {
                name: "Users per locale (without duplicated)",
                value: `Total: \`${usersWithoutDuplicated.reduce((a, b) => a + b.count, 0)}\`
                \n${usersWithoutDuplicated.sort((a, b) => b.count - a.count).map((locale) => `**${locale.locale}**: \`${locale.count}\``).join("\n")}`,
                inline: true
            }
        ]);
    }
    interaction.editReply({
        embeds: [embed]
    });
    return true;
});
//# sourceMappingURL=list.js.map