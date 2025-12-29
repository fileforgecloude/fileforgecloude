import { useQuery } from "@tanstack/react-query";
import * as FileEndpoints from "./file-queries";
import { FileMetadata } from "./file-queries";
import { useAppMutation } from "@/hooks/useAppMutation";

export const useFiles = (userId?: string) => {
  return useQuery({
    queryKey: ["files", userId],
    queryFn: () => FileEndpoints.getFiles(userId!),
    enabled: !!userId,
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
