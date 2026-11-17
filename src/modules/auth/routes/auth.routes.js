import { Router } from "express";

import AuthController from "../controllers/auth.controller.js";

import validate from "../../../common/middleware/validate.middleware.js";

import { loginSchema } from "../validators/auth.validator.js";

const router = Router();

router.post(
    "/login",
    validate(loginSchema),
    AuthController.login
);

export default router;