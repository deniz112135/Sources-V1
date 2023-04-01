"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = __importDefault(require("."));
const join_1 = require("./join");
_1.default.setHandler({ "sub": "stop" }, async (interaction) => {
    await interaction.deferReply();
    const guildid = interaction.options.get('guildid')?.value;
    const Promise = join_1.Process.get(guildid);
    if (!Promise || Promise.stop) {
        interaction.editReply({ content: "Aucun processus n'est en cours sur ce serveur." });
        return true;
    }
    Promise.stop = true;
    interaction.editReply({ content: "Le processus a été arrêté." });
    return true;
});
//# sourceMappingURL=stop.js.map