import BaseError from "./BaseError.js";

export default class ValidationError extends BaseError {
    constructor(message = "Validation failed.", details = null) {
        super(message, 400, details);
    }
}