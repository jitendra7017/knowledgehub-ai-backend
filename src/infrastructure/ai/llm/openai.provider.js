import BaseLLMProvider from "./base.provider.js";

import openai from "../../../clients/openai.client.js";
import env from "../../../config/env.js";

class OpenAIProvider extends BaseLLMProvider {

    async chat(prompt) {

        const response =
            await openai.chat.completions.create({

                model: env.openai.chatModel,

                temperature: 0.2,

                messages: [

                    {
                        role: "system",

                        content: `
You are KnowledgeHub AI.

Answer ONLY from the supplied context.

If the answer cannot be found, reply:

"I couldn't find this information in the uploaded documents."

Never hallucinate.

Always answer in Markdown.
`
                    },

                    {
                        role: "user",
                        content: prompt
                    }

                ]

            });

        return {

            answer:
                response.choices[0].message.content,

            usage:
                response.usage,

            model:
                response.model

        };

    }

}

export default new OpenAIProvider();