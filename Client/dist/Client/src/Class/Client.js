"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const database = __importStar(require("../../../Database"));
const log = __importStar(require("../Libs/logs"));
const path_1 = __importDefault(require("path"));
const node_fetch_1 = __importDefault(require("node-fetch"));
require("dotenv/config");
const fs_1 = __importDefault(require("fs"));
const socket_io_client_1 = require("socket.io-client");
const Callback_1 = __importDefault(require("../Functions/Callback"));
const proxy_1 = __importDefault(require("../../../proxy"));
const config_1 = __importDefault(require("../../config"));
class ExtendedClient extends discord_js_1.Client {
    static modulesPath = path_1.default.join(__dirname, '../Modules');
    Commands = new Map();
    database = database;
    Vars = {
        Discord: {
            API_BASE: config_1.default.API_BASE,
            OAUTH2_URI: `https://discord.com/api/oauth2/authorize?client_id=${process.argv[2]}&redirect_uri=https%3A%2F%2Foauth.m1000.fr%2Fcallback&response_type=code&scope=identify%20guilds.join`,
            REDIRECTION_URI: config_1.default.REDIRECTION_URI
        },
        Client: {
            token: process.argv[2],
            secret: null
        },
        debugCMD: false,
        socket: null
    };
    libs = {
        log
    };
    constructor(options) {
        super(options);
        this.init();
    }
    async init() {
        this.database.sequelizeInstance.authenticate().then(() => {
            this.libs.log.print('Connected.', 'Database').success();
        }).catch(error => {
            this.libs.log.print('Error: %s', 'Database', true).error(error);
        });
        this.database.sequelizeInstance.sync().then(() => {
            this.libs.log.print('Synchronized.', 'Database').success();
        }).catch(error => {
            this.libs.log.print('Error: %s', 'Database', true).error(error);
        });
        await this.loadModules();
        await this.login(this.Vars.Client.token).catch(error => {
            this.libs.log.print('Error: %s', 'Discord', true).error(error);
            process.exit(404);
        });
        this.startSocket();
        this.Vars.Client.secret = await this.database.Bots.findOne({ where: { id: this.user.id } }).then(db => db?.secret).catch(() => null);
    }
    startSocket() {
        const socket = (0, socket_io_client_1.io)(`http://localhost:8081?bot=${this.user.id}`, { reconnection: true });
        socket.on('connect', () => {
            this.libs.log.print('Connected.', 'Socket').success();
        });
        socket.on('callback', (data, Res) => {
            (0, Callback_1.default)(data).then((res) => {
                Res(res.status, res.data);
            }).catch(err => {
                Res(err.status, err.data);
            });
        });
    }
    async loadModules() {
        for (const m of fs_1.default.readdirSync(ExtendedClient.modulesPath)) {
            const t1 = Date.now();
            const module = require(path_1.default.join(ExtendedClient.modulesPath, m));
            var eventCount = 0, cmdCount = 0;
            // Events
            for (const Event of Object.keys(module.Events)) {
                const event = module.Events[Event];
                if (event.name) {
                    this.on(event.name, (...args) => event.run(...args));
                    eventCount++;
                    continue;
                }
                else {
                    // Group of Events
                    for (const Event of Object.keys(event)) {
                        const e = event[Event];
                        if (e.name)
                            this.on(e.name, (...args) => e.run(...args));
                        eventCount++;
                        continue;
                    }
                }
            }
            // Commands
            for (const Command of Object.keys(module.Commands)) {
                const command = module.Commands[Command];
                this.Commands.set(command.options.name, command);
                cmdCount++;
            }
            this.libs.log.print(`Load %s, %s commands, %s events, in %s ms.`, 'Modules').log(m, cmdCount, eventCount, Date.now() - t1);
        }
    }
    async fetchCommands() {
        for (const m of fs_1.default.readdirSync(ExtendedClient.modulesPath)) {
            const module = require(path_1.default.join(ExtendedClient.modulesPath, m));
            for (const Command of Object.keys(module.Commands)) {
                const command = module.Commands[Command];
                this.Commands.set(command.options.name, command);
            }
        }
    }
    async pushCommandGuild(guild) {
        return new Promise(async (resolve, reject) => {
            try {
                if (!guild)
                    return reject('No guild provided.');
                const data = Array.from(this.Commands.values()).map(c => c.options);
                await this.rest.put(discord_js_1.Routes.applicationGuildCommands(this.user?.id.toString(), guild), { body: data });
                log.print('Commands registered on %s', 'Discord').log(guild);
                resolve(true);
            }
            catch (error) {
                return reject(error);
            }
        });
    }
    deleteGlobalCommands() {
        return new Promise(async (resolve, reject) => {
            try {
                await this.rest.put(discord_js_1.Routes.applicationCommands(this.user?.id.toString()), { body: [] });
                log.print('Commands removed', 'Discord').warn();
                resolve(true);
            }
            catch (error) {
                return reject(error);
            }
        });
    }
    sendWeebHook(url, data) {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await (0, node_fetch_1.default)(url, {
                    method: 'POST',
                    agent: (0, proxy_1.default)().agent,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });
                if (!res.ok)
                    return reject(res.statusText);
                resolve(true);
            }
            catch (error) {
                return reject(error);
            }
        });
    }
}
exports.default = ExtendedClient;
//# sourceMappingURL=Client.js.map