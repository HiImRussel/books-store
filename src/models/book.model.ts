/** Sequelize */
import { DataTypes } from "sequelize";

/** Config */
import sequelize from "../configs/db.config";

import {
    Model,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
} from "sequelize";

class Book extends Model<InferAttributes<Book>, InferCreationAttributes<Book>> {
    declare id: CreationOptional<number>;
    declare coverImgURL: string;
    declare title: string;
    declare author: string;
    declare description: string;
    declare quantity: number;
}

Book.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
            unique: true,
        },
        coverImgURL: {
            type: DataTypes.STRING,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        author: {
            type: DataTypes.STRING,
        },
        description: {
            type: DataTypes.TEXT,
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: "books",
        timestamps: false,
    }
);

export default Book;
