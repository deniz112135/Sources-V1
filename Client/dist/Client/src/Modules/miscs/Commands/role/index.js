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
        role: interaction.options.get('role')?.role
    };
    if (!args.role?.id) {
        interaction.reply({
            content: 'Please provide a role',
            ephemeral: true
        });
        return false;
    }
    await __1.Client.database.Settings.findOrCreate({
        where: {
            bot: __1.Client.user.id,
            guild: interaction.guildId
        }
    }).then(([settings, created]) => {
        settings.role = args.role.id;
        settings.save();
        interaction.editReply({
            content: '✅ The role has been updated'
        });
    }).catch(() => {
        interaction.editReply({
            content: '❌ An error occured while updating'
        });
    });
    return true;
});
exports.default = cmd;
//# sourceMappingURL=index.js.map