"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = __importDefault(require("."));
const __1 = require("../../../../..");
_1.default.setHandler({ sub: "add" }, async (interaction) => {
    await interaction.deferReply({ ephemeral: true });
    if (!await __1.Client.database.Bots.findOne({ where: { id: __1.Client.user.id } }).then(bot => bot.buyer.includes(interaction.user.id))) {
        interaction.editReply({ content: "⚠ You are not the buyer of this bot !" });
        return false;
    }
    const user = interaction.options.getUser("user");
    let buyers = [], owners = [];
    await __1.Client.database.Bots.findOne({ where: { id: __1.Client.user.id } }).then(bot => {
        buyers.push(...bot.buyer);
        owners.push(...bot.owners);
    });
    const botType = await __1.Client.database.Bots.findOne({ where: { id: __1.Client.user.id } }).then(bot => bot.type);
    if (buyers.includes(user.id) || owners.includes(user.id)) {
        interaction.editReply({ content: "❌ This user is already in the list of owners" });
        return false;
    }
    if (botType === 0 && buyers.length + owners.length >= 1) {
        interaction.editReply({ content: "❌ You can't add more than 1 owner" });
        return false;
    }
    else if (botType === 1 && buyers.length + owners.length >= 3) {
        interaction.editReply({ content: "❌ You can't add more than 3 owners" });
        return false;
    }
    else if (botType === 2 && buyers.length + owners.length >= 6) {
        interaction.editReply({ content: "❌ You can't add more than 6 owners" });
        return false;
    }
    owners.push(user.id);
    await __1.Client.database.Bots.update({
        owners: JSON.stringify(owners)
    }, {
        where: {
            id: __1.Client.user.id
        }
    }).then(() => interaction.editReply({
        content: "✅ User added to the owners list"
    })).catch(() => interaction.editReply({
        content: "❌ An error occurred while adding the user to the owners list"
    }));
    return true;
});
//# sourceMappingURL=add.js.map