"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bots = void 0;
const sequelize_1 = require("sequelize");
const _1 = require(".");
class Bots extends sequelize_1.Model {
}
exports.Bots = Bots;
Bots.init({
    id: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true,
        unique: true
    },
    type: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: 0
    },
    secret: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    token: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    buyer: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        defaultValue: JSON.stringify([])
    },
    owners: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        defaultValue: JSON.stringify([])
    },
    logHook: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    }
}, {
    sequelize: _1.sequelizeInstance
});
Bots.afterFind(async (bots) => {
    if (!bots)
        return;
    if (Array.isArray(bots)) {
        bots.forEach(bot => {
            bot.owners = JSON.parse(bot.owners);
            bot.buyer = JSON.parse(bot.buyer);
        });
    }
    else {
        bots.owners = JSON.parse(bots.owners);
        bots.buyer = JSON.parse(bots.buyer);
    }
});
exports.default = Bots;
//# sourceMappingURL=Bots.js.map