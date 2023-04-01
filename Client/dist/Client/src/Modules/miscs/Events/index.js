"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AutoCompleteLangs = exports.AutoCompleteProcessJoin = exports.logging = exports.registerBot = exports.CommandHandler = exports.onGuildAdded = exports.OnReady = void 0;
var guildSettings_1 = require("./guildSettings");
Object.defineProperty(exports, "OnReady", { enumerable: true, get: function () { return guildSettings_1.OnReady; } });
Object.defineProperty(exports, "onGuildAdded", { enumerable: true, get: function () { return guildSettings_1.onGuildAdded; } });
var CommandHandler_1 = require("./CommandHandler");
Object.defineProperty(exports, "CommandHandler", { enumerable: true, get: function () { return CommandHandler_1.CommandHandler; } });
var registerBot_1 = require("./registerBot");
Object.defineProperty(exports, "registerBot", { enumerable: true, get: function () { return registerBot_1.registerBot; } });
var Logging_1 = require("./Logging");
Object.defineProperty(exports, "logging", { enumerable: true, get: function () { return Logging_1.logging; } });
var AutoCompleteProcessJoin_1 = require("./AutoCompleteProcessJoin");
Object.defineProperty(exports, "AutoCompleteProcessJoin", { enumerable: true, get: function () { return AutoCompleteProcessJoin_1.AutoCompleteProcessJoin; } });
var AutoCompleteLangs_1 = require("./AutoCompleteLangs");
Object.defineProperty(exports, "AutoCompleteLangs", { enumerable: true, get: function () { return AutoCompleteLangs_1.AutoCompleteLangs; } });
//# sourceMappingURL=index.js.map