import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import * as FolderEndpoints from "./folder-queries";
import { FolderMetadata } from "./folder-queries";
import { useAppMutation } from "@/hooks/useAppMutation";
import {
  deleteMultipleFilesFromStorage,
  moveFileInStorage,
} from "@/lib/storage";
import { toast } from "sonner";
import { getAuthSession } from "@/lib/sessionAuth";

type UseFoldersParams = {
  userId: string;
  parentId?: string | null;
};

export const useFolders = (params: UseFoldersParams) => {
  return useQuery({
    queryKey: ["folders", params],
    queryFn: () => FolderEndpoints.getFolders(params),
    enabled: !!params.userId,
  });
};

export const useFolderPath = (id?: string) => {
  return useQuery({
    queryKey: ["folders", "path", id],
    queryFn: () => FolderEndpoints.getFolderPath(id!),
    enabled: !!id && id !== "root",
  });
};

export const useResolvePath = (userId: string, path: string) => {
  return useQuery({
    queryKey: ["folders", "resolve-path", userId, path],
    queryFn: () => FolderEndpoints.resolvePath(userId, path),
    enabled: !!userId && !!path,
  });
};

export const useRecursiveFiles = (id?: string) => {
  return useQuery({
    queryKey: ["folders", "recursive-files", id],
    queryFn: () => FolderEndpoints.getRecursiveFiles(id!),
    enabled: !!id,
  });
};

export const useCreateFolder = () =>
  useAppMutation<FolderMetadata>({
    mutationFn: FolderEndpoints.createFolder,
    invalidateKeys: [["folders"]],
    successMessage: "Folder created successfully",
  });

export const useUpdateFolder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      userId,
      data,
    }: {
      id: string;
      userId: string;
      data: Partial<FolderMetadata>;
    }) => {
      const path = await FolderEndpoints.getFolderPath(id);
      const oldPathSegments = path.map(
        (f: { slug: string; name: string }) => f.slug || f.name
      );
      const oldFolderPath = oldPathSegments.join("/");
      const updateResult = await FolderEndpoints.updateFolder(id, userId, data);
      const newPathSegments = [...oldPathSegments];
      newPathSegments[newPathSegments.length - 1] =
        updateResult.slug || updateResult.name;
      const newFolderPath = newPathSegments.join("/");
      const files = await FolderEndpoints.getRecursiveFiles(id);
      const { user } = await getAuthSession();

      if (files.length > 0) {
        for (const file of files) {
          const oldPrefix = `${user?.id}/${oldFolderPath}`;
          const newPrefix = `${user?.id}/${newFolderPath}`;

          if (file.key.startsWith(oldPrefix)) {
            const newKey = file.key.replace(oldPrefix, newPrefix);

            const storageResult = await moveFileInStorage(file.key, newKey);
            await updateFile(file.id, userId, {
              key: storageResult.key,
              url: storageResult.publicUrl,
            });
          }
        }
      }
      return updateResult;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["folders"] });
      queryClient.invalidateQueries({ queryKey: ["files"] });
      toast.success("Folder and files updated successfully");
    },
    onError: (error: Error) => {
      toast.error(
        (error as any)?.response?.data?.message || "Failed to rename folder"
      );
    },
  });
};

export const useDeleteFolder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, userId }: { id: string; userId: string }) => {
      const files = await FolderEndpoints.getRecursiveFiles(id);
      const keys = files.map((f: { key: string }) => f.key);

      if (keys.length > 0) {
        await deleteMultipleFilesFromStorage(keys);
      }
      return FolderEndpoints.deleteFolder(id, userId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["folders"] });
      queryClient.invalidateQueries({ queryKey: ["files"] });
      toast.success("Folder deleted successfully");
    },
    onError: (error: Error) => {
      toast.error(
        (error as any)?.response?.data?.message || "Failed to delete folder"
      );
    },
  });
};
