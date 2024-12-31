import type { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { sendResponse } from "@common/utils/sendResponse";

export const validateSchema =
  (schema: z.ZodSchema) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        return sendResponse(res, 400, "Invalid input", error.issues, true);
      }
      next(error);
    }
  };