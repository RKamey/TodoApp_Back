import { Router } from "express";
import { checkHealth } from "../healthcheck/healthcheckController";

const router = Router();

router.get("/", checkHealth);

export default router;