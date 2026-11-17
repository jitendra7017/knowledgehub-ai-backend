import { Router } from "express";

import HealthController
from "../controllers/health.controller.js";

const router = Router();

router.get(
    "/",
    HealthController.health
);

router.get(
    "/live",
    HealthController.live
);

router.get(
    "/ready",
    HealthController.ready
);

router.get(
    "/details",
    HealthController.details
);

export default router;