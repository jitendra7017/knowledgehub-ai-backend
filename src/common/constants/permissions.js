export const PERMISSIONS = [
    // Auth
    {
        module: "auth",
        action: "login",
        name: "auth.login",
        description: "User login"
    },

    // Users
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
        description: "Update user"
    },
    {
        module: "users",
        action: "delete",
        name: "users.delete",
        description: "Delete user"
    },

    // Roles
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

    // Permissions
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

    // Documents
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
        description: "Read documents"
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

    // AI
    {
        module: "ai",
        action: "query",
        name: "ai.query",
        description: "Ask AI"
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

    // Audit
    {
        module: "audit",
        action: "read",
        name: "audit.read",
        description: "View audit logs"
    },

    // Settings
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

export default PERMISSIONS;