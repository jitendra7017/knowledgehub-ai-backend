"use strict";

/** @type {import('sequelize-cli').Migration} */

const permissions = [
    {
        module: "auth",
        action: "login",
        name: "auth.login",
        description: "User login"
    },

    {
        module: "users",
        action: "create",
        name: "users.create",
        description: "Create user"
    },
    {
        module: "users",
        action: "read",
        name: "users.read",
        description: "View users"
    },
    {
        module: "users",
        action: "update",
        name: "users.update",
        description: "Update users"
    },
    {
        module: "users",
        action: "delete",
        name: "users.delete",
        description: "Delete users"
    },

    {
        module: "roles",
        action: "create",
        name: "roles.create",
        description: "Create role"
    },
    {
        module: "roles",
        action: "read",
        name: "roles.read",
        description: "View roles"
    },
    {
        module: "roles",
        action: "update",
        name: "roles.update",
        description: "Update role"
    },
    {
        module: "roles",
        action: "delete",
        name: "roles.delete",
        description: "Delete role"
    },

    {
        module: "permissions",
        action: "read",
        name: "permissions.read",
        description: "View permissions"
    },
    {
        module: "permissions",
        action: "assign",
        name: "permissions.assign",
        description: "Assign permissions"
    },

    {
        module: "documents",
        action: "upload",
        name: "documents.upload",
        description: "Upload document"
    },
    {
        module: "documents",
        action: "read",
        name: "documents.read",
        description: "Read document"
    },
    {
        module: "documents",
        action: "update",
        name: "documents.update",
        description: "Update document"
    },
    {
        module: "documents",
        action: "delete",
        name: "documents.delete",
        description: "Delete document"
    },
    {
        module: "documents",
        action: "process",
        name: "documents.process",
        description: "Process document"
    },

    {
        module: "ai",
        action: "query",
        name: "ai.query",
        description: "Query AI"
    },
    {
        module: "ai",
        action: "train",
        name: "ai.train",
        description: "Train AI"
    },
    {
        module: "ai",
        action: "manage",
        name: "ai.manage",
        description: "Manage AI"
    },

    {
        module: "audit",
        action: "read",
        name: "audit.read",
        description: "View audit logs"
    },

    {
        module: "settings",
        action: "read",
        name: "settings.read",
        description: "View settings"
    },
    {
        module: "settings",
        action: "update",
        name: "settings.update",
        description: "Update settings"
    }
];

module.exports = {
    async up(queryInterface) {
        await queryInterface.bulkInsert(
            "permissions",
            permissions.map((permission) => ({
                ...permission,
                uuid: require("crypto").randomUUID(),
                created_at: new Date(),
                updated_at: new Date()
            }))
        );
    },

    async down(queryInterface) {
        await queryInterface.bulkDelete("permissions", null, {});
    }
};