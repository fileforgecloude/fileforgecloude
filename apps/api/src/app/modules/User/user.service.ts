import { prisma } from "@repo/database";

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
};
