import type { User } from "@common/types/User";
import { hash } from "bcryptjs";
import { userRepository } from "features/users/repositories/userRepository";

const getAllUsers = async () => {
  return await userRepository.getAllUsers();
}

const getUserById = async (id: number) => {
  return await userRepository.getUserById(id);
}

const createUser = async (user: User) => {
  try {
    const hashedPassword = await hash(user.password, 10);

    return await userRepository.createUser({
      ...user,
      name: user.name ?? undefined,
      password: hashedPassword
    });
    
  } catch {
    throw new Error("Error creating user");
  }
}

const updateUser = async (id: number, user: User) => {
  const userFound = await getUserById(id);

  if (!userFound) {
    return null;
  }

  return await userRepository.updateUser(id, {
    ...user,
    name: user.name ?? undefined
  });
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