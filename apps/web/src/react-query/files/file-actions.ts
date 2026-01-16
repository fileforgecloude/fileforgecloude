import { useQuery } from "@tanstack/react-query";
import * as FileEndpoints from "./file-queries";
import { FileMetadata } from "./file-queries";
import { useAppMutation } from "@/hooks/useAppMutation";

type UseFilesParams = {
  search?: string;
  type?: string;
  sort?: string;
  userId: string;
  folderId?: string;
};

export const useFiles = (params: UseFilesParams) => {
  return useQuery({
    queryKey: ["files", params],
    queryFn: () => FileEndpoints.getFiles(params),
    enabled: !!params.userId,
  });
};

export const useCreateFile = () =>
  useAppMutation<FileMetadata>({
    mutationFn: FileEndpoints.createFile,
    invalidateKeys: [["files"]],
    // successMessage: "File created successfully",
    errorMessage: "Failed to create file metadata",
  });

export const useDeleteFile = () =>
  useAppMutation<{ id: string; userId: string }>({
    mutationFn: ({ id, userId }) => FileEndpoints.deleteFile(id, userId),
    invalidateKeys: [["files"]],
    // successMessage: "File deleted",
    errorMessage: "Failed to delete file",
  });
export const useUser = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: () => FileEndpoints.getUser(),
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    staleTime: 0,
  });
};

export const useDeleteUser = () =>
  useAppMutation<{ id: string }>({
    mutationFn: ({ id }) => FileEndpoints.deleteUser(id),
    invalidateKeys: [["user"]],
    errorMessage: "Failed to delete user",
  });
