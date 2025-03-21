import prisma from "prismaClient";
import type { CreateTaskDto } from "../types/Task";

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

const createTask = async (task: CreateTaskDto) => {
  try {
    const newTask = await prisma.task.create({
      data: task
    })
    console.log(newTask);
    return newTask;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export const taskRepository = {
  getTasksByUserId,
  createTask
}
