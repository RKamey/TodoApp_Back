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

const getMe = async (id: number) => {
  return await prisma.user.findUnique({
    where: { id },
    include: {
      profile: true
    }
  });
};


const getMeFull = async (id: number) => {
  return await prisma.user.findUnique({
    where: { id },
    include: {
      profile: true,
      tasks: true
    }
  });
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

const findUserByEmail = async (email: string): Promise<User | null> => {
  return await prisma.user.findUnique({
    where: { email }
  })
}

const updateVerifyToken = async (id: number, token: string, expires: Date) => {
  return await prisma.user.update({
    where: { id },
    data: {
      emailVerifyToken: token,
      emailVerifyExpires: expires
    }
  });
}

const findByVerificationToken = async (id: number, token: string) => {
  return await prisma.user.findUnique({
    where: { id, emailVerifyToken: token },
  });
}

const verifyEmail = async (id: number, token: string) => {
  const user = await prisma.user.findUnique({
    where: { id }
  });

  if (!user || user.emailVerifyToken !== token || !user.emailVerifyExpires || user.emailVerifyExpires < new Date()) {
    return false;
  }

  await prisma.user.update({
    where: { id },
    data: {
      isEmailVerified: true,
      emailVerifyToken: null,
      emailVerifyExpires: null
    }
  });

  return true;
}

export const userRepository = {
  getAllUsers,
  getUserById,
  getMe,
  getMeFull,
  createUser,
  updateUser,
  deleteUser,
  findUserByEmail,
  updateVerifyToken,
  verifyEmail,
  findByVerificationToken
};