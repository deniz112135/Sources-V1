"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Subscriptions = void 0;
const sequelize_1 = require("sequelize");
const _1 = require(".");
class Subscriptions extends sequelize_1.Model {
}
exports.Subscriptions = Subscriptions;
Subscriptions.init({
    bot: {
        type: sequelize_1.DataTypes.BIGINT({ length: 32 }),
        primaryKey: true,
        unique: true
    },
    renewDate: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    }
}, {
    sequelize: _1.sequelizeInstance,
    timestamps: false
});
exports.default = Subscriptions;
//# sourceMappingURL=Subscriptions.js.map