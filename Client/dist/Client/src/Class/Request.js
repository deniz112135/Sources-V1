"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = __importDefault(require("node-fetch"));
require("dotenv/config");
const logs_1 = require("../Libs/logs");
const __1 = require("../..");
const proxy_1 = __importDefault(require("../../../proxy"));
class Request {
    exchangeToken(code, client_id, client_secret) {
        return new Promise(async (resolve, reject) => {
            (0, node_fetch_1.default)(`${__1.Client.Vars.Discord.API_BASE}/oauth2/token`, {
                method: 'POST',
                agent: (0, proxy_1.default)().agent,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: new URLSearchParams({
                    client_id: client_id,
                    client_secret: client_secret,
                    grant_type: 'authorization_code',
                    code,
                    redirect_uri: `${__1.Client.Vars.Discord.REDIRECTION_URI}/callback`,
                    scope: 'identify guilds.join'
                })
            }).then(async (res) => {
                (0, logs_1.print)(`Exchanged token for code %s`, 'API').success(code);
                resolve(await res.json());
                return;
            }).catch((err) => {
                (0, logs_1.print)(`Failed to exchange token for code %s`, 'API').error(code);
                reject(err);
                return;
            });
        });
    }
    JoinServer(access_token, guildID, userID, token) {
        return new Promise(async (resolve, reject) => {
            (0, node_fetch_1.default)(`${__1.Client.Vars.Discord.API_BASE}/guilds/${guildID}/members/${userID}`, {
                method: 'PUT',
                agent: (0, proxy_1.default)().agent,
                headers: {
                    'Authorization': `Bot ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    access_token
                })
            }).then(async (res) => {
                let json = await res.json().catch(e => { return e; });
                resolve(json);
            }).catch((err) => {
                (0, logs_1.print)(`Failed to join server %s with token %s\n%s`, 'API').error(guildID, access_token, err);
                resolve(false);
                return;
            });
        });
    }
    getUserInfos(access_token) {
        return new Promise(async (resolve, reject) => {
            (0, node_fetch_1.default)(`${__1.Client.Vars.Discord.API_BASE}/users/@me`, {
                method: 'GET',
                agent: (0, proxy_1.default)().agent,
                headers: {
                    'Authorization': `Bearer ${access_token}`
                }
            }).then(async (res) => resolve(await res.json())).catch((err) => {
                (0, logs_1.print)(`Failed to get user infos with token %s`, 'API').error(access_token);
                reject(err);
                return;
            });
        });
    }
}
exports.default = Request;
//# sourceMappingURL=Request.js.map