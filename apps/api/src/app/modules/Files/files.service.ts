import { prisma } from "@repo/database";
import { IFile } from "./files.interface";

const createFileIntoDB = async (data: IFile) => {
  const result = await prisma.file.create({
    data,
  });
  return result;
};

const getFilesFromDB = async (userId: string) => {
  const result = await prisma.file.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return result;
};

const deleteFileFromDB = async (id: string, userId: string) => {
  const result = await prisma.file.delete({
    where: {
      id,
      userId,
    },
  });
  return result;
};

export const FileService = {
  createFileIntoDB,
  getFilesFromDB,
  deleteFileFromDB,
};
