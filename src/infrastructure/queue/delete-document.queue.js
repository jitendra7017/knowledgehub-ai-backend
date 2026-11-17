import { Queue } from "bullmq";

import redis from "../../config/redis.js";

const deleteDocumentQueue = new Queue(
    "delete-document",
    {
        connection: redis
    }
);

export default deleteDocumentQueue;