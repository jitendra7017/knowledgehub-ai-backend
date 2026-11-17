import UploadService from "../services/upload.service.js";

import { successResponse } from "../../../common/helpers/response.js";

class UploadController {

    async upload(req, res, next) {

        try {

            const result =
                await UploadService.upload(

                    req.file,

                    req.user.sub

                );

            return successResponse(

                res,

                result,

                result.duplicate
                    ? "Document already exists."
                    : "Document uploaded successfully.",

                202

            );

        } catch (error) {

            next(error);

        }

    }

}

export default new UploadController();