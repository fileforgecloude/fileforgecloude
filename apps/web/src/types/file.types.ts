export type DriveFile = {
  id: string;
  name: string;
  size: number;
  type: string;
  url: string;
  key: string;
  updatedAt: string;
  folderId?: string | null;
};

export type DriveFolder = {
  id: string;
  name: string;
  slug?: string;
  userId: string;
  parentId?: string | null;
  updatedAt: string;
};

export type DriveItem = (DriveFile & { isFolder?: false }) | (DriveFolder & { isFolder: true });
