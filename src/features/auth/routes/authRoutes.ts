import { Router } from "express";
import { authController } from "../controllers/authController";
import { validateSchema } from "@common/middleware/validateSchema";
import { loginSchema, registerSchema } from "../schemas/AuthSchemas";

const router = Router();

router.post("/login", validateSchema(loginSchema), authController.login);
router.post("/register", validateSchema(registerSchema), authController.register);

export default router;