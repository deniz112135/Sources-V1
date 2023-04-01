"use strict";
// console.clear();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = void 0;
const discord_js_1 = require("discord.js");
const moment_1 = __importDefault(require("moment"));
const Client_1 = __importDefault(require("./src/Class/Client"));
(0, moment_1.default)().locale('fr');
exports.Client = new Client_1.default({
    intents: [
        discord_js_1.GatewayIntentBits.Guilds,
        discord_js_1.GatewayIntentBits.GuildMembers,
        discord_js_1.GatewayIntentBits.GuildMessages,
        discord_js_1.GatewayIntentBits.MessageContent
    ],
    partials: [
        discord_js_1.Partials.GuildMember
    ]
});
// Catching errors
process.on('unhandledRejection', (err) => {
    console.log(err);
});
//# sourceMappingURL=index.js.map