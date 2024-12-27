import type { User } from "./User";

enum ProfileType {
  ADMIN,
  USER
}

export interface Profile {
  id: number;
  user_id: number;
  bio: string;
  avatar_url: string;
  profile_type: ProfileType;
}