import { Op, QueryTypes } from 'sequelize';
import db from '../config/config.database';
import ApilisPath from '../models/ApilisPath';
import { type } from 'os';

class ApilisPathServicios {
    constructor() {
    }

    public static buildQuery(query: any) {
        let where = {
            codBaja: {
                [Op.ne]: 1,
            },
        };

        if (query.codBaja) {
            where['"codBaja"'] = query.codBaja;
        }
         
        if (query.codBaja == 0) {
            if (query.date) {
                where['id'] = query.date;
            }
        }

        if (query.codBaja == 1) {
            if (query.date) {
                where['id'] = query.date;
            }
        }
        return where;

    }

  
    public static async getAllPath(offset: any, limit: any, query: any) {
        let where = ApilisPathServicios.buildQuery(query);
        const { count: total, rows } = await ApilisPath.findAndCountAll({
            where,
            distinct: true,
            offset,
            limit,
            //order: [["nameBrand", "ASC"]],
        });

        
        const result = {
            total,
            count: rows.length,
            data: rows
        };
        return result;
    }

    public static async getPath(id:any){
        const category = await ApilisPath.findByPk(id);
        if(!category) {
            //console.log("Error");
        }
        return category;
    }

    public static async addPath(data: any) {
        const apilisBrand = await ApilisPath.create(data);
        ApilisPath.update(
            {
                id: apilisBrand.get().id
            },
            {
                where: {
                    id: apilisBrand.get().id
                }
            }
        );
    }

    public static async updatePath(id: any, data: any) {
        db.transaction(async (transaction) => {
            let apilisBrand = await ApilisPath.findOne({
                where: {
                    id
                }
            });
            //     await appointment.setExaminations(data.examinations, { transaction });
            await apilisBrand.update(data);
        });
    }

    public static async destroyPath(id: any) {
        db.transaction(async transaction => {
            await ApilisPath.update(
                {
                    codBaja: 1,
                },
                {
                    where: { id: id }
                }
            );

           
        });
    }

}
export default ApilisPathServicios; 