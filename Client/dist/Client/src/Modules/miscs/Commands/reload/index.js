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
    await __1.Client.pushCommandGuild(interaction.guild.id).catch(err => {
        console.log(err);
        interaction.editReply({
            content: 'Something went wrong'
        });
        return false;
    });
    interaction.editReply({
        content: 'Commands reloaded'
    }).catch(() => { });
    return true;
});
exports.default = cmd;
//# sourceMappingURL=index.js.map