import { DataTypes } from "sequelize";
import BaseModel from "./BaseModel.js";

class Permission extends BaseModel {}

Permission.initialize(
    {
        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true
        },

        module: {
            type: DataTypes.STRING(50),
            allowNull: false
        },

        action: {
            type: DataTypes.STRING(50),
            allowNull: false
        },

        description: {
            type: DataTypes.STRING
        }
    },
    {
        modelName: "Permission",
        tableName: "permissions"
    }
);

export default Permission;