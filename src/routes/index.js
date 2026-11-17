import { Router } from "express";

import { authRoutes } from "../modules/auth/index.js";
import { documentRoutes } from "../modules/documents/index.js";
import { queryRoutes } from "../modules/ai/index.js";
import { healthRoutes } from "../modules/health/index.js";

const router = Router();

router.use("/auth", authRoutes);

router.use("/documents", documentRoutes);

router.use("/ai", queryRoutes);

router.use("/health", healthRoutes);

export default router;

