"use strict";

const bcrypt = require("bcrypt");
const crypto = require("crypto");

module.exports = {
    async up(queryInterface) {
        const password = await bcrypt.hash("Admin@123", 12);

        await queryInterface.bulkInsert("users", [
            {
                uuid: crypto.randomUUID(),
                first_name: "System",
                last_name: "Administrator",
                email: "admin@knowledgehub.ai",
                password,
                is_active: true,
                created_at: new Date(),
                updated_at: new Date()
            }
        ]);

        const [users] = await queryInterface.sequelize.query(
            `SELECT id FROM users WHERE email='admin@knowledgehub.ai'`
        );

        const [roles] = await queryInterface.sequelize.query(
            `SELECT id FROM roles WHERE name='Super Admin'`
        );

        await queryInterface.bulkInsert("user_roles", [
            {
                user_id: users[0].id,
                role_id: roles[0].id,
                created_at: new Date()
            }
        ]);

        // Assign all permissions to Super Admin
        const [permissions] = await queryInterface.sequelize.query(
            `SELECT id FROM permissions`
        );

        await queryInterface.bulkInsert(
            "role_permissions",
            permissions.map((permission) => ({
                role_id: roles[0].id,
                permission_id: permission.id,
                created_at: new Date()
            }))
        );
    },

    async down(queryInterface) {
        await queryInterface.bulkDelete("role_permissions", null, {});
        await queryInterface.bulkDelete("user_roles", null, {});
        await queryInterface.bulkDelete(
            "users",
            { email: "admin@knowledgehub.ai" },
            {}
        );
    }
};