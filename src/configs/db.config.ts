/** Sequelize */
import { Sequelize } from "sequelize";

/** Dotenv */
import dotenv from "dotenv";

dotenv.config();

const dbName = process.env.DB_NAME;
const dbLogin = process.env.DB_LOGIN;
const dbPassword = process.env.DB_PASSWORD;
const dbHost = process.env.DB_HOST;

if (!dbName || !dbLogin || !dbPassword || !dbHost)
    throw new Error("DB config is incorrect!");

const sequelize = new Sequelize(dbName, dbLogin, dbPassword, {
    host: dbHost,
    dialect: "mysql",
    logging: false,
});

sequelize
    .authenticate()
    .then(() => {
        console.log("Connection has been established successfully.");
    })
    .catch((error) => {
        console.error("Unable to connect to the database: ", error);
    });

export default sequelize;
