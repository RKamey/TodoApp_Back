import { sendResponse } from "@common/utils/sendResponse";
import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.SECRET_KEY as string;

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return sendResponse(res, 401, "Access denied. Token missing or malformed", null);
  }

  const token = authHeader.split(" ")[1];

  try {
    jwt.verify(token, SECRET_KEY);
    next();
  } catch (error) {
    return sendResponse(res, 400, "Invalid token", null);
  }
}

export default verifyToken;