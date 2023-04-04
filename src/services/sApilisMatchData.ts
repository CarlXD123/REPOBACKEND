import { Op, QueryTypes } from 'sequelize';
import db from '../config/config.database';
import ApilisMatchData from '../models/ApilisMatchData';
import { type } from 'os';

class ApilisMatchDataServicios {
    constructor() {
    }

    public static async getAllMatchData(offset: any, limit: any,) {
        const { count: total, rows } = await ApilisMatchData.findAndCountAll({
            where: {
                codBaja: {
                    [Op.ne]: 1,
                },
            },
            distinct: true,
            offset,
            limit,

        });

            const daton = (await db.query<any>(`SELECT e.id as id, e.name as nameex, s."Color"
            FROM public."Examinations" e 
            left join public."ApilisMatchDatas" s ON e.id = s."idExamen"
            where e."status"= 'A'`, { type: QueryTypes.SELECT }));
  
            


            //     where["$Client.UserId$"] = query.UserId;
            // }
        const result = {
            total,
            count: daton.length,
            data: daton
        };
        return result;
    }

    public static async getMatchData(id:any){
        const category = await ApilisMatchData.findByPk(id);
        if(!category) {
            //console.log("Error");
        }
        return category;
    }


    public static async addMatchData(data: any) {
        const Apilismatch = await ApilisMatchData.create(data);
        ApilisMatchData.update(
            {
                id: Apilismatch.get().id
            },
            {
                where: {
                    id: Apilismatch.get().id
                }
            }
        );

        return Apilismatch

    }

    public static async updateMatchData(id: any, data: any) {
        db.transaction(async (transaction) => {
            let apilisMatch = await ApilisMatchData.findOne({
                where: {
                    id
                }
            });
            //     await appointment.setExaminations(data.examinations, { transaction });
            await apilisMatch.update(data);
        });
    }

    public static async destroyMatchData(id: any) {
        db.transaction(async transaction => {
            await ApilisMatchData.update(
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
export default ApilisMatchDataServicios; 