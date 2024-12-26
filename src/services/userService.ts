import { userRepository } from "@repositories/userRepository";

const getAllUsers = async () => {
  return await userRepository.getAllUsers();
}

const getUserById = async (id: number) => {
  return await userRepository.getUserById(id);
}

export const userService = { getAllUsers, getUserById };