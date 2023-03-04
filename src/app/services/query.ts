import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// export const addQuery = async (phNumber: number, prompt: string) => {
//   // return await prisma.query.create({
//   //   data: {
//   //     prompt,
//   //     user: {
//   //       connectOrCreate: {
//   //         where: {
//   //           number: phNumber,
//   //         },
//   //         create: {
//   //           number: phNumber,
//   //         },
//   //       },
//   //     },
//   //   },
//   // });
//   return await prisma.user.findMany({
//     where: {
//       number: phNumber,
//     },
//     select: {
//       query: true,
//     },
//   });
// };

// export const getAllQueriesFromAUser = async (phNumber: number) => {
//   return await prisma.user.findMany({
//     where: {
//       number: phNumber,
//     },
//     select: {
//       query: true,
//     },
//   });
// };
