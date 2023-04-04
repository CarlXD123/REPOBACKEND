import { Sequelize } from "sequelize"

const db = new Sequelize('railway', 'postgres', 'ySMDUp6glfA18TcbxPfP', {
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
export default db;
