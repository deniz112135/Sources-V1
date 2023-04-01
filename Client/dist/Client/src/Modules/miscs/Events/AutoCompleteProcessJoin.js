"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AutoCompleteProcessJoin = void 0;
const join_1 = require("../Commands/oauths/join");
exports.AutoCompleteProcessJoin = {
    name: 'interactionCreate',
    run: async (interaction) => {
        if (!interaction.isAutocomplete())
            return;
        if (interaction.commandName != "oauths" || interaction.options.getSubcommand() != "stop")
            return;
        if (join_1.Process.size == 0)
            return interaction.respond([]);
        const guildids = [...join_1.Process.values()].filter(opts => !opts.stop);
        return interaction.respond(guildids.map(opts => {
            if (opts.interaction.guild == null || opts.interaction.guild.id == null)
                return null;
            return {
                name: opts.interaction.guild.name ?? opts.interaction.guild.id ?? "Unknown",
                value: opts.interaction.guild.id.toString()
            };
        }));
    }
};
//# sourceMappingURL=AutoCompleteProcessJoin.js.map