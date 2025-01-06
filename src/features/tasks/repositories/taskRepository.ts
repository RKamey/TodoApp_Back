import prisma from "prismaClient";
import type { CreateTaskDto } from "../types/Task";

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
  createTask
}
