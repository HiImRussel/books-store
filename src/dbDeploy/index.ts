/** Config */
import sequelize from "../configs/db.config";

/** Modles */
import "../models/user.model";
import "../models/book.model";
import "../models/userLibrary.model";
import "../models/libraryHistory.model";
import "../models/booksHistory.model";

sequelize
    .sync()
    .then(() => {
        console.log("Tables created successfully!");
    })
    .catch((error) => {
        console.error("Unable to create table : ", error);
    });
