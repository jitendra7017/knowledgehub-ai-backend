import { DataTypes } from "sequelize";

import BaseModel from "./BaseModel.js";

import DOCUMENT_STATUS from "../../common/constants/document-status.js";

class Document extends BaseModel {}

Document.initialize(
    {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },

        originalName: {
            type: DataTypes.STRING,
            allowNull: false
        },

        storedName: {
            type: DataTypes.STRING,
            allowNull: false
        },

        mimeType: {
            type: DataTypes.STRING,
            allowNull: false
        },

        extension: {
            type: DataTypes.STRING(20)
        },

        size: {
            type: DataTypes.BIGINT,
            allowNull: false
        },

        checksum: {
            type: DataTypes.STRING(64),
            unique: true
        },

        storagePath: {
            type: DataTypes.STRING,
            allowNull: false
        },

        metadata: {
            type: DataTypes.JSONB,
            defaultValue: {}
        },

        processingMetadata: {
            type: DataTypes.JSONB,
            defaultValue: {}
        },

        uploadedBy: {
            type: DataTypes.BIGINT,
            allowNull: false
        },

        status: {
            type: DataTypes.ENUM(
                ...Object.values(DOCUMENT_STATUS)
            ),
            defaultValue: DOCUMENT_STATUS.UPLOADED
        },

        retryCount: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },

        failureReason: {
            type: DataTypes.TEXT
        },

        processingStartedAt: DataTypes.DATE,

        processingCompletedAt: DataTypes.DATE
    },
    {
        modelName: "Document",
        tableName: "documents"
    }
);

export default Document;