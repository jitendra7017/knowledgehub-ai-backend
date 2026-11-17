import openai from "../../../clients/openai.client.js";

import env from "../../../config/env.js";

class OpenAIEmbedding {

    async generate(texts) {

        const response =
            await openai.embeddings.create({

                model: env.embedding.model,

                input: texts

            });

        return {

            vectors:
                response.data.map(item => item.embedding),

            usage: response.usage

        };

    }

}

export default new OpenAIEmbedding();