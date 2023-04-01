"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IPs = void 0;
const sequelize_1 = require("sequelize");
const _1 = require(".");
class IPs extends sequelize_1.Model {
}
exports.IPs = IPs;
IPs.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    user: {
        type: sequelize_1.DataTypes.BIGINT({ length: 32 }),
        allowNull: false
    },
    ip: {
        type: sequelize_1.DataTypes.STRING(),
        allowNull: true
    }
}, {
    sequelize: _1.sequelizeInstance
});
exports.default = IPs;
//# sourceMappingURL=IPs.js.map