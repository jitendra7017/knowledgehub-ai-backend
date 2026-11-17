class RecursiveChunker {

    constructor(
        chunkSize = 1000,
        overlap = 200
    ) {

        this.chunkSize = chunkSize;
        this.overlap = overlap;

    }

    split(text) {

        const chunks = [];

        let start = 0;

        while (start < text.length) {

            const end =
                Math.min(
                    start + this.chunkSize,
                    text.length
                );

            chunks.push(
                text.slice(start, end)
            );

            start =
                end - this.overlap;

        }

        return chunks;

    }

}

export default new RecursiveChunker();