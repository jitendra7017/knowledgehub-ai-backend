"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.sequelize.query(`
            CREATE EXTENSION IF NOT EXISTS "pgcrypto";
        `);

        await queryInterface.createTable("users", {
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

            first_name: {
                type: Sequelize.STRING(100),
                allowNull: false
            },

            last_name: {
                type: Sequelize.STRING(100),
                allowNull: true
            },

            email: {
                type: Sequelize.STRING(255),
                allowNull: false,
                unique: true
            },

            password: {
                type: Sequelize.STRING,
                allowNull: false
            },

            avatar: {
                type: Sequelize.TEXT,
                allowNull: true
            },

            is_active: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: true
            },

            last_login_at: {
                type: Sequelize.DATE,
                allowNull: true
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

        await queryInterface.addIndex("users", ["email"], {
            unique: true,
            name: "users_email_unique"
        });

        await queryInterface.addIndex("users", ["uuid"], {
            unique: true,
            name: "users_uuid_unique"
        });

        await queryInterface.addIndex("users", ["is_active"], {
            name: "users_is_active_index"
        });
    },

    async down(queryInterface) {
        await queryInterface.dropTable("users");
    }
};