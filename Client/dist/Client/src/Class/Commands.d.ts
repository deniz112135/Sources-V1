import { ApplicationCommandData, ChatInputCommandInteraction, PermissionResolvable, SlashCommandBuilder, SlashCommandSubcommandsOnlyBuilder } from "discord.js";
import { Command } from "../Interfaces";
export default class Commands {
    options: ApplicationCommandData | SlashCommandSubcommandsOnlyBuilder | Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">;
    requiredPermissions: PermissionResolvable[];
    handlers: any[];
    constructor(options: ApplicationCommandData | SlashCommandSubcommandsOnlyBuilder | Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">, requiredPermissions?: PermissionResolvable[]);
    setHandler(options: {
        sub?: string;
        subGroup?: string;
    }, handler: (interaction: ChatInputCommandInteraction) => Promise<boolean>): void;
    getHandler(search: {
        sub?: string;
        subGroup?: string;
    }): Command.Handler;
    static Error(interaction: ChatInputCommandInteraction, cmdName: string, description: string, string: string): void;
    run(interaction: ChatInputCommandInteraction): Promise<boolean | void>;
}
