import { compare, hash } from "bcryptjs";
import { generateToken, getAttributeFromToken } from "@common/utils/jwtHelper";
import { userRepository } from "features/users/repositories/userRepository";
import type { LoginDto, RegisterDto } from "../types/Auth";
import { emailService } from "integrations/email/services/emailService";

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

  const ONE_DAY = 24 * 60 * 60;
  const verificationToken = generateToken({ user_id: newUser.id });

  await userRepository.updateVerifyToken(newUser.id, verificationToken, new Date(Date.now() + ONE_DAY * 1000));

  const temporalName = newUser.email.split("@")[0];
  await emailService.sendVerificationEmail(newUser.email, verificationToken, temporalName);

  const authToken = generateToken({
    id: newUser.id,
    email: newUser.email,
    name: newUser.name ?? '',
    role: newUser.profile ?? undefined,
  });

  return { 
    user: {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name ?? '',
      role: newUser.profile ?? undefined,
    },
    token: authToken
  };
}

const verifyEmail = async (token: string): Promise<boolean> => {
  console.log('Verifying email with token:', token);
  if (!token) return false;

  const user_id = getAttributeFromToken(token, 'user_id');
  console.log('User ID from token:', user_id);
  if (!user_id) return false;

  const user = await userRepository.findByVerificationToken(Number(user_id), token);
  console.log('User found:', user);
  if (!user) return false;

  if (user.emailVerifyExpires !== null && user.emailVerifyExpires < new Date()) return false;

  return await userRepository.verifyEmail(user.id, token);
}

export const authService = { login, register, verifyEmail };