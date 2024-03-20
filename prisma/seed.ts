import { PrismaClient, User } from '@prisma/client';
import { faker } from '@faker-js/faker';
import * as dontenv from 'dotenv';

const prisma = new PrismaClient();

export function createRandomUser(): User {
  return {
    id: faker.number.int(30),
    email: faker.internet.email(),
    password: faker.internet.password(),
    refreshToken: null,
    role: 'USER',
  };
}

export const USERS: User[] = faker.helpers.multiple(createRandomUser, {
  count: 30,
});

async function main() {
  console.log('Seeding...');
  /// --------- Users ---------------
  await prisma.user.createMany({ data: USERS, skipDuplicates: true });
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
