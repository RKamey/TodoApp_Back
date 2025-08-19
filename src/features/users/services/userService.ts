import { generateToken } from "@common/utils/jwtHelper";
import type { CreateUserDto, UpdateUserDto, User } from "../types/User";
import { hash } from "bcryptjs";
import { userRepository } from "features/users/repositories/userRepository";
import { emailService } from "integrations/email/services/emailService";

const getAllUsers = async () => {
  return await userRepository.getAllUsers();
}

const getUserById = async (id: number) => {
  return await userRepository.getUserById(id);
}

const getMe = async (id: number) => {
  return await userRepository.getMe(id);
}

const getMeFull = async (id: number) => {
  return await userRepository.getMeFull(id);
}

const createUser = async (user: CreateUserDto) => {
  try {
    const hashedPassword = await hash(user.password, 10);


    const createdUser = await userRepository.createUser({
      ...user,
      password: hashedPassword
    });

    const ONE_HOUR = 60 * 60;

    const verificationToken = generateToken({ user_id: createdUser.id }, ONE_HOUR);

    const temporalName = createdUser.email.split("@")[0];

    await emailService.sendVerificationEmail(createdUser.email, verificationToken, temporalName);

  } catch {
    throw new Error("Error creating user");
  }
}

const updateUser = async (id: number, user: UpdateUserDto) => {
  const userFound = await getUserById(id);

  if (!userFound) {
    return null;
  }

  return await userRepository.updateUser(id, user);
}


const deleteUser = async (id: number) => {
  const userFound = await getUserById(id);

  if (!userFound) {
    return null;
  }

  await userRepository.deleteUser(id);
  return true;
}

export const userService = { getAllUsers, getUserById, getMe, getMeFull, createUser, updateUser, deleteUser };
