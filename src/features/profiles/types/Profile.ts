type ProfileType = "ADMIN" | "USER";

export interface Profile {
  id: number;
  user_id: number;
  bio: string;
  avatar_url: string;
  profile_type: ProfileType;
}

export interface CreateProfile {
  name: string;
  bio: string;
  avatar_url: string;
  profile_type: ProfileType;  
}