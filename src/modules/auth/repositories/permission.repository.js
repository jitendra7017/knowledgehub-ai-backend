import BaseRepository from "../../../common/repositories/BaseRepository.js";

import {
    User,
    Role,
    Permission
} from "../../../database/models/index.js";

class PermissionRepository extends BaseRepository {

    constructor() {
        super(Permission);
    }

    async getUserPermissions(userId) {

        const user = await User.findByPk(userId, {

            include: [

                {

                    model: Role,

                    as: "roles",

                    include: [

                        {

                            model: Permission,

                            as: "permissions"

                        }

                    ]

                }

            ]

        });

        if (!user) {
            return [];
        }

        return user.roles.flatMap(role => role.permissions);

    }

}

export default new PermissionRepository();