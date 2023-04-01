"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const _1 = __importDefault(require("."));
_1.default.setHandler({ "sub": "activity" }, async (interaction) => {
    var vars = {
        activity: interaction.options.getString('activity'),
        name: interaction.options.getString('name'),
        url: interaction.options.getString('url')
    };
    interaction.client.user.setPresence({
        activities: [{
                name: vars.name,
                type: discord_js_1.ActivityType[vars.activity.toUpperCase()],
                url: vars.url ? vars.url : undefined
            }]
    });
    interaction.reply({ content: `Activity set to \`${vars.activity}\``, ephemeral: true });
    return true;
});
//# sourceMappingURL=activity.js.map