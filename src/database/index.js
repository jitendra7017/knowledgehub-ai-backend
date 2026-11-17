import sequelize from "./connection.js";
import logger from "../config/logger.js";

/**
 * Connect to PostgreSQL
 */
export async function connectDatabase() {
  try {
    await sequelize.authenticate();

    logger.info("PostgreSQL connection established.");
  } catch (error) {
    logger.fatal(error, "Unable to connect to PostgreSQL.");

    process.exit(1);
  }
}

/**
 * Close database connection
 */
export async function disconnectDatabase() {
  try {
    await sequelize.close();

    logger.info("Database connection closed.");
  } catch (error) {
    logger.error(error, "Error while closing database connection.");
  }
}

export default sequelize;