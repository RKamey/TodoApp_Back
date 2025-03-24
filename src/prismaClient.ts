import { PrismaClient } from "@prisma/client";
import prismaRandom from 'prisma-extension-random';

const prisma = new PrismaClient({
  log: [
    "query",
    "info",
    "warn",
    "error"
  ]
}).$extends(prismaRandom());

export default prisma;