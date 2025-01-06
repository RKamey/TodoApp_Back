import { taskRepository } from "../repositories/taskRepository";
import type { CreateTaskDto } from "../types/Task";

const createTask = async (task: CreateTaskDto) => {
  return await taskRepository.createTask(task);
}

export const taskService = { createTask };