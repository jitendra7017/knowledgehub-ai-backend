"use strict";

const crypto = require("crypto");

module.exports = {
    async up(queryInterface) {
        await queryInterface.bulkInsert("roles", [
            {
                uuid: crypto.randomUUID(),
                name: "Super Admin",
                description: "Full system access",
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                uuid: crypto.randomUUID(),
                name: "Admin",
                description: "Administrative access",
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                uuid: crypto.randomUUID(),
                name: "User",
                description: "Standard user",
                created_at: new Date(),
                updated_at: new Date()
            }
        ]);
    },

    async down(queryInterface) {
        await queryInterface.bulkDelete("roles", null, {});
    }
};