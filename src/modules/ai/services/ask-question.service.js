import RetrievalService from "./retrieval.service.js";
import PromptService from "./prompt.service.js";
import ResponseService from "./response.service.js";
import CitationService from "./citation.service.js";

import QueryRepository
from "../repositories/query.repository.js";

class AskQuestionService {

    async ask(question, userId) {

        /**
         * Retrieve Context
         */
        const matches =
            await RetrievalService.retrieve(
                question
            );

        if (!matches.length) {

            return {

                answer:
                    "I couldn't find any relevant information in the uploaded documents.",

                citations: []

            };

        }

        /**
         * Prompt
         */
        const prompt =
            PromptService.build(
                question,
                matches
            );

        /**
         * Generate Response
         */
        const response =
            await ResponseService.generate(
                prompt
            );

        /**
         * Save Query
         */
        await QueryRepository.create({

            userId,

            question,

            answer: response.answer,

            model: response.model,

            promptTokens:
                response.usage.prompt_tokens,

            completionTokens:
                response.usage.completion_tokens,

            totalTokens:
                response.usage.total_tokens,

            metadata: {

                matches:
                    matches.length

            }

        });

        /**
         * Return
         */
        return {

            answer:
                response.answer,

            citations:
                CitationService.build(matches)

        };

    }

}

export default new AskQuestionService();