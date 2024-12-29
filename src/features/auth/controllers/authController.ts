import type { Request, Response } from "express";
import { sendResponse } from "@common/utils/sendResponse";
import { authService } from "../service/authService";

const login = async (req: Request, res: Response) => {
  try {
    
    const user = req.body;
    
    if (!user) {
      return sendResponse(res, 400, "Invalid user provided", null, true);
    }
    
    const loginData = await authService.login(user);

    return sendResponse(res, 200, "User logged in succesfully!", loginData);
  } catch (error) {
    return sendResponse(res, 500, "An error occurred while logging in the user", null, true);
  }
}


export const authController = { login };