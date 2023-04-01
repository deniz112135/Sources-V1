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
    await interaction.deferReply();
    const args = {
        title: interaction.options.get('title')?.value,
        message: interaction.options.get('message')?.value,
        color: interaction.options.get('color')?.value,
    };
    if (!args.title && !args.message && !args.color) {
        interaction.editReply({ content: "❌ Tu dois mettre un titre, un message ou une couleur." });
        return false;
    }
    __1.Client.database.Settings.findOrCreate({
        where: {
            bot: interaction.client.user.id,
            guild: interaction.guildId
        },
        defaults: {
            bot: interaction.client.user.id,
            guild: interaction.guildId,
            successTitle: args?.title,
            successMessage: args?.message,
            successColor: args?.color
        }
    }).then(([settings, created]) => {
        interaction.editReply({
            content: "✅ Le message de succès a bien été modifiés."
        });
    }).catch((err) => {
        console.error(err);
        interaction.editReply({
            content: "❌ Une erreur est survenue lors de la modification du message de succès."
        });
    });
    return true;
});
exports.default = cmd;
//# sourceMappingURL=index.js.map