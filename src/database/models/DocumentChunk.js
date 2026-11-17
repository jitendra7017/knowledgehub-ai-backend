import { DataTypes } from "sequelize";

import BaseModel from "./BaseModel.js";

class DocumentChunk extends BaseModel {}

DocumentChunk.initialize(
    {
        documentId: {
            type: DataTypes.BIGINT,
            allowNull: false
        },

        chunkIndex: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        page: {
            type: DataTypes.INTEGER
        },

        content: {
            type: DataTypes.TEXT("long"),
            allowNull: false
        },

        tokenCount: {
            type: DataTypes.INTEGER
        },

        embeddingId: {
            type: DataTypes.STRING
        },

        metadata: {
            type: DataTypes.JSONB,
            defaultValue: {}
        }
    },
    {
        modelName: "DocumentChunk",
        tableName: "document_chunks"
    }
);

export default DocumentChunk;