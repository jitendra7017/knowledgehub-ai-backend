import AuthService from "../services/auth.service.js";

import { successResponse } from "../../../common/helpers/response.js";

class AuthController {
    async login(req, res, next) {
        try {
            const { email, password } = req.body;

            const result = await AuthService.login(
                email,
                password
            );

            return successResponse(
                res,
                result,
                "Login successful."
            );
        } catch (error) {
            next(error);
        }
    }
}

export default new AuthController();