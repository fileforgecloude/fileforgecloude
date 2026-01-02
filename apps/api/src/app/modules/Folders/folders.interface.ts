export type IFolder = {
  name: string;
  userId: string;
  parentId?: string | null;
};

export type GetFoldersParams = {
  userId: string;
  parentId?: string | null;
};
