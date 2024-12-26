import prisma from "prisma";

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

export const userRepository = { getAllUsers, getUserById };