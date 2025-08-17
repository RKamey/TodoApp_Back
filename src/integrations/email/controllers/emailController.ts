import type { Request, Response } from 'express';
import { sendResponse } from '@common/utils/sendResponse';
import { emailService } from '../services/emailService';

const sendEmail = async (req: Request, res: Response) => {
  const email = req.body;

  if (!email) return sendResponse(res, 400, "Please provide a valid email", email, true);

  try {
    await emailService.sendEmail(email);
    return sendResponse(res, 200, "Email sent successfully");
  } catch (error) {
    return sendResponse(res, 500, "An error occurred while sending the email", null, true);
  }
}

export const emailController = { sendEmail };