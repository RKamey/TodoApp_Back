import type { Exact } from "@prisma/client/runtime/library";

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

export interface CreateProfile {
  bio: string;
  avatar_url: string;
  profile_type: Exact<ProfileType, ProfileType>;
}