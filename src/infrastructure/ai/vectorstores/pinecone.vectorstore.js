import { pineconeIndex } from "../../../clients/pinecone.client.js";

class PineconeVectorStore {

    async upsert(vectors) {

        return pineconeIndex.upsert(vectors);

    }

    async query(

        vector,

        topK = 5

    ) {

        return pineconeIndex.query({

            vector,

            topK,

            includeMetadata: true

        });

    }

    async delete(ids) {

        return pineconeIndex.deleteMany(ids);

    }

    async deleteByFilter(filter) {

        return pineconeIndex.deleteMany({

            filter

        });

    }

}

export default new PineconeVectorStore();