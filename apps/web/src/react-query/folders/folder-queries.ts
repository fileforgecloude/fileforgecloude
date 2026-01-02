import axiosInstance from "@/lib/axios";

export type FolderMetadata = {
  id?: string;
  name: string;
  userId: string;
  parentId?: string | null;
  updatedAt?: string;
};

type UseFoldersParams = {
  userId: string;
  parentId?: string | null;
};

export const getFolders = async (params: UseFoldersParams) => {
  const query = new URLSearchParams(Object.entries(params).filter(([, v]) => v) as [string, string][]).toString();
  const response = await axiosInstance.get(`/folders?${query}`);
  return response.data.data;
};

export const createFolder = async (data: FolderMetadata) => {
  const response = await axiosInstance.post("/folders", data);
  return response.data.data;
};

export const getFolderPath = async (id: string) => {
  const response = await axiosInstance.get(`/folders/path/${id}`);
  return response.data.data;
};

export const resolvePath = async (userId: string, path: string) => {
  const response = await axiosInstance.get(`/folders/resolve-path?userId=${userId}&path=${path}`);
  return response.data.data;
};

export const updateFolder = async (id: string, userId: string, data: Partial<FolderMetadata>) => {
  const response = await axiosInstance.patch(`/folders/${id}?userId=${userId}`, data);
  return response.data.data;
};

export const getRecursiveFiles = async (id: string) => {
  const response = await axiosInstance.get(`/folders/${id}/recursive-files`);
  return response.data.data;
};

export const deleteFolder = async (id: string, userId: string) => {
  const response = await axiosInstance.delete(`/folders/${id}?userId=${userId}`);
  return response.data.data;
};
