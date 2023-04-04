"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_database_1 = __importDefault(require("../config/config.database"));
const Profession = config_database_1.default.define("Professions", {
    name: sequelize_1.DataTypes.STRING,
    description: sequelize_1.DataTypes.STRING(2000)
});
Profession.addScope('defaultScope', {
    order: [['id', 'ASC']],
}, { override: true });
exports.default = Profession;
