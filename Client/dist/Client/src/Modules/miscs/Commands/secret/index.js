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
        secret: interaction.options.getString('secret')
    };
    await __1.Client.database.Bots.update({ secret: args.secret }, {
        where: { id: __1.Client.user.id }
    });
    __1.Client.Vars.Client.secret = args.secret;
    interaction.editReply({ content: "✅ The secret has been updated." });
    return true;
});
exports.default = cmd;
//# sourceMappingURL=index.js.map