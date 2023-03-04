import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const upsertUser = async (number: number) => {
  const user = await prisma.user.upsert({
    where: { number },
    update: {},
    create: { number },
  });
  return user;
};

export const addPrompt = async (phNumber: number, prompt: string) => {
  return await prisma.prompt.create({
    data: {
      prompt,
      user: {
        connect: {
          number: phNumber,
        },
      },
    },
  });
};

export const fetchPrompts = async (phNumber: number) => {
  return await prisma.prompt.findMany({
    where: {
      user: {
        number: phNumber,
      },
    },
  });
};
