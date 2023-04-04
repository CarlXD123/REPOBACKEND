"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_database_1 = __importDefault(require("../config/config.database"));
const Method_1 = __importDefault(require("../models/Method"));
class MethodServicios {
    constructor() {
    }
    static getAllMethod() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Method_1.default.findAll({
                order: [["name", "ASC"]],
            });
        });
    }
    static getPagedMethod(offset, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            const { count: total, rows } = yield Method_1.default.findAndCountAll({
                offset,
                limit,
            });
            const result = {
                total,
                count: rows.length,
                data: rows
            };
            return result;
        });
    }
    static createMethod(data) {
        config_database_1.default.transaction((transaction) => __awaiter(this, void 0, void 0, function* () {
            const method = yield Method_1.default.create(data, { transaction });
            return method;
        }));
    }
    static getMethod(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = yield Method_1.default.findByPk(id);
            if (!method) {
                //console.log("Error");
            }
            return method;
        });
    }
    static updateMethod(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = yield Method_1.default.findByPk(id);
            if (!method) {
                //console.log("Error");
            }
            return yield method.update(data);
        });
    }
    static destroyMethod(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = yield Method_1.default.findByPk(id);
            if (!method) {
                //console.log("Error");
            }
            return yield method.destroy();
        });
    }
}
exports.default = MethodServicios;
