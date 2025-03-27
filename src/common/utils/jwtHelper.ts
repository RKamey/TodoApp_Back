import type { TokenPayload } from "@common/types/global";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.SECRET_KEY as string;

const ONE_DAY = 2 * 24 * 60 * 60;

export const generateToken = (payload: TokenPayload, expiresIn: number = ONE_DAY) => {
  return jwt.sign(payload, SECRET_KEY, { expiresIn });
}

export const getAttributeFromToken = (token: string, attribute: keyof TokenPayload) => {
  const decoded = jwt.verify(token, SECRET_KEY);
  return (decoded as TokenPayload)[attribute];
}
