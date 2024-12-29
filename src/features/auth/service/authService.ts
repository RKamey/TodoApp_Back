import { generateToken } from "@common/utils/jwtHelper";
import { compare } from "bcryptjs";
import { userRepository } from "features/users/repositories/userRepository";
import type { LoginDto } from "../types/Auth";

const login = async (user: LoginDto) => {
  const { email, password } = user;

  const existingUser = await userRepository.findUserByEmail(email);
  
  if (!existingUser) {
    throw new Error('User not found');
  }

  const isPasswordValid = await compare(password, existingUser.password);
  if (!isPasswordValid) {
    throw new Error('Invalid password');
  }

  const token = generateToken({
    email: existingUser.email,
    name: existingUser.name,
    role: existingUser.profile,
   });

  return { token };
}

export const authService = { login };