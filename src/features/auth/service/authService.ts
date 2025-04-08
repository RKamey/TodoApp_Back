import { compare, hash } from "bcryptjs";
import { generateToken } from "@common/utils/jwtHelper";
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
    id: existingUser.id,
    email: existingUser.email,
    name: existingUser.name ?? '',
    role: existingUser.profile ?? undefined,
   });

  return { token };
}

const register = async (user: RegisterDto) => {
  const { email, password } = user;

  const existingUser = await userRepository.findUserByEmail(email);

  if (existingUser) {
    throw new Error('User already exists');
  }

  const hashedPassword = await hash(password, 10);

  const newUser = await userRepository.createUser({
    ...user,
    password: hashedPassword,
    name: user.name,
  });

  const token = generateToken({
    id: newUser.id,
    email: newUser.email,
    name: newUser.name ?? '',
    role: newUser.profile ?? undefined,
  });

  return { token };
}

export const authService = { login, register};