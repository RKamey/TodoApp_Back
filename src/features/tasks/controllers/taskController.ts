import type { Request, Response } from "express";
import { taskRepository } from "../repositories/taskRepository";
import { sendResponse } from "@common/utils/sendResponse";
import { getAttributeFromToken } from "@common/utils/jwtHelper";
import jwt from "jsonwebtoken";
import { TaskService } from "../services/taskService";

export const getAllTasks = async (req: Request, res: Response) => {
  try {
    const userId = req.body.userId;
    const tasks = await TaskService.getTaskByUser(userId);

    return sendResponse(res, 200, "Tasks fetched successfully", tasks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tasks", error });
  }
};

const createTask = async (req: Request, res: Response) => {
  try {
    const { title, description, due_date } = req.body;
    const token = req.headers.authorization?.slice(7);

    const user_id = Number(getAttributeFromToken(token as string, "id"));

    if (isNaN(user_id)) {
      return sendResponse(res, 401, "Unauthorized", "User not found");
    }

    const due_Date = new Date(due_date);

    const task = await TaskService.createTask({
      title,
      description,
      due_date: due_Date,
      user_id,
    });

    return sendResponse(res, 200, "Task created successfully", task);
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return sendResponse(res, 401, "Unauthorized", "Invalid token");
    } else {
      return sendResponse(res, 500, "Error creating task", error);
    }
  }
};

const updateTask = async (req: Request, res: Response) => {
  try {
    const { title, description, due_date } = req.body;
    const token = req.headers.authorization?.slice(7);
    const task_id = Number(req.params.id);

    const user_id = Number(getAttributeFromToken(token as string, "id"));

    if (isNaN(user_id)) {
      return sendResponse(res, 401, "Unauthorized", "User not found");
    }

    const due_Date = new Date(due_date);

    const task = await TaskService.updateTask(
      { title, description, due_date: due_Date, user_id },
      task_id
    );

    return sendResponse(res, 200, "Task updated successfully", task);
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return sendResponse(res, 401, "Unauthorized", "Invalid token");
    } else {
      return sendResponse(res, 500, "Error updating task", error);
    }
  }
};

const deleteTask = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.slice(7);
    const task_id = Number(req.params.id);

    const user_id = Number(getAttributeFromToken(token as string, "id"));

    if (isNaN(user_id)) {
      return sendResponse(res, 401, "Unauthorized", "User not found");
    }

    const task = await TaskService.deleteTask(task_id);

    return sendResponse(res, 200, "Task deleted successfully", task);
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return sendResponse(res, 401, "Unauthorized", "Invalid token");
    } else {
      return sendResponse(res, 500, "Error deleting task", error);
    }
  }
}

export const TaskController = {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
};
