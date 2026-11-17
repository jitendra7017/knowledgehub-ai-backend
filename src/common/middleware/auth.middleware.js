import jwtService from "../services/jwt.service.js";
import UnauthorizedError from "../errors/UnauthorizedError.js";

export default function authenticate(req, res, next) {
    try {
        const authorization = req.headers.authorization;

        if (!authorization) {
            throw new UnauthorizedError("Authorization header is missing.");
        }

        if (!authorization.startsWith("Bearer ")) {
            throw new UnauthorizedError("Invalid authorization header.");
        }

        const token = authorization.replace("Bearer ", "");

        const payload = jwtService.verifyAccessToken(token);

        req.user = payload;

        next();
    } catch (error) {
        next(new UnauthorizedError("Invalid or expired access token."));
    }
}