import { userRepository } from "@repositories/userRepository";

const getAllUsers = async () => {
  return await userRepository.getAllUsers();
}

const getUserById = async (id: number) => {
  return await userRepository.getUserById(id);
}

const deleteUser = async (id: number) => {
  const userFound = await getUserById(id);
  
  if (!userFound) {
    return null;
  }

  await userRepository.deleteUser(id);
  return true;
}

export const userService = { getAllUsers, getUserById, deleteUser };