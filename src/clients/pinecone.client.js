import { Pinecone } from "@pinecone-database/pinecone";

import env from "../config/env.js";

const pinecone = new Pinecone({
  apiKey: env.pinecone.apiKey
});

export const pineconeIndex = pinecone.index(
  env.pinecone.index
);

export default pinecone;