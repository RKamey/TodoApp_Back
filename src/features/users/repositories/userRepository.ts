import type { User, CreateUserDto, UpdateUserDto } from "../types/User";
import prisma from "prismaClient";

const getAllUsers = async () => {
  return await prisma.user.findMany();
}

const getUserById = async (id: number) => {
  return await prisma.user.findUnique({
    where: { id }
  })
}

const createUser = async (data: CreateUserDto): Promise<User> => {
  return await prisma.user.create({
    data
  });
}

const updateUser = async (id: number, data: UpdateUserDto) => {
  return await prisma.user.update({
    where: { id },
    data
  })
}

const deleteUser = async (id: number) => {
  return await prisma.user.delete({
    where: { id }
  })
}

export const userRepository = { getAllUsers, getUserById, createUser, updateUser, deleteUser };