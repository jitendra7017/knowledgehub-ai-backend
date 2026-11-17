import sequelize from "../../../database/connection.js";
import redis from "../../../config/redis.js";
import openai from "../../../clients/openai.client.js";
import { pineconeIndex } from "../../../clients/pinecone.client.js";

class HealthService {

    async checkDatabase() {

        try {

            await sequelize.authenticate();

            return {
                status: "UP"
            };

        } catch (error) {

            return {
                status: "DOWN",
                error: error.message
            };

        }

    }

    async checkRedis() {

        try {

            await redis.ping();

            return {
                status: "UP"
            };

        } catch (error) {

            return {
                status: "DOWN",
                error: error.message
            };

        }

    }

    async checkOpenAI() {

        try {

            await openai.models.list();

            return {
                status: "UP"
            };

        } catch (error) {

            return {
                status: "DOWN",
                error: error.message
            };

        }

    }

    async checkPinecone() {

        try {

            await pineconeIndex.describeIndexStats();

            return {
                status: "UP"
            };

        } catch (error) {

            return {
                status: "DOWN",
                error: error.message
            };

        }

    }

    async details() {

        const [
            database,
            redisStatus,
            openaiStatus,
            pineconeStatus
        ] = await Promise.all([
            this.checkDatabase(),
            this.checkRedis(),
            this.checkOpenAI(),
            this.checkPinecone()
        ]);

        const status =
            database.status === "UP" &&
            redisStatus.status === "UP"
                ? "UP"
                : "DOWN";

        return {

            status,

            uptime: process.uptime(),

            timestamp: new Date().toISOString(),

            memory: process.memoryUsage(),

            checks: {

                database,

                redis: redisStatus,

                openai: openaiStatus,

                pinecone: pineconeStatus

            }

        };

    }

}

export default new HealthService();