import bcrypt from "bcrypt";

import AuthRepository from "../repositories/auth.repository.js";

import jwtService from "../../../common/services/jwt.service.js";

import UnauthorizedError from "../../../common/errors/UnauthorizedError.js";

class AuthService {
    /**
     * Login user
     */
    async login(email, password) {
        const user = await AuthRepository.findByEmail(email);

        if (!user) {
            throw new UnauthorizedError("Invalid email or password.");
        }

        const isValidPassword = await bcrypt.compare(
            password,
            user.password
        );

        if (!isValidPassword) {
            throw new UnauthorizedError("Invalid email or password.");
        }

        if (!user.isActive) {
            throw new UnauthorizedError("Account is disabled.");
        }

        await AuthRepository.updateLastLogin(user.id);

        const accessToken = jwtService.generateAccessToken({
            id: user.id,
            uuid: user.uuid,
            email: user.email
        });

        return {
            accessToken,
            user
        };
    }
}

export default new AuthService();