import type { Request, Response } from "express";
import prisma from "../../prismaClient";

export const checkHealth = async (req: Request, res: Response) => {
  try {
    await prisma.$connect();

    res.status(200).json({
      status: "healthy",
      message: "Connection to the database is successful",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      status: "unhealthy",
      message: "Connection to the database failed",
      error: error instanceof Error ? error.message : error,
    });
  } finally {
    await prisma.$disconnect();
  }
}