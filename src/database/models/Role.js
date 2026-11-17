import { DataTypes } from "sequelize";

import BaseModel from "./BaseModel.js";

class Role extends BaseModel {}

Role.initialize(
    {

        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true
        },

        description: DataTypes.STRING

    },
    {

        modelName: "Role",

        tableName: "roles"

    }
);

export default Role;