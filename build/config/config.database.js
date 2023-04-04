"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db = new sequelize_1.Sequelize('railway', 'postgres', 'ySMDUp6glfA18TcbxPfP', {
    host: 'containers-us-west-24.railway.app',
    dialect: 'postgres',
    logging: false,
    port: 6471,
    protocol: 'postgres',
    dialectOptions: {
        ssl: process.env.DB_ENABLE_SSL && {
            require: true
        }
    }
});
exports.default = db;
