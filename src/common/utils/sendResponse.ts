import type { Response } from "express";

export const sendResponse = (
  res: Response,
  statusCode: number,
  message: string,
  data: any = null,
  error: boolean = false,
) => {
  res.status(statusCode).json({
    statusCode,
    message,
    data,
    error
  });
}