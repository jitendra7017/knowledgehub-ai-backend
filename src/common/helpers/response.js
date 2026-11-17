/**
 * Success Response
 */
export function successResponse(
    res,
    data = null,
    message = "Success",
    statusCode = 200
) {
    return res.status(statusCode).json({
        success: true,
        message,
        data
    });
}

/**
 * Error Response
 */
export function errorResponse(
    res,
    message = "Something went wrong.",
    errors = null,
    statusCode = 500
) {
    return res.status(statusCode).json({
        success: false,
        message,
        errors
    });
}