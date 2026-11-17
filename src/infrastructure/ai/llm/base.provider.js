class BaseLLMProvider {

    /**
     * Generate completion
     * @param {string} prompt
     */
    async chat(prompt) {
        throw new Error("chat() not implemented.");
    }

    /**
     * Stream completion
     * Future Support
     */
    async stream(prompt) {
        throw new Error("stream() not implemented.");
    }

}

export default BaseLLMProvider;