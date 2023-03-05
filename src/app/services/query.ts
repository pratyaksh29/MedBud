import { PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();

export const upsertUser = async (number: string, location: string) => {
  const user = await prisma.user.upsert({
    where: { number },
    update: {},
    create: {
      number,
      Location: {
        connectOrCreate: {
          where: {
            location: location,
          },
          create: {
            location: location,
          },
        },
      },
    },
  });
  return user;
};

export const addPrompt = async (phNumber: string, prompt: string) => {
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

export const fetchPrompts = async (phNumber: string) => {
  return await prisma.prompt.findMany({
    where: {
      user: {
        number: phNumber,
      },
    },
  });
};

export const fetchLocation = async (phNumber: string) => {
  const number = String(phNumber);
  const location = await prisma.user.findMany({
    where: {
      number: number,
    },
    select: {
      Location: {
        select: {
          location: true,
        },
      },
    },
  });

  return location;
};

export const nearbyHospital = async (location: string) => {
  return await prisma.location.findMany({
    where: {
      location: location,
    },
    select: {
      hospital: {
        select: {
          name: true,
        },
      },
    },
  });
};

export const emergency = async (phNumber: string) => {
  const user = await prisma.user.findUnique({
    where: {
      number: phNumber,
    },
  });

  const queries = await prisma.prompt.findMany({
    where: {
      user: {
        number: phNumber,
      },
    },
  });
  const location = await prisma.location.findFirst({
    where: {
      user: {
        number: phNumber,
      },
    },
    select: {
      location: true,
      hospital: {
        select: {
          name: true,
        },
      },
    },
  });
  return { user, location, queries };
};
