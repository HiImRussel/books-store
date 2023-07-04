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

class UserLibrary extends Model<
    InferAttributes<UserLibrary>,
    InferCreationAttributes<UserLibrary>
> {
    declare id: CreationOptional<number>;
    declare userId: number;
    declare bookId: number;
}

UserLibrary.init(
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
        tableName: "userLibrary",
        timestamps: false,
    }
);

export default UserLibrary;
