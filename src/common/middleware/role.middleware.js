import UnauthorizedError from "../errors/UnauthorizedError.js";

export default function authorizeRoles(...roles) {
    return (req, res, next) => {

        if (!req.user) {
            return next(new UnauthorizedError());
        }

        const hasRole = req.user.roles.some(role =>
            roles.includes(role)
        );

        if (!hasRole) {
            return next(
                new UnauthorizedError("Insufficient role.")
            );
        }

        next();
    };
}