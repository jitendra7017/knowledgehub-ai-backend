import { Router } from "express";

import authenticate
    from "../../../common/middleware/auth.middleware.js";

import authorize
    from "../../../common/middleware/permission.middleware.js";

import upload
    from "../../../common/middleware/upload.middleware.js";

import UploadController
    from "../controllers/upload.controller.js";

import DocumentController
    from "../controllers/document.controller.js";

const router = Router();

router.post(

    "/upload",

    authenticate,

    authorize("documents.upload"),

    upload.single("file"),

    UploadController.upload

);

router.get(

    "/",

    authenticate,

    authorize("documents.read"),

    DocumentController.list

);

router.get(

    "/:uuid",

    authenticate,

    authorize("documents.read"),

    DocumentController.get

);

router.get(

    "/:uuid/chunks",

    authenticate,

    authorize("documents.read"),

    DocumentController.chunks

);

router.delete(

    "/:uuid",

    authenticate,

    authorize("documents.delete"),

    DocumentController.delete

);

export default router;