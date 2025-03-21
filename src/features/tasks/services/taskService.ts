import { taskRepository } from "../repositories/taskRepository";
import type { CreateTaskDto } from "../types/Task";

const getTaskByUser = async (userId: number) => {
  return await taskRepository.getTasksByUserId(userId);
}

const createTask = async (task: CreateTaskDto) => {
  return await taskRepository.createTask(task);
}

export const TaskService = { getTaskByUser, createTask };