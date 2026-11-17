import pino from "pino";
import env from "./env.js";

/**
 * Pino Logger Configuration
 */
const logger = pino({
  level: env.logger.level,

  base: {
    service: env.app.name,
    environment: env.app.env
  },

  timestamp: pino.stdTimeFunctions.isoTime,

  transport:
    env.app.env === "development"
      ? {
          target: "pino-pretty",
          options: {
            colorize: true,
            translateTime: "SYS:standard",
            ignore: "pid,hostname"
          }
        }
      : undefined,

  serializers: {
    error: pino.stdSerializers.err
  }
});

export default logger;