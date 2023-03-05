import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getUser = async (phNumber: string) => {
  const data = await prisma.user.findUnique({
    where: {
      number: phNumber,
    },
    select: {
      Location: {
        select: {
          location: true,
          hospital: {
            select: {
              name: true,
            },
          },
        },
      },
      Prompt: {
        select: {
          prompt: true,
        },
      },
    },
  });

  return { data };
};

export const getUsers = async (location: string) => {
  const data = await prisma.user.findMany({
    where: {
      Location: {
        location: location,
      },
    },
    select: {
      number: true,
    },
  });

  return { data };
};
