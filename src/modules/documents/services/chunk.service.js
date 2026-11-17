import crypto from "node:crypto";

import chunker
from "../../../infrastructure/ai/chunkers/recursive.chunker.js";

class ChunkService {

    async chunk(text) {

        const chunks =
            chunker.split(text);

        return chunks.map(
            (content, index) => ({

                chunkIndex: index,

                content,

                chunkHash:
                    crypto
                        .createHash("sha256")
                        .update(content)
                        .digest("hex"),

                tokenCount:
                    Math.ceil(
                        content.length / 4
                    )

            })
        );

    }

}

export default new ChunkService();