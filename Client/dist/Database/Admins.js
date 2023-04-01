"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Admins = void 0;
const sequelize_1 = require("sequelize");
const _1 = require(".");
class Admins extends sequelize_1.Model {
}
exports.Admins = Admins;
Admins.init({
    id: {
        type: sequelize_1.DataTypes.BIGINT({ length: 32 }),
        primaryKey: true
    }
}, {
    sequelize: _1.sequelizeInstance,
    timestamps: false
});
exports.default = Admins;
//# sourceMappingURL=Admins.js.map