import { DataTypes } from "sequelize";

import BaseModel from "./BaseModel.js";

class User extends BaseModel {}

User.initialize(
    {
        firstName: {
            type: DataTypes.STRING(100),
            allowNull: false
        },

        lastName: {
            type: DataTypes.STRING(100)
        },

        email: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },

        password: {
            type: DataTypes.STRING,
            allowNull: false
        },

        avatar: {
            type: DataTypes.STRING
        },

        isActive: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },

        lastLoginAt: {
            type: DataTypes.DATE
        }
    },
    {
        modelName: "User",

        tableName: "users"
    }
);

export default User;