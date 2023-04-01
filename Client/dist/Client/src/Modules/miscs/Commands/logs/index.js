"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../../../../..");
const Commands_1 = __importDefault(require("../../../../Class/Commands"));
const options_1 = __importDefault(require("./options"));
const cmd = new Commands_1.default(options_1.default, []);
cmd.setHandler({}, async (interaction) => {
    await interaction.deferReply({ ephemeral: true });
    var args = {
        url: interaction.options.getString('url')
    };
    const regex = new RegExp(/https:\/\/discord.com\/api\/webhooks\/\d+\/[a-zA-Z0-9-_]{68}/);
    if (!regex.test(args.url)) {
        interaction.editReply('Invalid url.');
        return false;
    }
    await __1.Client.database.Bots.update({ logHook: args.url }, {
        where: { id: __1.Client.user.id }
    });
    interaction.editReply({ content: "✅ The secret has been updated." });
    return true;
});
exports.default = cmd;
//# sourceMappingURL=index.js.map