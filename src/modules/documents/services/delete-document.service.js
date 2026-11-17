import NotFoundError from "../../../common/errors/NotFoundError.js";

import DocumentRepository from "../repositories/document.repository.js";

import DOCUMENT_STATUS from "../../../common/constants/document-status.js";

import deleteDocumentQueue from "../../../infrastructure/queue/delete-document.queue.js";

class DeleteDocumentService {

    async execute(uuid) {

        const document =
            await DocumentRepository.findByUuid(uuid);

        if (!document) {
            throw new NotFoundError("Document not found.");
        }

        if (document.status === DOCUMENT_STATUS.DELETING) {

            return {

                queued: true

            };

        }

        await DocumentRepository.updateStatus(

            document.id,

            DOCUMENT_STATUS.DELETING

        );

        await deleteDocumentQueue.add(

            "delete-document",

            {

                documentId: document.id

            },

            {

                attempts: 5,

                removeOnComplete: true,

                removeOnFail: false,

                backoff: {

                    type: "exponential",

                    delay: 3000

                }

            }

        );

        return {

            queued: true

        };

    }

}

export default new DeleteDocumentService();