"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogsCommands = void 0;
const sequelize_1 = require("sequelize");
const _1 = require(".");
class LogsCommands extends sequelize_1.Model {
}
exports.LogsCommands = LogsCommands;
LogsCommands.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    bot: {
        type: sequelize_1.DataTypes.BIGINT({ length: 32 }),
        allowNull: false
    },
    user: {
        type: sequelize_1.DataTypes.BIGINT({ length: 32 }),
        allowNull: false
    },
    guild: {
        type: sequelize_1.DataTypes.BIGINT({ length: 32 }),
        allowNull: false
    },
    command: {
        type: sequelize_1.DataTypes.STRING(),
        allowNull: false
    },
    args: {
        type: sequelize_1.DataTypes.STRING(),
        allowNull: false
    },
    success: {
        type: sequelize_1.DataTypes.BOOLEAN(),
        allowNull: false,
        defaultValue: true
    }
}, {
    sequelize: _1.sequelizeInstance,
    tableName: 'logs.Commands',
});
exports.default = LogsCommands;
//# sourceMappingURL=Logs.Commands.js.map