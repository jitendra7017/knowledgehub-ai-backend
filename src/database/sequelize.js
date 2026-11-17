import { Sequelize } from "sequelize";

import databaseConfig from "../config/database.js";

import logger from "../config/logger.js";

const sequelize = new Sequelize(
  databaseConfig.database,
  databaseConfig.username,
  databaseConfig.password,
  {
    ...databaseConfig,

    logging: (sql) => {
      logger.debug(sql);
    }
  }
);

export default sequelize;