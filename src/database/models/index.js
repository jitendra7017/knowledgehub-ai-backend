import User from "./User.js";
import Role from "./Role.js";
import Permission from "./Permission.js";
import UserRole from "./UserRole.js";
import RolePermission from "./RolePermission.js";
import Document from "./Document.js";
import DocumentChunk from "./DocumentChunk.js";
import QueryLog from "./QueryLog.js";
import AuditLog from "./AuditLog.js";

/**
 * User ↔ Role
 */
User.belongsToMany(Role, {
    through: UserRole,
    foreignKey: "userId",
    otherKey: "roleId",
    as: "roles"
});

Role.belongsToMany(User, {
    through: UserRole,
    foreignKey: "roleId",
    otherKey: "userId",
    as: "users"
});

/**
 * Role ↔ Permission
 */
Role.belongsToMany(Permission, {
    through: RolePermission,
    foreignKey: "roleId",
    otherKey: "permissionId",
    as: "permissions"
});

Permission.belongsToMany(Role, {
    through: RolePermission,
    foreignKey: "permissionId",
    otherKey: "roleId",
    as: "roles"
});

/**
 * User → Documents
 */
User.hasMany(Document, {
    foreignKey: "uploadedBy",
    as: "documents"
});

Document.belongsTo(User, {
    foreignKey: "uploadedBy",
    as: "owner"
});

/**
 * Document → Chunks
 */
Document.hasMany(DocumentChunk, {
    foreignKey: "documentId",
    as: "chunks"
});

DocumentChunk.belongsTo(Document, {
    foreignKey: "documentId",
    as: "document"
});

export {
    User,
    Role,
    Permission,
    UserRole,
    RolePermission,
    Document,
    DocumentChunk,
    QueryLog,
    AuditLog
};