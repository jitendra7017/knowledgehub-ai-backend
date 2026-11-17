import BaseError from "./BaseError.js";

export default class InternalServerError extends BaseError {
    constructor(message = "Internal server error.") {
        super(message, 500);
    }
}