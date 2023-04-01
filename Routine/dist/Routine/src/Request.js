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
const node_fetch_1 = __importStar(require("node-fetch"));
const proxy_1 = __importDefault(require("../../proxy"));
require("dotenv/config");
const moment_1 = __importDefault(require("moment"));
const Database = __importStar(require("../../Database"));
class Request {
    getUserInfos(access_token) {
        return new Promise(async (resolve, reject) => {
            const proxy = (0, proxy_1.default)();
            (0, node_fetch_1.default)(`https://discord.com/api/users/@me`, {
                method: 'GET',
                agent: proxy.agent,
                headers: {
                    'Authorization': `Bearer ${access_token}`
                }
            }).then(async (res) => {
                const user = await res.json();
                resolve({
                    success: user.username ? true : false,
                    user: user
                });
            }).catch(err => {
                resolve({
                    httpError: err.message
                });
            });
        });
    }
    refreshToken(auth, clientId, clientSecret) {
        return new Promise(async (resolve, reject) => {
            const proxy = (0, proxy_1.default)();
            const refresh = await (0, node_fetch_1.default)(`https://discord.com/api/oauth2/token`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                agent: proxy.agent,
                body: new URLSearchParams({
                    client_id: clientId,
                    client_secret: clientSecret,
                    grant_type: 'refresh_token',
                    refresh_token: auth.refresh_token
                })
            }).catch(err => {
                return {
                    httpError: err.message
                };
            });
            if (!(refresh instanceof node_fetch_1.Response) && refresh.httpError)
                return resolve({
                    success: false,
                    updated: false,
                    deleted: false,
                    httpError: refresh.httpError
                });
            if (!(refresh instanceof node_fetch_1.Response))
                return;
            const response = await refresh.json();
            // If error, increment refreshFailed
            // If refreshFailed >= 4, delete auth
            // Else, save auth
            if (response?.error || response?.message) {
                auth.refreshFailed++;
                if (auth.refreshFailed >= 4) {
                    console.log('🍅 Refresh failed 3 times, deleting %s', auth.id);
                    await auth.destroy();
                    return resolve({
                        success: false,
                        updated: false,
                        deleted: true
                    });
                }
                else {
                    console.log('🍅 Refresh failed for %s', auth.id);
                    await auth.save();
                    return resolve({
                        success: false,
                        updated: false,
                        deleted: false
                    });
                }
                ;
            }
            const updated = await Database.Auths.update({
                access_token: response.access_token,
                refresh_token: response.refresh_token,
                expire_in: response.expires_in,
                userInformationsFailed: 0,
                refreshFailed: 0,
                expireDate: (0, moment_1.default)().add(response.expires_in, 'seconds').toDate(),
                token_type: response.token_type,
                scope: response.scope
            }, { where: { id: auth.id } }).catch((err) => {
                console.log(err);
                return false;
            });
            if (updated == false)
                return resolve({
                    success: false,
                    updated: false,
                    deleted: false
                });
            console.log('💬 Refresh success for %s', auth.id);
            resolve({
                success: true,
                updated: true,
                deleted: false
            });
        });
    }
}
exports.default = Request;
//# sourceMappingURL=Request.js.map