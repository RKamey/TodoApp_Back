import { generateToken } from "@common/utils/jwtHelper";
import { compare, hash } from "bcryptjs";
import { userRepository } from "features/users/repositories/userRepository";
import type { LoginDto, RegisterDto } from "../types/Auth";

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

const register = async (user: RegisterDto) => {

  const existingUser = await userRepository.findUserByEmail(user.email);

  if (existingUser) {
    throw new Error('User already exists');
  }

  const hashedPassword = await hash(user.password, 10);

  const newUser = await userRepository.createUser({
    ...user,
    password: hashedPassword,
    name: user.name,
  });

  return newUser;
}

export const authService = { login, register};