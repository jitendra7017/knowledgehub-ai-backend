"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {

        await queryInterface.createTable("user_roles", {

            user_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: "users",
                    key: "id"
                },
                onUpdate: "CASCADE",
                onDelete: "CASCADE"
            },

            role_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: "roles",
                    key: "id"
                },
                onUpdate: "CASCADE",
                onDelete: "CASCADE"
            },

            created_at: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
            }

        });

        await queryInterface.addConstraint(
            "user_roles",
            {
                fields: ["user_id", "role_id"],
                type: "primary key",
                name: "pk_user_roles"
            }
        );

        await queryInterface.addIndex(
            "user_roles",
            ["user_id"]
        );

        await queryInterface.addIndex(
            "user_roles",
            ["role_id"]
        );

    },

    async down(queryInterface) {

        await queryInterface.dropTable("user_roles");

    }
};