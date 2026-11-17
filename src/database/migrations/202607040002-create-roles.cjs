"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {

        await queryInterface.createTable("roles", {

            id: {
                type: Sequelize.BIGINT,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },

            uuid: {
                type: Sequelize.UUID,
                allowNull: false,
                defaultValue: Sequelize.literal("gen_random_uuid()"),
                unique: true
            },

            name: {
                type: Sequelize.STRING(100),
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

        await queryInterface.addIndex("roles", ["name"]);

    },

    async down(queryInterface) {

        await queryInterface.dropTable("roles");

    }
};