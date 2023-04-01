import { CommandInteraction } from "discord.js";
export declare const Process: Map<string, {
    promise: Promise<string>;
    interaction: CommandInteraction;
    stop: boolean;
}>;
