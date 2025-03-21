import { taskRepository } from "../repositories/taskRepository";
import type { CreateTaskDto, UpdateTaskDto } from "../types/Task";

const getTaskByUser = async (userId: number) => {
  return await taskRepository.getTasksByUserId(userId);
}

const createTask = async (task: CreateTaskDto) => {
  return await taskRepository.createTask(task);
}

const updateTask = async (task: UpdateTaskDto, taskId: number) => {
  return await taskRepository.updateTask(task, taskId);
}

const deleteTask = async (taskId: number) => {
  return await taskRepository.deleteTask(taskId);
}

export const TaskService = { getTaskByUser, createTask, updateTask, deleteTask };