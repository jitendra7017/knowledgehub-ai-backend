"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {

        await queryInterface.createTable("role_permissions", {

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

            permission_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: "permissions",
                    key: "id"
                },
                onUpdate: "CASCADE",
                onDelete: "CASCADE"
            },

            created_at: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
            }

        });

        await queryInterface.addConstraint(
            "role_permissions",
            {
                fields: ["role_id", "permission_id"],
                type: "primary key",
                name: "pk_role_permissions"
            }
        );

        await queryInterface.addIndex(
            "role_permissions",
            ["role_id"]
        );

        await queryInterface.addIndex(
            "role_permissions",
            ["permission_id"]
        );

    },

    async down(queryInterface) {

        await queryInterface.dropTable("role_permissions");

    }
};