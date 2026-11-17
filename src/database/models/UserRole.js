import { DataTypes } from "sequelize";
import BaseModel from "./BaseModel.js";

class UserRole extends BaseModel {}

UserRole.initialize(
    {
        userId: {
            type: DataTypes.BIGINT,
            allowNull: false
        },

        roleId: {
            type: DataTypes.BIGINT,
            allowNull: false
        }
    },
    {
        modelName: "UserRole",
        tableName: "user_roles"
    }
);

export default UserRole;