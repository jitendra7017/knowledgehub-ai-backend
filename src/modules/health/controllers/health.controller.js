import HealthService from "../services/health.service.js";

class HealthController {

    async health(req, res) {

        return res.status(200).json({

            success: true,

            status: "UP",

            timestamp: new Date().toISOString(),

            service: "KnowledgeHub AI"

        });

    }

    async live(req, res) {

        return res.status(200).json({

            success: true,

            status: "UP"

        });

    }

    async ready(req, res) {

        const result = await HealthService.details();

        return res
            .status(result.status === "UP" ? 200 : 503)
            .json(result);

    }

    async details(req, res) {

        const result = await HealthService.details();

        return res.status(200).json(result);

    }

}

export default new HealthController();