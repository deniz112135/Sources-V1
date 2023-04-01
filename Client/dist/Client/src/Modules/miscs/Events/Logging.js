"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logging = void 0;
exports.logging = {
    name: 'ready',
    run: (client) => {
        client.libs.log.print(`Logged in as %s`, 'Discord').success(client.user?.tag);
    }
};
//# sourceMappingURL=Logging.js.map