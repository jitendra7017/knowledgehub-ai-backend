import Redis from "ioredis";

import env from "../config/env.js";
import logger from "../config/logger.js";

const redis = new Redis({
  host: env.redis.host,
  port: env.redis.port,
  password: env.redis.password || undefined,

  maxRetriesPerRequest: null,

  enableReadyCheck: true,

  lazyConnect: true,

  retryStrategy(times) {
    const delay = Math.min(times * 100, 3000);

    logger.warn(
      { retry: times, delay },
      "Reconnecting to Redis..."
    );

    return delay;
  }
});

redis.on("connect", () => {
  logger.info("Redis connected.");
});

redis.on("ready", () => {
  logger.info("Redis ready.");
});

redis.on("error", (error) => {
  logger.error(error, "Redis connection error.");
});

redis.on("close", () => {
  logger.warn("Redis connection closed.");
});

export default redis;