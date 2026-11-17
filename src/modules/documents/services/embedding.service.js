import embeddingProvider
from "../../../infrastructure/ai/embeddings/openai.embedding.js";

import env from "../../../config/env.js";

class EmbeddingService {

    async generate(chunks) {

        const result = [];

        let totalTokens = 0;

        const batchSize =
            env.embedding.batchSize;

        for (

            let i = 0;

            i < chunks.length;

            i += batchSize

        ) {

            const batch =
                chunks.slice(
                    i,
                    i + batchSize
                );

            const texts =
                batch.map(chunk => chunk.content);

            const response =
                await this.generateWithRetry(texts);

            totalTokens +=
                response.usage.total_tokens;

            response.vectors.forEach(

                (embedding, index) => {

                    result.push({

                        ...batch[index],

                        embedding

                    });

                }

            );

        }

        return {

            chunks: result,

            totalTokens

        };

    }

    async generateWithRetry(texts) {

        let retries = 0;

        while (

            retries <
            env.embedding.maxRetries

        ) {

            try {

                return await embeddingProvider.generate(
                    texts
                );

            } catch (error) {

                retries++;

                if (

                    retries ===
                    env.embedding.maxRetries

                ) {

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

export default new EmbeddingService();