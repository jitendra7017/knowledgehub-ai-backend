import OpenAIProvider from "./openai.provider.js";

import env from "../../../config/env.js";

class ProviderFactory {

    getProvider() {

        switch (env.llm.provider) {

            case "openai":
                return OpenAIProvider;

            default:
                throw new Error(
                    `Unsupported LLM Provider: ${env.llm.provider}`
                );

        }

    }

}

export default new ProviderFactory();