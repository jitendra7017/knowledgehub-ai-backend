class RagPrompt {

    build(question, contexts) {

        const context = contexts
            .map((chunk, index) => {

                return `[Document ${index + 1}]

                ${chunk.metadata.title}

                ${chunk.metadata.content}`;

            })
            .join("\n\n----------------------\n\n");

        return `You are an AI assistant.

                Answer ONLY from the provided context.

                If the answer is not available, say:

                "I couldn't find this information in the uploaded documents."

                Always answer in Markdown.

                Always cite the document number.

                Context:

                ${context}

                Question:

                ${question}

                Answer:`;

    }

}

export default new RagPrompt();