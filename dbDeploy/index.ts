/** Config */
import sequelize from "../config/db";

/** Modles */
import "../models/user";

sequelize
    .sync()
    .then(() => {
        console.log("User table created successfully!");
    })
    .catch((error) => {
        console.error("Unable to create table : ", error);
    });
