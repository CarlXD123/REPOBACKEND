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

const sequelize_1 = require("sequelize");
const config_database_1 = __importDefault(require("../config/config.database"));
const ApilisModel_1 = __importDefault(require("../models/ApilisModel"));
const ApilisPath_1 = __importDefault(require("../models/ApilisPath"));

class ApilisModelServicios {
    constructor() {
    }


    static getAllModel(idBrand) {
        return __awaiter(this, void 0, void 0, function* () {
            const { count: total, rows } = yield ApilisModel_1.default.findAndCountAll({
                where: {
                    idBrand,
                    codBaja: {
                        [sequelize_1.Op.ne]: 1,
                    },
                },
                order: [["nameModel", "ASC"]],
            });

            const result = {
                total,
                count: rows.length,
                data: rows
            };
            
            return result;
        });
    }

    static getModel(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const category = yield ApilisModel_1.default.findByPk(id);
            if (!category) {
                //console.log("Error");
            }
            return category;
        });
    }

    static addModel(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const apilisBrand = yield ApilisModel_1.default.create(data);
            const apilisPath = yield ApilisPath_1.default.create(data);

            ApilisPath_1.default.update({
                idModel: apilisBrand.get().id
            }, {
                where: {
                    id: apilisPath.get().id
                }
            });

            return apilisBrand

        });
    }

    static updateModel(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            config_database_1.default.transaction((transaction) => __awaiter(this, void 0, void 0, function* () {
                let apilisBrand = yield ApilisModel_1.default.findOne({
                    where: {
                        id
                    }
                });
                //     await appointment.setExaminations(data.examinations, { transaction });
                yield apilisBrand.update(data);
            }));
        });
    }

    static destroyModel(id) {
        config_database_1.default.transaction((transaction) => __awaiter(this, void 0, void 0, function* () {
            yield ApilisModel_1.default.update({
                codBaja: 1,
            }, {
                where: { id: id }
            });
            yield ApilisPath_1.default.update({
                codBaja: 1,
            }, {
                where: { idModel: id }
            });
        }));
    }

}

exports.default = ApilisModelServicios;