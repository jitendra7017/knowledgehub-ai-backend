import { DataTypes } from "sequelize";
import BaseModel from "./BaseModel.js";

class RolePermission extends BaseModel {}

RolePermission.initialize(
    {
        roleId: {
            type: DataTypes.BIGINT,
            allowNull: false
        },

        permissionId: {
            type: DataTypes.BIGINT,
            allowNull: false
        }
    },
    {
        modelName: "RolePermission",
        tableName: "role_permissions"
    }
);

export default RolePermission;