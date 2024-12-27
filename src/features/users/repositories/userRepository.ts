import type { CreateUserDTO, UpdateUserDTO } from "@common/dto/user.dto";
import type { User } from "@common/types/User";
import prisma from "prismaClient";

const getAllUsers = async () => {
  return await prisma.user.findMany();
}

const getUserById = async (userId: number) => {
  return await prisma.user.findUnique({
    where: {
      id: userId
    }
  })
}

const createUser = async (user: CreateUserDTO): Promise<User> => {
  return await prisma.user.create({
    data: user
  });
}

const updateUser = async (userId: number, user: UpdateUserDTO) => {
  return await prisma.user.update({
    where: {
      id: userId
    },
    data: user
  })
}

const deleteUser = async (userId: number) => {
  return await prisma.user.delete({
    where: {
      id: userId
    }
  })
}

export const userRepository = { getAllUsers, getUserById, createUser, updateUser, deleteUser };