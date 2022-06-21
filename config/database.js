import dotenv from "dotenv";
import Sequelize from "sequelize";

dotenv.config();

const db = new Sequelize("bienes_raices", process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",
    define: {
        timestamps: true,
    },
    pool: {
        min: 0, 
        max: 5, // Máximo 5 conexiones por usuario.
        idle: 10000, // 10 segundos antes de que se finalice la conexión sin utilizar.
        acquire: 30000, // 30 segundos tratando de elaborar una conexión antes de marcar error.
    },
    operatorAliases: false
});

export default db;