import NotFoundError
from "../../../common/errors/NotFoundError.js";

import DocumentRepository
from "../repositories/document.repository.js";

class GetDocumentService {

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

        return document;

    }

}

export default new GetDocumentService();