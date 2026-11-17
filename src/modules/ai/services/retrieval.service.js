import embeddingProvider from "../../../infrastructure/ai/embeddings/openai.embedding.js";

import PineconeService from "../../documents/services/pinecone.service.js";

class RetrievalService {

    async retrieve(question) {

        /**
         * Generate embedding
         */
        const response =
            await embeddingProvider.generate([
                question
            ]);

        /**
         * Search Pinecone
         */
        const search =
            await PineconeService.search(

                response.vectors[0],

                {
                    topK: 5,

                    minScore: 0.75
                }

            );

        return search.matches;

    }

}

export default new RetrievalService();