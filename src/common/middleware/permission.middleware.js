import PermissionRepository from "../../modules/auth/repositories/permission.repository.js";

import UnauthorizedError from "../errors/UnauthorizedError.js";

export default function authorize(permission) {

    return async (req, res, next) => {

        try {

            const permissions =
                await PermissionRepository.getUserPermissions(
                    req.user.sub
                );

            const names =
                permissions.map(p => p.name);

            if (!names.includes(permission)) {

                throw new UnauthorizedError(
                    "Permission denied."
                );

            }

            next();

        } catch (error) {

            next(error);

        }

    };

}