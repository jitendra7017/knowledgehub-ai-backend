import BaseError from "./BaseError.js";

export default class UnauthorizedError extends BaseError {
    constructor(message = "Unauthorized.") {
        super(message, 401);
    }
}