import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  await prisma.task.deleteMany();
  await prisma.profile.deleteMany();
  await prisma.user.deleteMany();

  // Crear usuarios
  const user1 = await prisma.user.create({
    data: {
      name: "Ricardo Kamey",
      email: "alonsokamey@gmail.com",
      password: bcrypt.hashSync('password', 10), 
    },
  });

  const user2 = await prisma.user.create({
    data: {
      name: "John Doe",
      email: "jhondoe@gmail.com",
      password: bcrypt.hashSync('password', 10),
    },
  });

  const user3 = await prisma.user.create({
    data: {
      name: "Jane Doe",
      email: "janedoe@gmail.com",
      password: bcrypt.hashSync('password', 10),
    },
  });

  // Crear perfiles para los usuarios
  await prisma.profile.create({
    data: {
      user_id: user1.id,
      bio: "This is Ricardo's bio",
      avatar_url: "https://example.com/avatar.png",
      profile_type: "ADMIN",
    },
  });

  await prisma.profile.create({
    data: {
      user_id: user2.id,
      bio: "This is John's bio",
      avatar_url: "https://example.com/avatar2.png",
      profile_type: "USER",
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    console.log("Seeding completed");
    await prisma.$disconnect();
  });
