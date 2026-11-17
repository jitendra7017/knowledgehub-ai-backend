import crypto from "node:crypto";

import vectorStore from "../../../infrastructure/ai/vectorstores/pinecone.vectorstore.js";

import env from "../../../config/env.js";

class PineconeService {

    constructor() {

        this.batchSize = 100;

    }

    /**
     * Store vectors
     */
    async store(document, chunks) {

        const storedChunks = [];

        for (

            let i = 0;

            i < chunks.length;

            i += this.batchSize

        ) {

            const batch = chunks.slice(

                i,

                i + this.batchSize

            );

            const vectors = batch.map(chunk => {

                const id = crypto.randomUUID();

                chunk.pineconeId = id;

                return {

                    id,

                    values: chunk.embedding,

                    metadata: {

                        documentId: document.id,

                        documentUuid: document.uuid,

                        title: document.title,

                        checksum: document.checksum,

                        uploadedBy: document.uploadedBy,

                        chunkIndex: chunk.chunkIndex,

                        content: chunk.content

                    }

                };

            });

            await this.retry(

                () => vectorStore.upsert(vectors)

            );

            storedChunks.push(...batch);

        }

        return storedChunks;

    }

    /**
 * Semantic Search
 */
    async search(

        embedding,

        {

            topK = 5,

            minScore = 0

        } = {}

    ) {

        const response =
            await vectorStore.query(

                embedding,

                topK

            );

        response.matches =
            response.matches.filter(

                match => match.score >= minScore

            );

        return response;

    }

    /**
     * Delete vectors
     */
    async delete(ids) {

        return vectorStore.delete(ids);

    }

    /**
     * Delete all vectors of document
     */
    async deleteDocument(documentId) {

        return vectorStore.deleteByFilter({

            documentId

        });

    }

    /**
     * Retry helper
     */
    async retry(fn) {

        let retries = 0;

        while (retries < 3) {

            try {

                return await fn();

            }

            catch (error) {

                retries++;

                if (retries >= 3) {

                    throw error;

                }

                await new Promise(resolve =>

                    setTimeout(

                        resolve,

                        retries * 1000

                    )

                );

            }

        }

    }

}

export default new PineconeService();