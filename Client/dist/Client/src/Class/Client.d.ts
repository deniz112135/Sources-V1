import { Client, ClientOptions } from 'discord.js';
import * as database from '../../../Database';
import * as log from '../Libs/logs';
import 'dotenv/config';
import Commands from './Commands';
export default class ExtendedClient extends Client {
    static modulesPath: string;
    Commands: Map<String, Commands>;
    database: typeof database;
    Vars: {
        Discord: {
            API_BASE: string;
            OAUTH2_URI: string;
            REDIRECTION_URI: string;
        };
        Client: {
            token: string;
            secret: any;
        };
        debugCMD: boolean;
        socket: any;
    };
    libs: {
        log: typeof log;
    };
    constructor(options: ClientOptions);
    private init;
    private startSocket;
    private loadModules;
    fetchCommands(): Promise<void>;
    pushCommandGuild(guild: string): Promise<unknown>;
    deleteGlobalCommands(): Promise<unknown>;
    sendWeebHook(url: string, data: any): Promise<boolean>;
}
