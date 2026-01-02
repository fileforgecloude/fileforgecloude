import { prisma } from "@repo/database";
import { GetFilesParams, IFile } from "./files.interface";

const createFileIntoDB = async (data: IFile) => {
  const result = await prisma.file.create({
    data,
  });
  return result;
};

export const getFilesFromDB = async ({ userId, search, type, sort = "modified" }: GetFilesParams) => {
  return prisma.file.findMany({
    where: {
      userId,

      ...(search && {
        name: {
          contains: search,
          mode: "insensitive",
        },
      }),

      ...(type && {
        type:
          type === "image"
            ? { startsWith: "image/" }
            : type === "pdf"
              ? { contains: "pdf" }
              : {
                  in: ["application/json", "application/javascript", "text/javascript", "application/typescript"],
                },
      }),
    },

    orderBy: sort === "name" ? { name: "asc" } : { updatedAt: "desc" },
  });
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
