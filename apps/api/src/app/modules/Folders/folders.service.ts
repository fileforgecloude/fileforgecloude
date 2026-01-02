import { prisma } from "@repo/database";
import { GetFoldersParams, IFolder } from "./folders.interface";

const slugify = (text: string) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w-]+/g, "") // Remove all non-word chars
    .replace(/--+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
};

const createFolderIntoDB = async (data: IFolder) => {
  const slug = slugify(data.name);
  const result = await prisma.folder.create({
    data: {
      ...data,
      slug,
    },
  });

  await prisma.notification.create({
    data: {
      userId: data.userId,
      title: "Folder Created",
      message: `Folder "${data.name}" has been created successfully.`,
      type: "SUCCESS",
    },
  });

  return result;
};

const updateFolderInDB = async (id: string, userId: string, data: Partial<IFolder>) => {
  const updateData: any = { ...data };
  if (data.name) {
    updateData.slug = slugify(data.name);
  }
  const result = await prisma.folder.update({
    where: { id, userId },
    data: updateData,
  });

  await prisma.notification.create({
    data: {
      userId,
      title: "Folder Updated",
      message: `Folder "${result.name}" has been updated.`,
      type: "INFO",
    },
  });

  return result;
};

const getFoldersFromDB = async ({ userId, parentId }: GetFoldersParams) => {
  return prisma.folder.findMany({
    where: {
      userId,
      parentId: parentId === "root" ? null : parentId || null,
    },
    orderBy: { name: "asc" },
  });
};

const deleteFolderFromDB = async (id: string, userId: string) => {
  const result = await prisma.folder.delete({
    where: {
      id,
      userId,
    },
  });

  await prisma.notification.create({
    data: {
      userId,
      title: "Folder Deleted",
      message: `Folder "${result.name}" and its contents have been deleted.`,
      type: "WARNING",
    },
  });

  return result;
};

const getFolderPathFromDB = async (folderId: string) => {
  const path = [];
  let currentFolder = await prisma.folder.findUnique({
    where: { id: folderId },
    select: { id: true, name: true, slug: true, parentId: true },
  });

  while (currentFolder) {
    path.unshift(currentFolder);
    if (currentFolder.parentId) {
      currentFolder = await prisma.folder.findUnique({
        where: { id: currentFolder.parentId },
        select: { id: true, name: true, slug: true, parentId: true },
      });
    } else {
      currentFolder = null;
    }
  }

  return path;
};

const getRecursiveFiles = async (folderId: string): Promise<any[]> => {
  const filesList: any[] = [];

  const files = await prisma.file.findMany({
    where: { folderId },
  });
  filesList.push(...files);

  const subfolders = await prisma.folder.findMany({
    where: { parentId: folderId },
    select: { id: true },
  });

  for (const subfolder of subfolders) {
    const subfolderFiles = await getRecursiveFiles(subfolder.id);
    filesList.push(...subfolderFiles);
  }

  return filesList;
};

const resolvePathToId = async (userId: string, pathSegments: string[]) => {
  let currentParentId: string | null = null;
  let currentFolder = null;

  for (const slug of pathSegments) {
    currentFolder = await prisma.folder.findFirst({
      where: {
        userId,
        parentId: currentParentId || null,
        slug,
      },
      select: { id: true },
    });

    if (!currentFolder) return null;
    currentParentId = currentFolder.id;
  }

  return currentFolder?.id || null;
};

export const FolderService = {
  createFolderIntoDB,
  updateFolderInDB,
  getFoldersFromDB,
  deleteFolderFromDB,
  getFolderPathFromDB,
  resolvePathToId,
  getRecursiveFiles,
};
