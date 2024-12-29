import type { Profile } from "features/profiles/types/Profile";
import type { Task } from "features/tasks/types/Task";

export interface User {
  id: number;
  name?: string | null;
  email: string;
  password: string;
  created_at: Date;
  updated_at: Date;
  profile?: Profile | null;
  tasks?: Task[];
}

// Create user DTO
export interface CreateUserDto {
  name?: string;
  email: string;
  password: string;
}

// Update user DTO
export interface UpdateUserDto {
  name?: string;
  email?: string;
  password?: string;
}