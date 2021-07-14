import authRoutes from "./auth";
import restapiRoutes from "./restapi";

import { Router } from "express";

const router = Router();

router.use("/auth", authRoutes);
router.use("/api", restapiRoutes);

export default router;
