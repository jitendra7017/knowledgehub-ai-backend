import fs from "node:fs/promises";

import DocumentRepository
from "../repositories/document.repository.js";

import ChunkRepository
from "../repositories/chunk.repository.js";

import PineconeService
from "./pinecone.service.js";

class DeleteProcessorService {

    async process(documentId) {

        const document =
            await DocumentRepository.findById(documentId);

        if (!document) {

            return;

        }

        /**
         * Delete vectors
         */

        await PineconeService.deleteDocument(
            document.id
        );

        /**
         * Delete chunks
         */

        await ChunkRepository.deleteByDocument(
            document.id
        );

        /**
         * Delete file
         */

        try {

            await fs.unlink(
                document.storagePath
            );

        }

        catch (error) {

            console.warn(error.message);

        }

        /**
         * Delete document
         */

        await DocumentRepository.delete({

            id: document.id

        });

    }

}

export default new DeleteProcessorService();