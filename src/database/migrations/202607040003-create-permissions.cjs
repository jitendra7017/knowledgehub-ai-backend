"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {

        await queryInterface.createTable("permissions", {

            id: {
                type: Sequelize.BIGINT,
                autoIncrement: true,
                primaryKey: true
            },

            uuid: {
                type: Sequelize.UUID,
                allowNull: false,
                defaultValue: Sequelize.literal("gen_random_uuid()"),
                unique: true
            },

            module: {
                type: Sequelize.STRING(100),
                allowNull: false
            },

            action: {
                type: Sequelize.STRING(100),
                allowNull: false
            },

            name: {
                type: Sequelize.STRING(150),
                allowNull: false,
                unique: true
            },

            description: {
                type: Sequelize.TEXT
            },

            created_at: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
            },

            updated_at: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
            }

        });

        await queryInterface.addIndex(
            "permissions",
            ["module"]
        );

        await queryInterface.addIndex(
            "permissions",
            ["action"]
        );

        await queryInterface.addIndex(
            "permissions",
            ["name"],
            {
                unique: true
            }
        );

    },

    async down(queryInterface) {

        await queryInterface.dropTable("permissions");

    }
};