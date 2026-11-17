import { Worker } from "bullmq";

import redis from "../../../clients/redis.client.js";

import env from "../../../config/env.js";

import DocumentProcessorService
from "../services/document-processor.service.js";

const worker = new Worker(

    env.queue.name,

    async (job) => {

        await DocumentProcessorService.process(

            job.data.documentId

        );

    },

    {

        connection: redis

    }

);

export default worker;