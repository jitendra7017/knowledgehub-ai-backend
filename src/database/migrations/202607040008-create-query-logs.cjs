"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {

        await queryInterface.createTable("query_logs", {

            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },

            user_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: "users",
                    key: "id"
                },
                onDelete: "SET NULL",
                onUpdate: "CASCADE"
            },

            question: {
                type: Sequelize.TEXT,
                allowNull: false
            },

            answer: {
                type: Sequelize.TEXT
            },

            model: {
                type: Sequelize.STRING(100)
            },

            prompt_tokens: {
                type: Sequelize.INTEGER,
                defaultValue: 0
            },

            completion_tokens: {
                type: Sequelize.INTEGER,
                defaultValue: 0
            },

            total_tokens: {
                type: Sequelize.INTEGER,
                defaultValue: 0
            },

            latency_ms: {
                type: Sequelize.INTEGER
            },

            cost: {
                type: Sequelize.DECIMAL(10, 6),
                defaultValue: 0
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

        await queryInterface.addIndex("query_logs", ["user_id"]);
        await queryInterface.addIndex("query_logs", ["created_at"]);
    },

    async down(queryInterface) {

        await queryInterface.dropTable("query_logs");

    }
};