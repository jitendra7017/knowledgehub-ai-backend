import ParserService from "./parser.service.js";
import ChunkService from "./chunk.service.js";
import EmbeddingService from "./embedding.service.js";
import PineconeService from "./pinecone.service.js";

import DocumentRepository from "../repositories/document.repository.js";
import ChunkRepository from "../repositories/chunk.repository.js";

import DOCUMENT_STATUS from "../../../common/constants/document-status.js";
import env from "../../../config/env.js";

class DocumentProcessorService {

    async process(documentId) {

        const document = await DocumentRepository.findById(documentId);

        if (!document) {
            throw new Error(`Document ${documentId} not found.`);
        }

        try {

            await DocumentRepository.updateStatus(
                document.id,
                DOCUMENT_STATUS.PARSING,
                {
                    processingStartedAt: new Date(),
                    failureReason: null
                }
            );

            /**
             * Step 1
             * Parse PDF
             */
            const text = await ParserService.parse(document);

            /**
             * Step 2
             * Chunking
             */
            await DocumentRepository.updateStatus(
                document.id,
                DOCUMENT_STATUS.CHUNKING
            );

            const chunks = await ChunkService.chunk(text);

            /**
             * Step 3
             * Generate Embeddings
             */
            await DocumentRepository.updateStatus(
                document.id,
                DOCUMENT_STATUS.EMBEDDING
            );

            const {
                chunks: embeddedChunks,
                totalTokens
            } = await EmbeddingService.generate(chunks);

            /**
             * Step 4
             * Store in Pinecone
             */
            await DocumentRepository.updateStatus(
                document.id,
                DOCUMENT_STATUS.INDEXING
            );

            const indexedChunks =
                await PineconeService.store(
                    document,
                    embeddedChunks
                );

            /**
             * Step 5
             * Save Chunks
             */
            await ChunkRepository.bulkCreate(

                indexedChunks.map(chunk => ({

                    documentId: document.id,

                    chunkIndex: chunk.chunkIndex,

                    pageNumber: chunk.pageNumber ?? null,

                    content: chunk.content,

                    tokenCount: chunk.tokenCount,

                    chunkHash: chunk.chunkHash,

                    embeddingModel: env.embedding.model,

                    pineconeId: chunk.pineconeId,

                    metadata: chunk.metadata || {}

                }))

            );

            /**
             * Step 6
             * Update Document
             */
            await DocumentRepository.updateStatus(

                document.id,

                DOCUMENT_STATUS.READY,

                {

                    processingCompletedAt: new Date(),

                    processingMetadata: {

                        totalChunks: indexedChunks.length,

                        totalTokens,

                        embeddingModel:
                            env.embedding.model

                    }

                }

            );

            return {

                success: true,

                chunks: indexedChunks.length,

                tokens: totalTokens

            };

        } catch (error) {

            console.error(error);

            await DocumentRepository.updateStatus(

                document.id,

                DOCUMENT_STATUS.FAILED,

                {

                    retryCount:
                        (document.retryCount || 0) + 1,

                    failureReason: error.message,

                    processingCompletedAt: new Date()

                }

            );

            throw error;

        }

    }

}

export default new DocumentProcessorService();