"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Settings = void 0;
const sequelize_1 = require("sequelize");
const _1 = require(".");
class Settings extends sequelize_1.Model {
}
exports.Settings = Settings;
Settings.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    bot: {
        type: sequelize_1.DataTypes.BIGINT({ length: 32 }),
        allowNull: false
    },
    guild: {
        type: sequelize_1.DataTypes.BIGINT({ length: 32 }),
        allowNull: false
    },
    role: {
        type: sequelize_1.DataTypes.BIGINT({ length: 32 }),
        allowNull: true
    },
    successTitle: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        defaultValue: "Compte vérifiée"
    },
    successMessage: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        defaultValue: "Votre compte a été vérifié avec succès."
    },
    successColor: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        defaultValue: "#00ff00"
    }
}, {
    sequelize: _1.sequelizeInstance,
    timestamps: false
});
exports.default = Settings;
//# sourceMappingURL=Settings.js.map