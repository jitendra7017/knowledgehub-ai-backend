import { DataTypes } from "sequelize";

import BaseModel from "./BaseModel.js";

class QueryLog extends BaseModel {}

QueryLog.initialize(
    {
        userId: {
            type: DataTypes.BIGINT
        },

        question: {
            type: DataTypes.TEXT,
            allowNull: false
        },

        answer: {
            type: DataTypes.TEXT("long")
        },

        model: {
            type: DataTypes.STRING
        },

        promptTokens: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },

        completionTokens: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },

        totalTokens: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },

        latency: {
            type: DataTypes.INTEGER
        },

        cost: {
            type: DataTypes.DECIMAL(10,6),
            defaultValue: 0
        },

        metadata: {
            type: DataTypes.JSONB,
            defaultValue: {}
        }
    },
    {
        modelName: "QueryLog",
        tableName: "query_logs"
    }
);

export default QueryLog;