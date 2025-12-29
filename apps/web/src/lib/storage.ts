import { supabase } from "@/lib/supabase";

type UploadOptions = {
  file: File;
  folder?: string;
};

const BUCKET_NAME = "fileforge";

export const generateStorageKey = (fileName: string, folder?: string) => {
  const timestamp = Date.now();
  const baseFolder = folder ?? "drive";
  return `${baseFolder}/${timestamp}-${fileName}`;
};

export const uploadFileToStorage = async ({ file, folder }: UploadOptions) => {
  if (!BUCKET_NAME) {
    throw new Error("Supabase bucket name not configured");
  }

  const key = generateStorageKey(file.name, folder);

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
  console.log(key, "key");
  const { error } = await supabase.storage.from(BUCKET_NAME).remove([key]);

  if (error) throw error;
};
