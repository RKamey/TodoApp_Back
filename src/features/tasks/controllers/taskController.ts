import type { Request, Response } from "express";
import { sendResponse } from "@common/utils/sendResponse";
import { getAttributeFromToken } from "@common/utils/jwtHelper";
import jwt from "jsonwebtoken";
import { TaskService } from "../services/taskService";

export const getAllTasks = async (req: Request, res: Response) => {
  try {
    const user_id = req.user?.id;

    if (!user_id) {
      return sendResponse(res, 401, "Unauthorized", "User not found");
    }

    const tasks = await TaskService.getTaskByUser(user_id);
    return sendResponse(res, 200, "Tasks fetched successfully", tasks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tasks", error });
  }
};

export const getTaskById = async (req: Request, res: Response) => {
  try {
    const user_id = req.user?.id;

    if (!user_id) {
      return sendResponse(res, 401, "Unauthorized", "User not found");
    }

    const taskId = Number(req.params.id);
    const task = await TaskService.getTaskById(taskId);

    if (task?.user_id !== user_id) {
      return sendResponse(res, 403, "Forbidden", "Access denied");
    }

    return sendResponse(res, 200, "Task fetched successfully", task);
  } catch (error) {
    res.status(500).json({ message: "Error fetching task", error });
  }
};

const createTask = async (req: Request, res: Response) => {
  try {
    const user_id = req.user?.id;

    if (!user_id) {
      return sendResponse(res, 401, "Unauthorized", "User not found");
    }

    const { title, description, due_date } = req.body;

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

    const user_id = req.user?.id;

    if (!user_id) {
      return sendResponse(res, 401, "Unauthorized", "User not found");
    }

    const task_id = Number(req.params.id);
    const task = await TaskService.getTaskById(task_id);

    // Validar la propiedad de la tarea
    if (!task || task.user_id !== user_id) {
      return sendResponse(res, 403, "Forbidden", "Access denied");
    }

    const { title, description, due_date } = req.body;
    const updateData: Partial<{
      title: string;
      description: string;
      due_date: Date;
    }> = {};

    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (due_date !== undefined) updateData.due_date = new Date(due_date);

    const updatedTask = await TaskService.updateTask(updateData, task_id);
    return sendResponse(res, 200, "Task updated successfully", updatedTask);
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

    const user_id = req.user?.id;
    if (!user_id) {
      return sendResponse(res, 401, "Unauthorized", "User not found");
    }

    const task_id = Number(req.params.id);
    const task = await TaskService.getTaskById(task_id);

    if (!task || task.user_id !== user_id) {
      return sendResponse(res, 403, "Forbidden", "Access denied");
    }

    const deletedTask = await TaskService.deleteTask(task_id);
    return sendResponse(res, 200, "Task deleted successfully", deletedTask);
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return sendResponse(res, 401, "Unauthorized", "Invalid token");
    } else {
      return sendResponse(res, 500, "Error deleting task", error);
    }
  }
};

const updateTaskStatus = async (req: Request, res: Response) => {
  try {
    const user_id = req.user?.id;

    if (!user_id) {
      return sendResponse(res, 401, "Unauthorized", "User not found");
    }

    const task_id = Number(req.params.id);

    const task = await TaskService.getTaskById(task_id);

    if (!task || task.user_id !== user_id) {
      return sendResponse(res, 403, "Forbidden", "Access denied");
    }

    const completedTask = await TaskService.updateTaskStatus(task_id, task.status);
    return sendResponse(res, 200, "Task completed successfully", completedTask);
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return sendResponse(res, 401, "Unauthorized", "Invalid token");
    } else {
      return sendResponse(res, 500, "Error completing task", error);
    }
  }
}

export const TaskController = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  updateTaskStatus,
};
