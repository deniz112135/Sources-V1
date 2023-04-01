"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ips_data_center_json_1 = __importDefault(require("./ips-data_center.json"));
const https_proxy_agent_1 = require("https-proxy-agent");
var i = 0;
const getProxy = () => {
    const proxy = ips_data_center_json_1.default[i];
    i++;
    if (i >= ips_data_center_json_1.default.length)
        i = 0;
    const splitted = proxy.split(':');
    const infos = {
        host: splitted[0],
        port: splitted[1],
        auth: splitted[2] + ':' + splitted[3],
    };
    return {
        infos,
        agent: new https_proxy_agent_1.HttpsProxyAgent(infos)
    };
};
exports.default = getProxy;
//# sourceMappingURL=proxy.js.map