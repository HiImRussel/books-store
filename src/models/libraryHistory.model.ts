/** Sequelize */
import {
    Model,
    InferAttributes,
    InferCreationAttributes,
    DataTypes,
    CreationOptional,
} from "sequelize";

/** Config */
import sequelize from "../configs/db.config";

class LibraryHistory extends Model<
    InferAttributes<LibraryHistory>,
    InferCreationAttributes<LibraryHistory>
> {
    declare id: CreationOptional<number>;
    declare userId: number;
    declare bookId: number;
}

LibraryHistory.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
            unique: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        bookId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: "libraryHistory",
        timestamps: false,
    }
);

export default LibraryHistory;
