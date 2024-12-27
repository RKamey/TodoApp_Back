import type { Profile } from "./Profile";
import type { Task } from "./Task";

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