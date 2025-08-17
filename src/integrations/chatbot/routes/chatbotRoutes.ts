import Router from "express";
import { chatbotController } from "../controllers/chatbotController";

const router = Router();

router.post("/ask", chatbotController.askChatbot);

export default router;
