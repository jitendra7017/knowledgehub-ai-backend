import BaseRepository from "../../../common/repositories/BaseRepository.js";

import { User, Role } from "../../../database/models/index.js";

class AuthRepository extends BaseRepository {

    constructor() {
        super(User);
    }

    async findByEmail(email) {

        return this.findOne(
            {
                email
            },
            {
                include: [
                    {
                        model: Role,
                        as: "roles"
                    }
                ]
            }
        );

    }

    async updateLastLogin(id) {

        return this.update(
            {
                id
            },
            {
                lastLoginAt: new Date()
            }
        );

    }

}

export default new AuthRepository();