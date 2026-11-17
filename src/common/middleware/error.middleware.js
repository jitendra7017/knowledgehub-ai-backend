import logger from "../../config/logger.js";

export default function errorMiddleware(err, req, res, next) {
    logger.error(
        {
            requestId: req.requestId,
            stack: err.stack
        },
        err.message
    );

    const statusCode = err.statusCode || 500;

    res.status(statusCode).json({
        success: false,
        requestId: req.requestId,
        message: err.message || "Something went wrong.",
        errors: err.details || null
    });
}