import type { CreateUserDto, UpdateUserDto, User } from "../types/User";
import { hash } from "bcryptjs";
import { userRepository } from "features/users/repositories/userRepository";

const getAllUsers = async () => {
  return await userRepository.getAllUsers();
}

const getUserById = async (id: number) => {
  return await userRepository.getUserById(id);
}

const createUser = async (user: CreateUserDto) => {
  try {
    const hashedPassword = await hash(user.password, 10);

    return await userRepository.createUser({
      ...user,
      password: hashedPassword
    });
    
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

export const userService = { getAllUsers, getUserById, createUser, updateUser, deleteUser };
