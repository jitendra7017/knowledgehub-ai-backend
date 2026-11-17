import { Router } from "express";

import QueryController from "../controllers/query.controller.js";

import authenticate from "../../../common/middleware/auth.middleware.js";
import authorize from "../../../common/middleware/permission.middleware.js";
import validate from "../../../common/middleware/validate.middleware.js";

import { askQuestionSchema } from "../validators/query.validator.js";

const router = Router();

router.post(
    "/ask",
    authenticate,
    authorize("ai.query"),
    validate(askQuestionSchema),
    QueryController.ask
);

export default router;