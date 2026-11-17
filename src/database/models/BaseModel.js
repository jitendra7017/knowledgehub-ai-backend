import { Model, DataTypes } from "sequelize";
import sequelize from "../connection.js";

class BaseModel extends Model {

    /**
     * Initialize model
     * @param {Object} attributes
     * @param {Object} options
     */
    static initialize(attributes, options = {}) {

        super.init(
            {
                id: {
                    type: DataTypes.BIGINT,
                    autoIncrement: true,
                    primaryKey: true
                },

                uuid: {
                    type: DataTypes.UUID,
                    defaultValue: DataTypes.UUIDV4,
                    unique: true,
                    allowNull: false
                },

                ...attributes
            },
            {
                sequelize,

                timestamps: true,

                underscored: true,

                paranoid: false,

                freezeTableName: false,

                ...options
            }
        );

        return this;
    }

}

export default BaseModel;