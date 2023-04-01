"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogsJoin = void 0;
const sequelize_1 = require("sequelize");
const _1 = require(".");
class LogsJoin extends sequelize_1.Model {
}
exports.LogsJoin = LogsJoin;
LogsJoin.init({
    bot: {
        type: sequelize_1.DataTypes.BIGINT({ length: 32 }),
        allowNull: false
    },
    guild: {
        type: sequelize_1.DataTypes.BIGINT({ length: 32 }),
        allowNull: false
    },
    user: {
        type: sequelize_1.DataTypes.BIGINT({ length: 32 }),
        allowNull: false
    },
    stats: {
        type: sequelize_1.DataTypes.TEXT("long"),
        allowNull: true
    }
}, {
    sequelize: _1.sequelizeInstance,
    tableName: 'logs.Join'
});
exports.default = LogsJoin;
//# sourceMappingURL=Logs.Join.js.map