"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Blacklist = void 0;
const sequelize_1 = require("sequelize");
const _1 = require(".");
class Blacklist extends sequelize_1.Model {
}
exports.Blacklist = Blacklist;
Blacklist.init({
    guild: {
        type: sequelize_1.DataTypes.BIGINT({ length: 32 }),
        primaryKey: true,
        unique: true,
        allowNull: false
    },
    reason: {
        type: sequelize_1.DataTypes.TEXT('tiny'),
        allowNull: false
    },
}, {
    sequelize: _1.sequelizeInstance
});
exports.default = Blacklist;
//# sourceMappingURL=Blacklist.js.map