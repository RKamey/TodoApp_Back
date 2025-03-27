import type { Profile } from "features/profiles/types/Profile";

export interface TokenPayload {
  id: number;
  email: string;
  name: string;
  role?: Profile;
}