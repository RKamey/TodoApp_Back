import type { TaskStatus } from "@prisma/client";
import { taskRepository } from "../repositories/taskRepository";
import type { CreateTaskDto, UpdateTaskDto } from "../types/Task";

const getTaskByUser = async (userId: number) => {
  return await taskRepository.getTasksByUserId(userId);
}

const getTaskById = async (taskId: number) => {
  return await taskRepository.getTaskById(taskId);
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

const updateTaskStatus = async (taskId: number, status: TaskStatus) => {
  return await taskRepository.updateTaskStatus(taskId, status);
}

export const TaskService = { getTaskByUser, getTaskById, createTask, updateTask, deleteTask, updateTaskStatus };