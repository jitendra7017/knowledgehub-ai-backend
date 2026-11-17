import { Queue } from "bullmq";

import redis from "../../clients/redis.client.js";

import env from "../../config/env.js";

const documentQueue = new Queue(

    env.queue.name,

    {

        connection: redis

    }

);

export default documentQueue;