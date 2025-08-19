import type { Request, Response } from "express";

export const uploadTestService = async (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const { originalname, mimetype, size, buffer } = req.file;

  const base64 = buffer.toString("base64");

  return res.json({
    originalname,
    mimetype,
    size,
    base64
  });
}