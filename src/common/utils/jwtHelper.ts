import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.SECRET_KEY as string;

export const generateToken = (payload: object, expiresIn: string = "1h") => {
  return jwt.sign(payload, SECRET_KEY, { expiresIn });
}