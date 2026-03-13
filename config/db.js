import { Sequelize } from "sequelize";
import dotenv from 'dotenv'

//Cargamos las variables de entorno según el ambiente
if(process.env.NODE_ENV === 'test'){
    dotenv.config({path: '.env.test'});
} else {
    dotenv.config()
}


const db = new Sequelize(
    process.env.BD_NOMBRE,
    process.env.BD_USER,
    process.env.BD_PASSWORD,{
    host: process.env.BD_HOST,
    port: process.env.BD_PORT,
    dialect: 'mysql',
    define: {
        timestamps: false
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    operatorsAliases: false,
    logging: false
})

export default db;