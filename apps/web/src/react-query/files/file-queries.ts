import axiosInstance from "@/lib/axios";

export type FileMetadata = {
  id?: string;
  name: string;
  size: number;
  type: string;
  key: string;
  url: string;
  userId: string;
  updatedAt?: string;
};

export const getFiles = async (userId: string) => {
  const response = await axiosInstance.get(`/files?userId=${userId}`);
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
export const getUser = async () => {
  const response = await axiosInstance.get("/users");
  return response.data.data;
};
