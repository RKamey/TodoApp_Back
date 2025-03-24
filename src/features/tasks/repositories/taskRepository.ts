import prisma from "prismaClient";
import type { CreateTaskDto, UpdateTaskDto } from "../types/Task";

const getTasksByUserId = async (userId: number) => {
  try {
    const task = await prisma.task.findMany({
      where: {
        user_id: userId
      }
    });

    return task;
  } catch ( error ) {
    console.log(error);
    throw error;
  }
}

const getTaskById = async (id: number) => {
  try {
    const task = await prisma.task.findUnique({
      where: {
        id
      }
    });
    return task;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

const createTask = async (task: CreateTaskDto) => {
  try {
    const newTask = await prisma.task.create({
      data: task
    })
    return newTask;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

const updateTask = async (task: UpdateTaskDto, id: number) => {
  try {
    const updatedTask = await prisma.task.update({
      where: {
        id
      },
      data: task
    });
    return updatedTask;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

const deleteTask = async (id: number) => {
  try {
    const deleteTask = await prisma.task.delete({
      where: {
        id
      }
    })
    return deleteTask;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export const taskRepository = {
  getTasksByUserId,
  getTaskById,
  createTask,
  updateTask,
  deleteTask
}
