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
const ApilisMatchData_1 = __importDefault(require("../models/ApilisMatchData"));

class ApilisMatchDataServicios {
    constructor() {
    }


    static getAllMatchData(offset, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            const { count: total, rows } = yield ApilisMatchData_1.default.findAndCountAll({
                where: {
                    codBaja: {
                        [sequelize_1.Op.ne]: 1,
                    },
                },
                distinct: true,
                offset,
                limit,
            });


                const daton = (yield config_database_1.default.query(`SELECT e.id as id, e.name as nameex, s."Color"
                FROM public."Examinations" e 
                left join public."ApilisMatchDatas" s ON e.id = s."idExamen"
                where e."status"= 'A'`, { type: sequelize_1.QueryTypes.SELECT }));

                
            
                //     where["$Client.UserId$"] = query.UserId;
                // }
            
            const result = {
                total,
                count: daton.length,
                data: daton
            };
            return result;
        });
    }

    static getMatchData(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const category = yield ApilisMatchData_1.default.findByPk(id);
            if (!category) {
                //console.log("Error");
            }
            return category;
        });
    }

    static addMatchData(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const apilisBrand = yield ApilisMatchData_1.default.create(data);

            ApilisMatchData_1.default.update({
                id: apilisBrand.get().id
            }, {
                where: {
                    id: apilisBrand.get().id
                }
            });

            return apilisBrand

        });
    }

    static updateMatchData(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            config_database_1.default.transaction((transaction) => __awaiter(this, void 0, void 0, function* () {
                let apilisBrand = yield ApilisMatchData_1.default.findOne({
                    where: {
                        id
                    }
                });
                //     await appointment.setExaminations(data.examinations, { transaction });
                yield apilisBrand.update(data);
            }));
        });
    }

    static destroyMatchData(id) {
        config_database_1.default.transaction((transaction) => __awaiter(this, void 0, void 0, function* () {
            yield ApilisMatchData_1.default.update({
                codBaja: 1,
            }, {
                where: { id: id }
            });
        }));
    }

}

exports.default = ApilisMatchDataServicios;