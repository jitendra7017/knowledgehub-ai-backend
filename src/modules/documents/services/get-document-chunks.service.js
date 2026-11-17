import NotFoundError
from "../../../common/errors/NotFoundError.js";

import DocumentRepository
from "../repositories/document.repository.js";

class GetDocumentChunksService {

    async execute(uuid) {

        const document =
            await DocumentRepository.findByUuid(
                uuid
            );

        if (!document) {

            throw new NotFoundError(
                "Document not found."
            );

        }

        const chunks =
            await DocumentRepository.getChunks(
                document.id
            );

        return {

            document,

            chunks

        };

    }

}

export default new GetDocumentChunksService();