import type { TokenPayload } from "@common/types/global";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.SECRET_KEY as string;

export const generateToken = (payload: object, expiresIn: string = "1h") => {
  return jwt.sign(payload, SECRET_KEY, { expiresIn });
}

export const getAttributeFromToken = (token: string, attribute: keyof TokenPayload) => {
  const decoded = jwt.verify(token, SECRET_KEY);
  return (decoded as TokenPayload)[attribute];
}
