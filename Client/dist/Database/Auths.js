"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auths = void 0;
const sequelize_1 = require("sequelize");
const _1 = require(".");
class Auths extends sequelize_1.Model {
}
exports.Auths = Auths;
Auths.init({
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
        allowNull: true
    },
    locale: {
        type: sequelize_1.DataTypes.STRING({ length: 7 }),
        allowNull: false
    },
    access_token: {
        type: sequelize_1.DataTypes.STRING({ length: 32 }),
        allowNull: false
    },
    refresh_token: {
        type: sequelize_1.DataTypes.STRING({ length: 32 }),
        allowNull: false
    },
    userInformationsFailed: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    refreshFailed: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    expires_in: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    scope: {
        type: sequelize_1.DataTypes.STRING({ length: 32 }),
        allowNull: false
    },
    token_type: {
        type: sequelize_1.DataTypes.STRING({ length: 32 }),
        allowNull: false
    },
    expireDate: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    }
}, {
    sequelize: _1.sequelizeInstance
});
exports.default = Auths;
//# sourceMappingURL=Auths.js.map