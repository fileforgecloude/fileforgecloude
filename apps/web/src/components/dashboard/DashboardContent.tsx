"use client";

import React, { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { UploadCloud } from "lucide-react";
import { Button } from "@repo/ui/components/button";
import { toast } from "sonner";
import { useSession } from "@/lib/auth-client";
import { useCreateFile, useFiles } from "@/react-query/files/file-actions";
import { useFolders, useResolvePath } from "@/react-query/folders/folder-actions";
import { uploadFileToStorage } from "@/lib/storage";
import { DashboardHeader } from "@/components/layouts/dashboard-header";
import { FilterBar } from "@/components/files/filter-bar";
import { ListSkeleton } from "@/components/files/file-skeleton";
import { FileGrid, FileList } from "@/components/files/file-list";
import { useUrlQuery } from "@/hooks/useUrlQuery";
import { useDebounce } from "@/hooks/useDebounce";
import { CreateFolderDialog } from "@/components/folders/create-folder-dialog";
import { DriveFile, DriveFolder, DriveItem } from "@/types/file.types";
import { notFound } from "next/navigation";

const VIEW_STORAGE_KEY = "dashboard-view";

interface DashboardContentProps {
  folderId?: string;
  folderPath?: string;
}

export const DashboardContent = ({ folderId: propFolderId, folderPath: propFolderPath }: DashboardContentProps) => {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [isCreateFolderOpen, setIsCreateFolderOpen] = useState(false);
  const { searchParams, setQuery } = useUrlQuery();
  const { data: session, isPending: isSessionLoading } = useSession();

  const {
    data: resolvedFolderId,
    isLoading: isResolving,
    isFetched: isPathFetched,
  } = useResolvePath(session?.user?.id || "", propFolderPath || "");

  const folderId = propFolderId || resolvedFolderId;

  useEffect(() => {
    if (propFolderPath && isPathFetched && resolvedFolderId === null) {
      notFound();
    }
  }, [propFolderPath, isPathFetched, resolvedFolderId]);

  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");
  const [filterType, setFilterType] = useState(searchParams.get("type") || "");
  const [sortBy, setSortBy] = useState(searchParams.get("sort") || "modified");
  const debouncedSearch = useDebounce(searchQuery, 500);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const savedView = localStorage.getItem(VIEW_STORAGE_KEY) as "grid" | "list";
    if (savedView) setView(savedView);
  }, []);

  const handleViewChange = (newView: "grid" | "list") => {
    setView(newView);
    localStorage.setItem(VIEW_STORAGE_KEY, newView);
  };

  const isWaitingForResolution = propFolderPath && !resolvedFolderId;

  // TanStack Query Hooks
  const { data: files = [], isLoading: isLoadingFiles } = useFiles({
    search: debouncedSearch,
    type: filterType,
    sort: sortBy,
    userId: session?.user?.id || "",
    folderId: isWaitingForResolution ? undefined : folderId || "root",
  });

  const { data: folders = [], isLoading: isLoadingFolders } = useFolders({
    userId: session?.user?.id || "",
    parentId: isWaitingForResolution ? undefined : folderId || "root",
  });

  const createFileMutation = useCreateFile();

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !session?.user) return;

    const toastId = toast.loading("Preparing upload...");

    try {
      toast.loading("Uploading to storage...", { id: toastId });
      const storageResult = await uploadFileToStorage({ file, folder: propFolderPath });

      await createFileMutation.mutateAsync({
        name: storageResult.name,
        size: storageResult.size,
        type: storageResult.type,
        key: storageResult.key,
        url: storageResult.url,
        userId: session.user.id,
        folderId,
      });
      toast.success("File uploaded successfully", { id: toastId });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to upload file";
      console.error("Upload error:", err);
      toast.error(message, { id: toastId });
    } finally {
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const combinedItems = useMemo(() => {
    const folderItems: DriveItem[] = folders.map((f: DriveFolder) => ({ ...f, isFolder: true }));
    const fileItems: DriveItem[] = files.map((f: DriveFile) => ({ ...f, isFolder: false }));
    return [...folderItems, ...fileItems];
  }, [folders, files]);

  const handleSearchChange = useCallback(
    (value: string) => {
      setSearchQuery(value);
      setQuery("search", value || undefined);
    },
    [setQuery]
  );

  const handleFilterChange = useCallback(
    (type: string) => {
      setFilterType(type);
      setQuery("type", type || undefined);
    },
    [setQuery]
  );

  const handleSortChange = useCallback(
    (sort: string) => {
      setSortBy(sort);
      setQuery("sort", sort);
    },
    [setQuery]
  );

  const isLoading = isSessionLoading || isLoadingFiles || isLoadingFolders || isResolving;

  return (
    <div className=''>
      <DashboardHeader
        onUploadClick={() => fileInputRef.current?.click()}
        onCreateFolderClick={() => setIsCreateFolderOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        folderId={folderId}
      />

      <FilterBar
        view={view}
        onViewChange={handleViewChange}
        filterType={filterType}
        onFilterTypeChange={handleFilterChange}
        sortBy={sortBy}
        onSortChange={handleSortChange}
      />

      <input type='file' ref={fileInputRef} onChange={handleUpload} className='hidden' />

      <CreateFolderDialog isOpen={isCreateFolderOpen} onClose={() => setIsCreateFolderOpen(false)} parentId={folderId} />

      {isLoading ? (
        <div>
          <ListSkeleton />
        </div>
      ) : combinedItems.length === 0 ? (
        <div className='h-[60vh] flex flex-col items-center justify-center text-slate-500 dark:text-slate-400 border-2 border-dashed border-slate-200 dark:border-[#333] rounded-[40px] bg-slate-50/50 dark:bg-[#131313]/50 transition-all'>
          <div className='p-8 bg-white dark:bg-[#1E1E1E] rounded-full shadow-lg mb-6 border dark:border-[#333] scale-110 group-hover:scale-125 transition-transform'>
            <UploadCloud className='w-16 h-16 text-blue-500 dark:text-blue-400 opacity-60' />
          </div>
          <p className='text-xl font-bold text-slate-800 dark:text-slate-200'>
            {searchQuery || filterType ? "No matching items found" : "This folder is empty"}
          </p>
          <p className='text-sm mt-1 mb-8 opacity-70'>
            {searchQuery || filterType ? "Try adjusting your search or filters" : "Upload files or create folders to get started"}
          </p>
          <div className='flex gap-4'>
            <Button
              onClick={() => setIsCreateFolderOpen(true)}
              variant='outline'
              className='px-10 h-12 rounded-full font-bold transition-all active:scale-95'
            >
              New Folder
            </Button>
            <Button
              onClick={() => fileInputRef.current?.click()}
              className='bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-10 h-12 rounded-full font-bold shadow-lg shadow-blue-500/20 transition-all active:scale-95'
            >
              Upload File
            </Button>
          </div>
        </div>
      ) : (
        <div>{view === "grid" ? <FileGrid items={combinedItems} /> : <FileList items={combinedItems} />}</div>
      )}
    </div>
  );
};
