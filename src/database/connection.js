import { Sequelize } from "sequelize";

import databaseConfig from "../config/database.js";
import logger from "../config/logger.js";

const sequelize = new Sequelize({
  database: databaseConfig.database,
  username: databaseConfig.username,
  password: databaseConfig.password,
  host: databaseConfig.host,
  port: databaseConfig.port,
  dialect: databaseConfig.dialect,
  timezone: databaseConfig.timezone,
  define: databaseConfig.define,
  pool: databaseConfig.pool,

  logging:
    databaseConfig.logging
      ? (sql) => logger.debug({ sql }, "SQL Query")
      : false
});

export default sequelize;