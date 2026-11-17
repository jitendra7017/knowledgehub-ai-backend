import { Worker } from "bullmq";

import redis from "../../../config/redis.js";

import DeleteProcessorService
from "../services/delete-processor.service.js";

const worker = new Worker(

    "delete-document",

    async job => {

        await DeleteProcessorService.process(

            job.data.documentId

        );

    },

    {

        connection: redis

    }

);

export default worker;