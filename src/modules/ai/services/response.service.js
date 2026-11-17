import ProviderFactory from "../../../infrastructure/ai/llm/provider.factory.js";

class ResponseService {

    /**
     * Generate AI response
     * @param {string} prompt
     * @returns {Promise<Object>}
     */
    async generate(prompt) {

        const provider = ProviderFactory.getProvider();

        return provider.chat(prompt);

    }

}

export default new ResponseService();