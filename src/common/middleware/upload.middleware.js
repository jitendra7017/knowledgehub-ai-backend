import multer from "multer";
import path from "node:path";
import crypto from "node:crypto";

import env from "../../config/env.js";

const storage = multer.diskStorage({

    destination(req, file, cb) {

        cb(null, env.upload.directory);

    },

    filename(req, file, cb) {

        const extension =
            path.extname(file.originalname);

        cb(
            null,
            `${crypto.randomUUID()}${extension}`
        );

    }

});

const upload = multer({

    storage,

    limits: {

        fileSize: env.upload.maxFileSize

    }

});

export default upload;