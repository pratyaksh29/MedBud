import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const addMother = async (number: string, natalSupport: boolean) => {
  const mother = await prisma.mother.create({
    data: {
      number,
      natalSupport, 
      user: {
        connect: { number: number },
      },
    },
  });
  return mother;
};

export const getMother = async () => {
  const mother = await prisma.mother.findMany();
  return mother;
};
