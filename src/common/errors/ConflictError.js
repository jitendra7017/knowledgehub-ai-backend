import BaseError from "./BaseError.js";

export default class ConflictError extends BaseError {
    constructor(message = "Conflict.") {
        super(message, 409);
    }
}