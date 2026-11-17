import { DataTypes } from "sequelize";

import BaseModel from "./BaseModel.js";

class AuditLog extends BaseModel {}

AuditLog.initialize(
    {
        userId: {
            type: DataTypes.BIGINT
        },

        action: {
            type: DataTypes.STRING,
            allowNull: false
        },

        entity: {
            type: DataTypes.STRING,
            allowNull: false
        },

        entityId: {
            type: DataTypes.STRING
        },

        ipAddress: {
            type: DataTypes.STRING
        },

        userAgent: {
            type: DataTypes.TEXT
        },

        metadata: {
            type: DataTypes.JSONB,
            defaultValue: {}
        }
    },
    {
        modelName: "AuditLog",
        tableName: "audit_logs"
    }
);

export default AuditLog;