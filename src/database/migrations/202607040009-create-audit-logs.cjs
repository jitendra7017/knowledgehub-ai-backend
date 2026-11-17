"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {

        await queryInterface.createTable("audit_logs", {

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

            action: {
                type: Sequelize.STRING(100),
                allowNull: false
            },

            entity: {
                type: Sequelize.STRING(100),
                allowNull: false
            },

            entity_id: {
                type: Sequelize.STRING(100)
            },

            ip_address: {
                type: Sequelize.STRING(45)
            },

            user_agent: {
                type: Sequelize.TEXT
            },

            metadata: {
                type: Sequelize.JSONB,
                defaultValue: {}
            },

            created_at: {
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
            }

        });

        await queryInterface.addIndex("audit_logs", ["user_id"]);
        await queryInterface.addIndex("audit_logs", ["entity"]);
        await queryInterface.addIndex("audit_logs", ["action"]);
        await queryInterface.addIndex("audit_logs", ["created_at"]);
    },

    async down(queryInterface) {

        await queryInterface.dropTable("audit_logs");

    }
};