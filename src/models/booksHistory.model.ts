/** Sequelize */
import {
    Model,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
    DataTypes,
} from "sequelize";

/** Config */
import sequelize from "../configs/db.config";

class BooksHistory extends Model<
    InferAttributes<BooksHistory>,
    InferCreationAttributes<BooksHistory>
> {
    declare id: CreationOptional<number>;
    declare message: string;
}

BooksHistory.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
            unique: true,
        },
        message: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: "booksHistory",
        timestamps: false,
    }
);

export default BooksHistory;
