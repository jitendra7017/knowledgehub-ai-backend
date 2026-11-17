import RagPrompt
from "../../../infrastructure/ai/prompts/rag.prompt.js";

class PromptService {

    build(

        question,

        matches

    ) {

        return RagPrompt.build(

            question,

            matches

        );

    }

}

export default new PromptService();