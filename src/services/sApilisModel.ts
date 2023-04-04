import { Op, QueryTypes } from 'sequelize';
import db from '../config/config.database';
import ApilisModel from '../models/ApilisModel';
import ApilisPath from '../models/ApilisPath';
import { type } from 'os';

class ApilisModelServicios {
    constructor() {
    }

    public static async getAllModel(idBrand: any) {
        const { count: total, rows } = await ApilisModel.findAndCountAll({
            where: {
                idBrand,
                codBaja: {
                    [Op.ne]: 1,
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
    }

    public static async getModel(id:any){
        const category = await ApilisModel.findByPk(id);
        if(!category) {
            //console.log("Error");
        }
        return category;
    }


    public static async addModel(data: any) {
        const apilisBrand = await ApilisModel.create(data);
        const apilisPath = await ApilisPath.create(data);
        ApilisPath.update(
            {
                idModel: apilisBrand.get().id
            },
            {
                where: {
                    id: apilisPath.get().id
                }
            }
        );

        return apilisBrand

    }

    public static async updateModel(id: any, data: any) {
        db.transaction(async (transaction) => {
            let apilisBrand = await ApilisModel.findOne({
                where: {
                    id
                }
            });
            //     await appointment.setExaminations(data.examinations, { transaction });
            await apilisBrand.update(data);
        });
    }

    public static async destroyModel(id: any) {
        db.transaction(async transaction => {
            await ApilisModel.update(
                {
                    codBaja: 1,
                },
                {
                    where: { id: id }
                }
            );

            await ApilisPath.update(
                {
                    codBaja: 1,
                },
                {
                    where: { idModel: id }
                }
            );



        });
    }

}
export default ApilisModelServicios; 