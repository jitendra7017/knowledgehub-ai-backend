import jwt from "jsonwebtoken";

import env from "../../config/env.js";

class JwtService {

    generateAccessToken(payload) {
        return jwt.sign(
            payload,
            env.jwt.secret,
            {
                expiresIn: env.jwt.expiresIn
            }
        );
    }

    verifyAccessToken(token) {
        return jwt.verify(
            token,
            env.jwt.secret
        );
    }

}

export default new JwtService();