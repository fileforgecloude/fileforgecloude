import { prisma } from "@repo/database";
import { GetFilesParams, IFile } from "./files.interface";

const createFileIntoDB = async (data: IFile) => {
  const { folderId, ...rest } = data;
  const result = await prisma.file.create({
    data: {
      ...rest,
      folderId: !folderId || folderId === "root" ? null : folderId,
    },
  });

  await prisma.notification.create({
    data: {
      userId: result.userId,
      title: "File Uploaded",
      message: `File "${result.name}" has been uploaded successfully.`,
      type: "SUCCESS",
    },
  });

  return result;
};

export const getFilesFromDB = async ({ userId, search, type, sort = "modified", folderId }: GetFilesParams) => {
  return prisma.file.findMany({
    where: {
      userId,
      folderId: folderId === "root" ? null : folderId,

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

  await prisma.notification.create({
    data: {
      userId,
      title: "File Deleted",
      message: `File "${result.name}" has been deleted.`,
      type: "WARNING",
    },
  });

  return result;
};

const updateFileInDB = async (id: string, userId: string, data: Partial<IFile>) => {
  const result = await prisma.file.update({
    where: {
      id,
      userId,
    },
    data,
  });

  await prisma.notification.create({
    data: {
      userId,
      title: "File Updated",
      message: `File "${result.name}" has been updated.`,
      type: "INFO",
    },
  });

  return result;
};

export const FileService = {
  createFileIntoDB,
  getFilesFromDB,
  deleteFileFromDB,
  updateFileInDB,
};
