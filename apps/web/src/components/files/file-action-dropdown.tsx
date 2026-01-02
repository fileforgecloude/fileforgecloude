"use client";

import React, { useState } from "react";
import { MoreVertical, Download, Trash, Link as LinkIcon, Share2, Eye } from "lucide-react";
import { Button } from "@repo/ui/components/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@repo/ui/components/dropdown-menu";
import { DriveFile } from "@/types/file.types";
import { useDeleteFile } from "@/react-query/files/file-actions";
import { toast } from "sonner";
import { deleteFileFromStorage } from "@/lib/storage";
import { useSession } from "@/lib/auth-client";
import { ConfirmationDialog } from "@/components/ui/confirmation-dialog";
import { ShareFileDialog } from "./file-share-dialog";

type Props = {
  file: DriveFile;
  alwaysVisible?: boolean;
};

export const FileActionsDropdown = ({ file, alwaysVisible = true }: Props) => {
  const deleteFileMutation = useDeleteFile();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [fileToDelete, setFileToDelete] = useState<DriveFile | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const { data: session } = useSession();
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);

  const onAction = async (action: string, file: DriveFile) => {
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
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant='ghost'
            size='icon'
            className={`
            h-8 w-8 rounded-full
            hover:bg-slate-100 dark:hover:bg-white/10
            ${alwaysVisible ? "opacity-100" : "opacity-0 group-hover:opacity-100 transition-opacity"}
          `}
          >
            <MoreVertical className='w-4 h-4 text-slate-500' />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align='end'
          className='w-56 p-2 rounded-2xl shadow-2xl border-slate-200 dark:border-[#333] bg-white dark:bg-[#1E1E1E]'
        >
          <DropdownMenuItem onClick={() => window.open(file.url, "_blank")} className='gap-3 rounded-xl py-3 font-medium px-3'>
            <Eye className='w-4 h-4' /> View
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onAction("get-link", file)} className='gap-3 rounded-xl py-3 font-medium px-3'>
            <LinkIcon className='w-4 h-4' /> Get Link
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setIsShareDialogOpen(true)} className='gap-3 rounded-xl py-3 font-medium px-3'>
            <Share2 className='w-4 h-4' /> Share
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => onAction("download", file)} className='gap-3 rounded-xl py-3 font-medium px-3'>
            <Download className='w-4 h-4' /> Download
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => onAction("delete", file)} className='gap-3 rounded-xl py-3 font-medium text-rose-500 px-3 '>
            <Trash className='w-4 h-4' /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDeleteConfirm}
        title='Delete File?'
        description={
          <>
            Are you sure you want to delete{" "}
            <span className='font-bold text-slate-800 dark:text-slate-200'>&ldquo;{fileToDelete?.name}&ldquo;</span>? This action cannot be
            undone.
          </>
        }
        confirmText='Delete'
        isLoading={isDeleting}
        variant='destructive'
      />

      <ShareFileDialog file={file} open={isShareDialogOpen} onClose={() => setIsShareDialogOpen(false)} />
    </>
  );
};
