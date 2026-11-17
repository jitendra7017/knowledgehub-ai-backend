import { successResponse }
    from "../../../common/helpers/response.js";

import ListDocumentsService
    from "../services/list-documents.service.js";

import GetDocumentService
    from "../services/get-document.service.js";

import GetDocumentChunksService
    from "../services/get-document-chunks.service.js";

import DeleteDocumentService
    from "../services/delete-document.service.js";

class DocumentController {

    async list(req, res, next) {

        try {

            const result =
                await ListDocumentsService.execute(
                    req.query
                );

            return successResponse(

                res,

                result

            );

        }

        catch (error) {

            next(error);

        }

    }

    async get(req, res, next) {

        try {

            const result =
                await GetDocumentService.execute(
                    req.params.uuid
                );

            return successResponse(

                res,

                result

            );

        }

        catch (error) {

            next(error);

        }

    }

    async chunks(req, res, next) {

        try {

            const result =
                await GetDocumentChunksService.execute(
                    req.params.uuid
                );

            return successResponse(

                res,

                result

            );

        }

        catch (error) {

            next(error);

        }

    }

    async delete(req, res, next) {

        try {

            const result =
                await DeleteDocumentService.execute(

                    req.params.uuid

                );

            return successResponse(

                res,

                result,

                "Document deletion has been queued.",

                202

            );

        }

        catch (error) {

            next(error);

        }

    }

}

export default new DocumentController();