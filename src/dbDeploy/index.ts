/** Config */
import sequelize from "../configs/db.config";

/** Modles */
import "../models/user.model";

sequelize
    .sync()
    .then(() => {
        console.log("User table created successfully!");
    })
    .catch((error) => {
        console.error("Unable to create table : ", error);
    });
