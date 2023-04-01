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
exports.Subscriptions = exports.Blacklist = exports.LogsJoin = exports.LogsCommands = exports.Admins = exports.Bots = exports.IPs = exports.Settings = exports.Auths = exports.sequelizeInstance = void 0;
const sequelize = __importStar(require("sequelize"));
exports.sequelizeInstance = new sequelize.Sequelize({
    host: "82.65.137.156",
    username: "OA2Tets",
    password: "OA2Tets",
    database: "OA2Tets",
    port: 3306,
    dialect: 'mariadb',
    define: {
        timestamps: true
    },
    logging: false,
    timezone: "Europe/Paris",
    pool: {
        max: 50,
        min: 0,
        acquire: 30000,
        idle: 300000
    }
});
var Auths_1 = require("./Auths");
Object.defineProperty(exports, "Auths", { enumerable: true, get: function () { return __importDefault(Auths_1).default; } });
var Settings_1 = require("./Settings");
Object.defineProperty(exports, "Settings", { enumerable: true, get: function () { return __importDefault(Settings_1).default; } });
var IPs_1 = require("./IPs");
Object.defineProperty(exports, "IPs", { enumerable: true, get: function () { return __importDefault(IPs_1).default; } });
var Bots_1 = require("./Bots");
Object.defineProperty(exports, "Bots", { enumerable: true, get: function () { return __importDefault(Bots_1).default; } });
var Admins_1 = require("./Admins");
Object.defineProperty(exports, "Admins", { enumerable: true, get: function () { return __importDefault(Admins_1).default; } });
var Logs_Commands_1 = require("./Logs.Commands");
Object.defineProperty(exports, "LogsCommands", { enumerable: true, get: function () { return __importDefault(Logs_Commands_1).default; } });
var Logs_Join_1 = require("./Logs.Join");
Object.defineProperty(exports, "LogsJoin", { enumerable: true, get: function () { return __importDefault(Logs_Join_1).default; } });
var Blacklist_1 = require("./Blacklist");
Object.defineProperty(exports, "Blacklist", { enumerable: true, get: function () { return __importDefault(Blacklist_1).default; } });
var Subscriptions_1 = require("./Subscriptions");
Object.defineProperty(exports, "Subscriptions", { enumerable: true, get: function () { return __importDefault(Subscriptions_1).default; } });
//# sourceMappingURL=index.js.map