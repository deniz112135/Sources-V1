"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const __1 = require("../../../../..");
const Commands_1 = __importDefault(require("../../../../Class/Commands"));
const options_1 = __importDefault(require("./options"));
const cmd = new Commands_1.default(options_1.default, []);
const buildBook = async () => {
    let Guilds = await __1.Client.guilds.fetch();
    var guildValues = Guilds.values();
    const pages = [];
    var guildsPerPages = 10, pagesCount = Math.ceil(Guilds.size / guildsPerPages);
    for (var i = 0; i < pagesCount; i++) {
        var embed = new discord_js_1.EmbedBuilder()
            .setColor(discord_js_1.Colors.Blue)
            .setTitle(`Guilds list (${Guilds.size})`)
            .setFooter({ text: `Page ${i + 1}/${pagesCount}` });
        var rows = [
            new discord_js_1.ActionRowBuilder()
                .addComponents(new discord_js_1.ButtonBuilder()
                .setCustomId("previous")
                .setLabel("◀️")
                .setStyle(discord_js_1.ButtonStyle.Primary)
                .setDisabled(i === 0), new discord_js_1.ButtonBuilder()
                .setCustomId("next")
                .setLabel("▶️")
                .setStyle(discord_js_1.ButtonStyle.Primary)
                .setDisabled(i === pagesCount - 1), new discord_js_1.ButtonBuilder()
                .setCustomId("close")
                .setLabel("❌")
                .setStyle(discord_js_1.ButtonStyle.Secondary)),
            new discord_js_1.ActionRowBuilder()
                .addComponents(new discord_js_1.StringSelectMenuBuilder()
                .setCustomId("leave")
                .setMinValues(1)
                .setPlaceholder("Leave a guild")),
            new discord_js_1.ActionRowBuilder()
                .addComponents(new discord_js_1.StringSelectMenuBuilder()
                .setCustomId("invite")
                .setMinValues(1)
                .setPlaceholder("Invite a guild")),
        ];
        var description = "";
        const buttRow = rows[1].components[0], selectRow = rows[2].components[0];
        for (var x = 0; x < guildsPerPages; x++) {
            const guild = guildValues.next().value;
            if (!guild)
                break;
            description += `[${guild.name}](https://discord.com/channels/${guild.id})\n`;
            buttRow.addOptions({
                label: guild.name,
                value: guild.id,
                description: guild.id
            });
            selectRow.addOptions({
                label: guild.name,
                value: guild.id,
                description: guild.id
            });
        }
        buttRow.setMaxValues(buttRow.options.length);
        selectRow.setMaxValues(selectRow.options.length);
        embed.setDescription(description);
        pages.push({ embeds: embed, components: rows });
    }
    return pages;
};
cmd.setHandler({}, async (interaction) => {
    await interaction.deferReply();
    var pages = await buildBook();
    const reply = await interaction.editReply({ embeds: [pages[0].embeds], components: pages[0].components });
    const buttCollector = interaction.channel.createMessageComponentCollector({ filter: (i) => i.user.id === interaction.user.id && reply.id === i.message.id, time: 1000 * 60 * 3, componentType: discord_js_1.ComponentType.Button });
    const selectCollector = interaction.channel.createMessageComponentCollector({ filter: (i) => i.user.id === interaction.user.id && reply.id === i.message.id, time: 1000 * 60 * 3, componentType: discord_js_1.ComponentType.StringSelect });
    let page = 0;
    buttCollector.on("collect", async (i) => {
        if (i.customId === "next") {
            page++;
            await i.update({ embeds: [pages[page].embeds], components: pages[page].components });
        }
        else if (i.customId === "previous") {
            page--;
            await i.update({ embeds: [pages[page].embeds], components: pages[page].components });
        }
        else if (i.customId === "close") {
            buttCollector.stop();
            selectCollector.stop();
        }
    });
    selectCollector.on("collect", async (i) => {
        i.deferReply({ ephemeral: true }).catch(() => { });
        const inviteLinks = new discord_js_1.Collection();
        for (const v of i.values) {
            const guild = await __1.Client.guilds.fetch(v);
            switch (i.customId) {
                case "leave":
                    await guild.leave();
                    break;
                case "invite":
                    const invite = await guild.invites.create((await guild.channels.fetch()).filter(c => c.type === discord_js_1.ChannelType.GuildText).first()).catch(() => "Uknown error");
                    inviteLinks.set(guild.name, typeof invite === "string" ? invite : invite.url);
                    break;
            }
        }
        ;
        if (i.customId == "leave") {
            pages = await buildBook();
            await i.deleteReply().catch(() => { });
            await interaction.editReply({ embeds: [pages[0].embeds], components: pages[0].components }).catch(() => { });
        }
        else if (i.customId == "invite") {
            await i.editReply(`${i.member}, ${inviteLinks.size ? inviteLinks.map((v, k) => `${k}:\n${v}`).join(`\n\n`) : "Any invite link generated."}`);
            await interaction.editReply({ embeds: [pages[page].embeds], components: pages[page].components }).catch(() => { });
        }
        i.deferUpdate().catch(() => { });
    });
    buttCollector.on("end", async () => {
        await interaction.deleteReply().catch(() => { });
        selectCollector.stop();
    });
    selectCollector.on("end", async () => {
        await interaction.deleteReply().catch(() => { });
        buttCollector.stop();
    });
    return true;
});
exports.default = cmd;
//# sourceMappingURL=index.js.map