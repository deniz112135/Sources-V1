"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = __importDefault(require("."));
const __1 = require("../../../../..");
_1.default.setHandler({ sub: "list" }, async (interaction) => {
    await interaction.deferReply({ ephemeral: true });
    const list = await __1.Client.database.Bots.findOne({ where: { id: __1.Client.user.id } }).then(bot => bot.owners.concat(bot.buyer));
    interaction.editReply({
        content: list.length > 0 ? list.map(l => `<@${l}>`).join(", ") : "Any owner is set."
    });
    return true;
});
//# sourceMappingURL=list.js.map