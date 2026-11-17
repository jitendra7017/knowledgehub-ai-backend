import express from "express";
import helmet from "helmet";
import cors from "cors";
import compression from "compression";
import path from "node:path";

import swaggerUi from "swagger-ui-express";
import redoc from "redoc-express";

import openApiDocument from "../config/swagger.js";

import env from "../config/env.js";

import routes from "../routes/index.js";

import requestIdMiddleware from "../common/middleware/request-id.middleware.js";
import loggerMiddleware from "../common/middleware/logger.middleware.js";
import errorMiddleware from "../common/middleware/error.middleware.js";

const app = express();

/**
 * Hide Express Signature
 */
app.disable("x-powered-by");

/**
 * Security
 */
app.use(
    helmet({
        crossOriginResourcePolicy: false
    })
);

/**
 * CORS
 */
app.use(
    cors({
        origin: "*",
        credentials: true
    })
);

/**
 * Compression
 */
app.use(compression());

/**
 * Body Parser
 */
app.use(
    express.json({
        limit: "10mb"
    })
);

app.use(
    express.urlencoded({
        extended: true,
        limit: "10mb"
    })
);

/**
 * Request ID
 */
app.use(requestIdMiddleware);

/**
 * Request Logger
 */
app.use(loggerMiddleware);

/**
 * Static Uploads
 */
app.use(
    "/uploads",
    express.static(env.upload.directory)
);

/**
 * API Documentation
 */
if (env.swagger.enabled) {

    /**
     * Swagger UI
     */
    app.use(
        "/docs",
        swaggerUi.serve,
        swaggerUi.setup(openApiDocument, {
            explorer: true,
            customSiteTitle: "KnowledgeHub AI API"
        })
    );

    /**
     * Redoc
     */
    app.get(
        "/redoc",
        redoc({
            title: "KnowledgeHub AI API",
            specUrl: "/openapi.json"
        })
    );

    /**
     * OpenAPI JSON
     */
    app.get("/openapi.json", (req, res) => {
        res.json(openApiDocument);
    });

    /**
     * Raw OpenAPI YAML
     */
    app.use(
        "/openapi",
        express.static(
            path.join(
                process.cwd(),
                "docs",
                "openapi",
                "v1"
            )
        )
    );
}

/**
 * API Routes
 */
app.use("/api/v1", routes);

/**
 * Root Endpoint
 */
app.get("/", (req, res) => {

    res.status(200).json({

        success: true,

        message: "KnowledgeHub AI API",

        version: "1.0.0",

        documentation: env.swagger.enabled
            ? {
                  swagger: "/docs",
                  redoc: "/redoc",
                  openapiJson: "/openapi.json",
                  openapiYaml: "/openapi/openapi.yaml"
              }
            : null

    });

});

/**
 * 404 Handler
 */
app.use((req, res) => {

    res.status(404).json({

        success: false,

        message: "Route not found."

    });

});

/**
 * Global Error Handler
 */
app.use(errorMiddleware);

export default app;