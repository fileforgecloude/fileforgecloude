export type IFile = {
  name: string;
  size: number;
  type: string;
  key: string;
  url: string;
  userId: string;
  folderId?: string;
};

export type GetFilesParams = {
  userId: string;
  search?: string;
  type?: "image" | "pdf" | "code";
  sort?: "name" | "modified";
  folderId?: string;
};
