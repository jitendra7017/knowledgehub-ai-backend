"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {

        await queryInterface.createTable("document_chunks", {

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

            document_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: "documents",
                    key: "id"
                },
                onUpdate: "CASCADE",
                onDelete: "CASCADE"
            },

            chunk_index: {
                type: Sequelize.INTEGER,
                allowNull: false
            },

            page_number: {
                type: Sequelize.INTEGER
            },

            content: {
                type: Sequelize.TEXT,
                allowNull: false
            },

            chunk_hash: {
                type: Sequelize.STRING(64),
                allowNull: false
            },

            token_count: {
                type: Sequelize.INTEGER,
                defaultValue: 0
            },

            embedding_model: {
                type: Sequelize.STRING(100)
            },

            pinecone_id: {
                type: Sequelize.STRING(255),
                unique: true
            },

            metadata: {
                type: Sequelize.JSONB,
                defaultValue: {}
            },

            created_at: {
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
            },

            updated_at: {
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
            }

        });

        await queryInterface.addConstraint("document_chunks", {
            fields: ["document_id", "chunk_index"],
            type: "unique",
            name: "uq_document_chunk_index"
        });

        await queryInterface.addIndex("document_chunks", ["document_id"]);
        await queryInterface.addIndex("document_chunks", ["chunk_hash"]);
        await queryInterface.addIndex("document_chunks", ["pinecone_id"]);
    },

    async down(queryInterface) {

        await queryInterface.dropTable("document_chunks");

    }
};