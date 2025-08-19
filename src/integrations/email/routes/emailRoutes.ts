import Router from "express";
import { emailController } from "../controllers/emailController";

const router = Router();

router.post("/send-email", emailController.sendEmail);


export default router;