import type { Request, Response } from "express";
import { sendResponse } from "@common/utils/sendResponse";
import { authService } from "../service/authService";

const login = async (req: Request, res: Response) => {
  try {
    const loginData = await authService.login(req.body);
    return sendResponse(res, 200, "User logged in succesfully!", loginData);
  } catch (error) {
    return sendResponse(res, 500, "An error occurred while logging in the user", null, true);
  }
}

const register = async (req: Request, res: Response) => {
  try {
    const registerData = await authService.register(req.body);
    return sendResponse(res, 200, "User registered succesfully!", registerData);
  }
  catch (error) {
    return sendResponse(res, 500, "An error occurred while registering the user", null, true);
  }
}

export const authController = { login, register };