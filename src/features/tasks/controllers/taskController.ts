import type { Request, Response } from "express";
import { taskRepository } from "../repositories/taskRepository";
import { sendResponse } from "@common/utils/sendResponse";
import { getAttributeFromToken } from "@common/utils/jwtHelper";
import jwt from "jsonwebtoken";

const createTask = async (req: Request, res: Response) => {
  try {
    const { title, description, due_date } = req.body;
    const token = req.headers.authorization?.slice(7);

    const user_id = Number(getAttributeFromToken(token as string, "id"));

    if (isNaN(user_id)) {
      return sendResponse(res, 401, "Unauthorized", "User not found");
    }

    const due_Date = new Date(due_date);

    const task = await taskRepository.createTask({ title, description, due_date: due_Date, user_id });

    return sendResponse(res, 200, "Task created successfully", task);
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return sendResponse(res, 401, "Unauthorized", "Invalid token");
    } else {
      return sendResponse(res, 500, "Error creating task", error);
    }
  }
};

export const TaskController = {
  createTask,
};
