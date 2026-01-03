import axiosInstance from "@/lib/axios";

export type FileMetadata = {
  id?: string;
  name: string;
  size: number;
  type: string;
  key: string;
  url: string;
  userId: string;
  folderId?: string;
  updatedAt?: string;
};

type UseFilesParams = {
  search?: string;
  type?: string;
  sort?: string;
  userId: string;
  folderId?: string;
};

type UseFoldersParams = {
  search?: string;
  sort?: string;
  userId: string;
  parentId?: string;
};

export const getFiles = async (params: UseFilesParams) => {
  const query = new URLSearchParams(Object.entries(params).filter(([, v]) => v) as [string, string][]).toString();
  const response = await axiosInstance.get(`/files?${query}`);
  return response.data.data;
};

export const getFolders = async (params: UseFoldersParams) => {
  const query = new URLSearchParams(Object.entries(params).filter(([, v]) => v) as [string, string][]).toString();
  const response = await axiosInstance.get(`/folders?${query}`);
  return response.data.data;
};

export const createFile = async (data: FileMetadata) => {
  const response = await axiosInstance.post("/files", data);
  return response.data.data;
};

export const deleteFile = async (id: string, userId: string) => {
  const response = await axiosInstance.delete(`/files/${id}?userId=${userId}`);
  return response.data.data;
};
<<<<<<< HEAD
export const getUser = async () => {
  const response = await axiosInstance.get("/users");
=======

export const updateFile = async (id: string, userId: string, data: Partial<FileMetadata>) => {
  const response = await axiosInstance.patch(`/files/${id}?userId=${userId}`, data);
>>>>>>> origin/dev
  return response.data.data;
};
