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

const deleteUser = async (userId: number) => {
  return await prisma.user.delete({
    where: {
      id: userId
    }
  })
}

export const userRepository = { getAllUsers, getUserById, deleteUser };