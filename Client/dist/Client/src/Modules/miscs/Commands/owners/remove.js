"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = __importDefault(require("."));
const __1 = require("../../../../..");
_1.default.setHandler({ sub: "remove" }, async (interaction) => {
    await interaction.deferReply({ ephemeral: true });
    if (!await __1.Client.database.Bots.findOne({ where: { id: __1.Client.user.id } }).then(bot => bot.buyer.includes(interaction.user.id))) {
        interaction.editReply({ content: "⚠ You are not the buyer of this bot !" });
        return false;
    }
    const user = interaction.options.getUser("user");
    const list = await __1.Client.database.Bots.findOne({ where: { id: __1.Client.user.id } }).then(bot => bot.owners);
    if (!list.includes(user.id)) {
        interaction.editReply({ content: "❌ This user is not in the list of owners" });
        return false;
    }
    list.splice(list.indexOf(user.id), 1);
    await __1.Client.database.Bots.update({
        owners: JSON.stringify(list)
    }, {
        where: {
            id: __1.Client.user.id
        }
    }).then(() => interaction.editReply({
        content: "✅ User removed to the owners list"
    })).catch(() => interaction.editReply({
        content: "❌ An error occurred while removing the user to the owners list"
    }));
    return true;
});
//# sourceMappingURL=remove.js.map