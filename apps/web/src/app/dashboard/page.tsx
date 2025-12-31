"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import { FileGrid, FileList, type DriveFile } from "./_components/file-list";
import { Loader2, UploadCloud } from "lucide-react";
import { Button } from "@repo/ui/components/button";
import { toast } from "sonner";
import { useSession } from "@/lib/auth-client";
import {
  useCreateFile,
  useDeleteFile,
  useFiles,
} from "@/react-query/files/file-actions";
import { deleteFileFromStorage, uploadFileToStorage } from "@/lib/storage";
import { DashboardHeader } from "../../components/layouts/dashboard-header";
import { FilterBar } from "./_components/filter-bar";
import { ListSkeleton } from "./_components/file-skeleton";
import { ConfirmationDialog } from "../../components/ui/confirmation-dialog";

const VIEW_STORAGE_KEY = "dashboard-view";

const UserDashboard = () => {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("");
  const [sortBy, setSortBy] = useState("modified");

  // Delete Dialog State
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [fileToDelete, setFileToDelete] = useState<DriveFile | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const { data: session } = useSession();

  // Load view preference from localStorage
  useEffect(() => {
    const savedView = localStorage.getItem(VIEW_STORAGE_KEY) as "grid" | "list";
    if (savedView) setView(savedView);
  }, []);

  // Save view preference to localStorage
  const handleViewChange = (newView: "grid" | "list") => {
    setView(newView);
    localStorage.setItem(VIEW_STORAGE_KEY, newView);
  };

  // TanStack Query Hooks
  const { data: files = [], isLoading } = useFiles(session?.user?.id);
  const createFileMutation = useCreateFile();
  const deleteFileMutation = useDeleteFile();

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

  const handleAction = async (action: string, file: DriveFile) => {
    if (action === "delete") {
      setFileToDelete(file);
      setIsDeleteDialogOpen(true);
    } else if (action === "get-link") {
      navigator.clipboard.writeText(file.url);
      toast.success("Link copied to clipboard");
    } else if (action === "download") {
      window.open(file.url, "_blank");
    }
  };

  const handleDeleteConfirm = async () => {
    if (!fileToDelete || !session?.user?.id) return;

    setIsDeleting(true);
    const toastId = toast.loading("Deleting file...");

    try {
      await deleteFileFromStorage(fileToDelete.key);
      await deleteFileMutation.mutateAsync({
        id: fileToDelete.id,
        userId: session.user.id,
      });
      toast.success("File deleted successfully", { id: toastId });
      setIsDeleteDialogOpen(false);
      setFileToDelete(null);
    } catch (error: any) {
      toast.error(error.message || "Failed to delete file", { id: toastId });
    } finally {
      setIsDeleting(false);
    }
  };

  const driveFiles: DriveFile[] = useMemo(() => {
    let result = Array.isArray(files)
      ? files.map((f: any) => ({
          id: f.id,
          name: f.name,
          size: f.size,
          type: f.type,
          url: f.url,
          key: f.key,
          updatedAt: f.updatedAt || new Date().toISOString(),
        }))
      : [];

    // Filter by search query
    if (searchQuery) {
      result = result.filter((file) =>
        file.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by type
    if (filterType) {
      result = result.filter((file) => {
        if (filterType === "image") return file.type.startsWith("image/");
        if (filterType === "pdf") return file.type.includes("pdf");
        if (filterType === "code")
          return (
            file.type.includes("typescript") ||
            file.type.includes("javascript") ||
            file.type.includes("json")
          );
        return true;
      });
    }

    // Sort
    result.sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });

    return result;
  }, [files, searchQuery, filterType, sortBy]);

  return (
    <div className="">
      <DashboardHeader
        onUploadClick={() => fileInputRef.current?.click()}
        onCreateFolderClick={() => toast.info("Folder creation coming soon!")}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <FilterBar
        view={view}
        onViewChange={handleViewChange}
        filterType={filterType}
        onFilterTypeChange={setFilterType}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleUpload}
        className="hidden"
      />

      {isLoading ? (
        <div className="animate-in fade-in duration-500">
          <ListSkeleton />
        </div>
      ) : driveFiles.length === 0 ? (
        <div className="h-[60vh] flex flex-col items-center justify-center text-slate-500 dark:text-slate-400 border-2 border-dashed border-slate-200 dark:border-[#333] rounded-[40px] bg-slate-50/50 dark:bg-[#131313]/50 transition-all">
          <div className="p-8 bg-white dark:bg-[#1E1E1E] rounded-full shadow-lg mb-6 border dark:border-[#333] scale-110 group-hover:scale-125 transition-transform">
            <UploadCloud className="w-16 h-16 text-blue-500 dark:text-blue-400 opacity-60" />
          </div>
          <p className="text-xl font-bold text-slate-800 dark:text-slate-200">
            {searchQuery || filterType
              ? "No matching files found"
              : "Your drive is empty"}
          </p>
          <p className="text-sm mt-1 mb-8 opacity-70">
            {searchQuery || filterType
              ? "Try adjusting your search or filters"
              : "Upload your first file to get started with FileForge"}
          </p>
          <Button
            onClick={() => fileInputRef.current?.click()}
            className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-10 h-12 rounded-full font-bold shadow-lg shadow-blue-500/20"
          >
            Upload File
          </Button>
        </div>
      ) : (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          {view === "grid" ? (
            <FileGrid files={driveFiles} onAction={handleAction} />
          ) : (
            <FileList files={driveFiles} onAction={handleAction} />
          )}
        </div>
      )}

      <ConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Delete File?"
        description={
          <>
            Are you sure you want to delete{" "}
            <span className="font-bold text-slate-800 dark:text-slate-200">
              "{fileToDelete?.name}"
            </span>
            ? This action cannot be undone.
          </>
        }
        confirmText="Delete"
        isLoading={isDeleting}
        variant="destructive"
      />
    </div>
  );
};

export default UserDashboard;
