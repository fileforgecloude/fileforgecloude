"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { UploadCloud } from "lucide-react";
import { Button } from "@repo/ui/components/button";
import { toast } from "sonner";
import { useSession } from "@/lib/auth-client";
import { useCreateFile, useFiles } from "@/react-query/files/file-actions";
import { uploadFileToStorage } from "@/lib/storage";
import { DashboardHeader } from "@/components/layouts/dashboard-header";
import { FilterBar } from "@/components/files/filter-bar";
import { ListSkeleton } from "@/components/files/file-skeleton";
import { FileGrid, FileList } from "@/components/files/file-list";
import { useUrlQuery } from "@/hooks/useUrlQuery";
import { useDebounce } from "@/hooks/useDebounce";

const VIEW_STORAGE_KEY = "dashboard-view";

const UserDashboard = () => {
  const [view, setView] = useState<"grid" | "list">("grid");
  const { searchParams, setQuery } = useUrlQuery();

  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");
  const [filterType, setFilterType] = useState(searchParams.get("type") || "");
  const [sortBy, setSortBy] = useState(searchParams.get("sort") || "modified");
  const debouncedSearch = useDebounce(searchQuery, 500);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const { data: session } = useSession();

  useEffect(() => {
    const savedView = localStorage.getItem(VIEW_STORAGE_KEY) as "grid" | "list";
    if (savedView) setView(savedView);
  }, []);

  const handleViewChange = (newView: "grid" | "list") => {
    setView(newView);
    localStorage.setItem(VIEW_STORAGE_KEY, newView);
  };

  // TanStack Query Hooks
  const { data: files = [], isLoading } = useFiles({
    search: debouncedSearch,
    type: filterType,
    sort: sortBy,
    userId: session?.user?.id || "",
  });
  const createFileMutation = useCreateFile();

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !session?.user) return;

    const toastId = toast.loading("Preparing upload...");

    try {
      toast.loading("Uploading to storage...", { id: toastId });
      const storageResult = await uploadFileToStorage({ file });

      await createFileMutation.mutateAsync({
        name: storageResult.name,
        size: storageResult.size,
        type: storageResult.type,
        key: storageResult.key,
        url: storageResult.url,
        userId: session.user.id,
      });

      toast.success("File uploaded successfully", { id: toastId });
    } catch (error: any) {
      console.error("Upload error:", error);
      toast.error(error.message || "Failed to upload file", { id: toastId });
    } finally {
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

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

  return (
    <div className=''>
      <DashboardHeader
        onUploadClick={() => fileInputRef.current?.click()}
        onCreateFolderClick={() => toast.info("Folder creation coming soon!")}
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
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

      {isLoading ? (
        <div className='animate-in fade-in duration-500'>
          <ListSkeleton />
        </div>
      ) : files.length === 0 ? (
        <div className='h-[60vh] flex flex-col items-center justify-center text-slate-500 dark:text-slate-400 border-2 border-dashed border-slate-200 dark:border-[#333] rounded-[40px] bg-slate-50/50 dark:bg-[#131313]/50 transition-all'>
          <div className='p-8 bg-white dark:bg-[#1E1E1E] rounded-full shadow-lg mb-6 border dark:border-[#333] scale-110 group-hover:scale-125 transition-transform'>
            <UploadCloud className='w-16 h-16 text-blue-500 dark:text-blue-400 opacity-60' />
          </div>
          <p className='text-xl font-bold text-slate-800 dark:text-slate-200'>
            {searchQuery || filterType ? "No matching files found" : "Your drive is empty"}
          </p>
          <p className='text-sm mt-1 mb-8 opacity-70'>
            {searchQuery || filterType ? "Try adjusting your search or filters" : "Upload your first file to get started with FileForge"}
          </p>
          <Button
            onClick={() => fileInputRef.current?.click()}
            className='bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-10 h-12 rounded-full font-bold shadow-lg shadow-blue-500/20'
          >
            Upload File
          </Button>
        </div>
      ) : (
        <div className='animate-in fade-in slide-in-from-bottom-4 duration-500'>
          {view === "grid" ? <FileGrid files={files} /> : <FileList files={files} />}
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
