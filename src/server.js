import http from "node:http";

import app from "./www/app.js";

import env from "./config/env.js";
import logger from "./config/logger.js";

import { connectDatabase } from "./database/index.js";

import redis from "./clients/redis.client.js";

async function bootstrap() {
  try {
    await connectDatabase();

    // await redis.connect();

    const server = http.createServer(app);

    server.listen(env.app.port, () => {
      logger.info(
        `🚀 Server running on port ${env.app.port}`
      );
    });

    process.on("SIGINT", async () => {
      logger.info("Gracefully shutting down...");

      await redis.quit();

      server.close(() => process.exit(0));
    });
  } catch (error) {
    logger.fatal(error, "Application failed to start.");

    process.exit(1);
  }
}

bootstrap();