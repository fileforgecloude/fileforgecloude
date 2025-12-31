import { prisma, type Prisma, type User } from "@repo/database";

const createUserIntoDB = async (data: any) => {
  console.log("hello");
  const result = await prisma.user.create({
    data,
  });
  return result;
};

const getUsersFormDB = async () => {
  const result = await prisma.user.findMany({
    include: {
      sessions: true,
    },
  });
  return result;
};

export const UserServices = {
  getUsersFormDB,
  createUserIntoDB,
};
