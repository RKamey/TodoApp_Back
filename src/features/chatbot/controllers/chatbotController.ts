import type { Request, Response } from "express";
import { sendResponse } from "@common/utils/sendResponse";
import { chatbotService } from "features/chatbot/services/chatbotService";

const askChatbot = async (req: Request, res: Response) => {
  const { message } = req.body;

  if (!message) return sendResponse(res, 400, "Please provide a message", null, true);

  try {
    const reply = await chatbotService.askChatbot(message);
    return sendResponse(res, 200, "Chatbot response", reply);
  } catch (error) {
    return sendResponse(res, 500, "An error occurred while processing your request", null, true);
  }
};

export const chatbotController = { askChatbot };