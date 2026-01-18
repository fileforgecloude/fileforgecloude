import { prisma, type Prisma, type User } from "@repo/database";

const createUserIntoDB = async (data: any) => {
  console.log("data user ", data);
  const result = await prisma.user.create({
    data,
  });
  return result;
};
// get all users from db
const getUsersFormDB = async () => {
  const result = await prisma.user.findMany({
    include: {
      sessions: true,
    },
  });
  return result;
};
export const deleteUserFromDB = async (id: string) => {
  const result = await prisma.user.deleteMany({
    where: { id },
  });

  if (result.count === 0) {
    throw new Error("User not found");
  }

  return result;
};

export const UserServices = {
  getUsersFormDB,
  createUserIntoDB,
  deleteUserFromDB,
};
