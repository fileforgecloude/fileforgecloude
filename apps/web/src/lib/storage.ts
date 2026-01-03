import { supabase } from "@/lib/supabase";
import { getAuthSession } from "./sessionAuth";

type UploadOptions = {
  file: File;
  folder?: string;
};

const BUCKET_NAME = "fileforge";

export const generateStorageKey = async (fileName: string, folderPath?: string) => {
  const { user } = await getAuthSession();
  const timestamp = Date.now();
  const base = `${user?.id}`;
  const sanitizedPath = folderPath
    ? folderPath
        .split("/")
        .map((segment) => segment.trim().replace(/\s+/g, "-").toLowerCase())
        .join("/")
    : "";

  const path = sanitizedPath ? `${base}/${sanitizedPath}` : base;
  return `${path}/${timestamp}-${fileName}`;
};

export const uploadFileToStorage = async ({ file, folder }: UploadOptions) => {
  if (!BUCKET_NAME) {
    throw new Error("Supabase bucket name not configured");
  }

  const key = await generateStorageKey(file.name, folder);

  const { error } = await supabase.storage.from(BUCKET_NAME).upload(key, file);

  if (error) throw error;

  const {
    data: { publicUrl },
  } = supabase.storage.from(BUCKET_NAME).getPublicUrl(key);

  return {
    key,
    url: publicUrl,
    name: file.name,
    size: file.size,
    type: file.type,
  };
};

export const deleteFileFromStorage = async (key: string) => {
  if (!BUCKET_NAME) {
    throw new Error("Supabase bucket name not configured");
  }
  const { error } = await supabase.storage.from(BUCKET_NAME).remove([key]);

  if (error) throw error;
};

export const deleteMultipleFilesFromStorage = async (keys: string[]) => {
  if (!BUCKET_NAME || keys.length === 0) return;
  const { error } = await supabase.storage.from(BUCKET_NAME).remove(keys);
  if (error) throw error;
};

export const moveFileInStorage = async (oldKey: string, newKey: string) => {
  if (!BUCKET_NAME) {
    throw new Error("Supabase bucket name not configured");
  }
  const { error } = await supabase.storage.from(BUCKET_NAME).move(oldKey, newKey);
  if (error) throw error;

  const {
    data: { publicUrl },
  } = supabase.storage.from(BUCKET_NAME).getPublicUrl(newKey);

  return { publicUrl, key: newKey };
};
