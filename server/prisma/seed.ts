import { PrismaClient, User } from "@prisma/client";
import { faker } from "@faker-js/faker";
const prisma = new PrismaClient();
const seed = async () => {
  await prisma.user.deleteMany();
  const User: Array<Promise<any>> = [];

  for (let i = 0; i < 20; i++) {
    User.push(
      prisma.user.create({
        data: {
          name: faker.name.fullName(),
          email: faker.internet.email(),

        },
      })
    );
  }
  const users = await Promise.all(User);
  console.log(users);
};
seed()
  .catch((err) => {
    console.log(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
