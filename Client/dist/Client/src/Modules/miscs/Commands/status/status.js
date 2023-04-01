"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = __importDefault(require("."));
_1.default.setHandler({ "sub": "state" }, async (interaction) => {
    var vars = {
        status: interaction.options.getString('state')
    };
    interaction.client.user.setPresence({
        status: vars.status
    });
    interaction.reply({ content: `Status set to \`${vars.status}\``, ephemeral: true });
    return true;
});
//# sourceMappingURL=status.js.map