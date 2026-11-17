import dotenv from "dotenv";
import Joi from "joi";

dotenv.config();

/**
 * Environment Variable Validation Schema
 */
const schema = Joi.object({
  // Application
  APP_NAME: Joi.string().default("KnowledgeHub AI"),
  NODE_ENV: Joi.string()
    .valid("development", "production", "test")
    .default("development"),

  PORT: Joi.number().default(5000),
  APP_URL: Joi.string().uri().required(),

  // Database
  DB_DIALECT: Joi.string()
    .valid("postgres")
    .default("postgres"),

  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().required(),
  DB_NAME: Joi.string().required(),
  DB_USER: Joi.string().required(),
  DB_PASSWORD: Joi.string().allow("").required(),

  // Redis
  REDIS_HOST: Joi.string().required(),
  REDIS_PORT: Joi.number().required(),
  REDIS_PASSWORD: Joi.string().allow("").optional(),

  // JWT
  JWT_SECRET: Joi.string().min(16).required(),
  JWT_EXPIRES_IN: Joi.string().required(),

  // OpenAI
  OPENAI_API_KEY: Joi.string().allow("").optional(),

  // Pinecone
  PINECONE_API_KEY: Joi.string().allow("").optional(),
  PINECONE_INDEX: Joi.string().allow("").optional(),
  PINECONE_NAMESPACE: Joi.string().default("knowledgehub"),

  // Uploads
  UPLOAD_DIR: Joi.string().default("uploads"),
  MAX_FILE_SIZE: Joi.number().default(10485760),

  // Queue
  QUEUE_NAME: Joi.string().default("document-processing"),

  // Logger
  LOG_LEVEL: Joi.string()
    .valid("fatal", "error", "warn", "info", "debug", "trace")
    .default("info"),

  // Swagger
  SWAGGER_ENABLED: Joi.boolean().truthy("true").falsy("false").default(true)
}).unknown();

const { error, value } = schema.validate(process.env, {
  abortEarly: false,
  convert: true
});

if (error) {
  console.error("❌ Environment validation failed:\n");

  error.details.forEach((err) => {
    console.error(`- ${err.message}`);
  });

  process.exit(1);
}

const env = Object.freeze({
  app: {
    name: value.APP_NAME,
    env: value.NODE_ENV,
    port: value.PORT,
    url: value.APP_URL
  },

  database: {
    dialect: value.DB_DIALECT,
    host: value.DB_HOST,
    port: value.DB_PORT,
    name: value.DB_NAME,
    username: value.DB_USER,
    password: value.DB_PASSWORD
  },

  redis: {
    host: value.REDIS_HOST,
    port: value.REDIS_PORT,
    password: value.REDIS_PASSWORD
  },

  jwt: {
    secret: value.JWT_SECRET,
    expiresIn: value.JWT_EXPIRES_IN
  },

  openai: {
    apiKey: value.OPENAI_API_KEY
  },

  embedding: {
    model: process.env.EMBEDDING_MODEL,

    batchSize: Number(
      process.env.EMBEDDING_BATCH_SIZE || 100
    ),

    maxRetries: Number(
      process.env.EMBEDDING_MAX_RETRIES || 3
    )
  },

  llm: {

    provider:
      process.env.LLM_PROVIDER || "openai",

    model:
      process.env.LLM_MODEL || "gpt-4.1"

  },

  pinecone: {
    apiKey: value.PINECONE_API_KEY,
    index: value.PINECONE_INDEX,
    namespace: value.PINECONE_NAMESPACE
  },

  upload: {
    directory: value.UPLOAD_DIR,
    maxFileSize: value.MAX_FILE_SIZE
  },

  queue: {
    name: value.QUEUE_NAME
  },

  logger: {
    level: value.LOG_LEVEL
  },

  swagger: {
    enabled: value.SWAGGER_ENABLED
  }
});

export default env;