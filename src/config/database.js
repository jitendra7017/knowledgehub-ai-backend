import env from "./env.js";

const databaseConfig = Object.freeze({
  dialect: env.database.dialect,

  host: env.database.host,

  port: env.database.port,

  database: env.database.name,

  username: env.database.username,

  password: env.database.password,

  timezone: "+00:00",

  logging: false,

  define: {
    timestamps: true,

    underscored: true,

    freezeTableName: false
  },

  pool: {
    max: 20,

    min: 2,

    acquire: 30000,

    idle: 10000
  }
});

export default databaseConfig;