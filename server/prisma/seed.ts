import { PrismaClient, User } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();
const seed = async () => {
  await prisma.user.deleteMany();
  const user: User[] = [];

  for (let i = 0; i < 3; i++) {
    user.push(
        await prisma.user.create({
            data: {
                id: faker.datatype.number(),
                uniqueId: faker.datatype.uuid(),
                createdAt: faker.date.past(),
                email: faker.internet.email(),
                name: faker.name.fullName(),
                password: faker.internet.password(),
                passwordConfirmation: faker.internet.password(),
                token: faker.datatype.uuid(),
                isVerified: faker.helpers.arrayElement([true, false]),
                expirer_date: faker.date.birthdate(),
                reset_code: faker.datatype.hexadecimal(),
                otp_expired: faker.helpers.arrayElement([true, false]),
            },
        })
    );
  }
  const users = await Promise.all(user);
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