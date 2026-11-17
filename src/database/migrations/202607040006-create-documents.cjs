"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {

        await queryInterface.createTable("documents", {

            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },

            uuid: {
                type: Sequelize.UUID,
                allowNull: false,
                defaultValue: Sequelize.literal("gen_random_uuid()"),
                unique: true
            },

            title: {
                type: Sequelize.STRING,
                allowNull: false
            },

            original_name: {
                type: Sequelize.STRING,
                allowNull: false
            },

            stored_name: {
                type: Sequelize.STRING,
                allowNull: false
            },

            mime_type: {
                type: Sequelize.STRING,
                allowNull: false
            },

            extension: Sequelize.STRING(20),

            size: {
                type: Sequelize.BIGINT,
                allowNull: false
            },

            checksum: {
                type: Sequelize.STRING(64),
                unique: true,
                allowNull: false
            },

            storage_path: {
                type: Sequelize.TEXT,
                allowNull: false
            },

            metadata: {
                type: Sequelize.JSONB,
                defaultValue: {}
            },

            processing_metadata: {
                type: Sequelize.JSONB,
                defaultValue: {}
            },

            uploaded_by: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: "users",
                    key: "id"
                },
                onUpdate: "CASCADE",
                onDelete: "RESTRICT"
            },

            status: {
                type: Sequelize.ENUM(
                    "UPLOADED",
                    "QUEUED",
                    "PARSING",
                    "CHUNKING",
                    "EMBEDDING",
                    "INDEXING",
                    "READY",
                    "FAILED"
                ),
                defaultValue: "UPLOADED"
            },

            retry_count: {
                type: Sequelize.INTEGER,
                defaultValue: 0
            },

            failure_reason: Sequelize.TEXT,

            processing_started_at: Sequelize.DATE,

            processing_completed_at: Sequelize.DATE,

            created_at: {
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
            },

            updated_at: {
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
            }

        });

        await queryInterface.addIndex("documents", ["uuid"]);
        await queryInterface.addIndex("documents", ["uploaded_by"]);
        await queryInterface.addIndex("documents", ["status"]);
        await queryInterface.addIndex("documents", ["checksum"]);
    },

    async down(queryInterface) {
        await queryInterface.dropTable("documents");
        await queryInterface.sequelize.query(
            'DROP TYPE IF EXISTS "enum_documents_status";'
        );
    }
};