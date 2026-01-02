"use client";

import React, { useState } from "react";
import { MoreVertical, Trash, Edit2, Link as LinkIcon } from "lucide-react";
import { Button } from "@repo/ui/components/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@repo/ui/components/dropdown-menu";
import { DriveFolder } from "@/types/file.types";
import { useDeleteFolder } from "@/react-query/folders/folder-actions";
import { toast } from "sonner";
import { useSession } from "@/lib/auth-client";
import { ConfirmationDialog } from "@/components/ui/confirmation-dialog";
import { RenameFolderDialog } from "./rename-folder-dialog";

type Props = {
  folder: DriveFolder;
  alwaysVisible?: boolean;
};

export const FolderActionsDropdown = ({ folder, alwaysVisible = true }: Props) => {
  const deleteFolderMutation = useDeleteFolder();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isRenameDialogOpen, setIsRenameDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { data: session } = useSession();

  const handleDeleteConfirm = async () => {
    if (!session?.user?.id) return;

    setIsDeleting(true);
    try {
      await deleteFolderMutation.mutateAsync({
        id: folder.id,
        userId: session.user.id,
      });
    } catch {
      // Error handled by mutation toast
    } finally {
      setIsDeleting(false);
    }
  };

  const copyPath = () => {
    const url = `${window.location.origin}/dashboard/${folder.id}`;
    navigator.clipboard.writeText(url);
    toast.success("Folder link copied");
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant='ghost'
            size='icon'
            onClick={(e) => e.stopPropagation()}
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
          <DropdownMenuItem
            onClick={(e) => {
              e.stopPropagation();
              setIsRenameDialogOpen(true);
            }}
            className='gap-3 rounded-xl py-3 font-medium px-3'
          >
            <Edit2 className='w-4 h-4' /> Rename
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={(e) => {
              e.stopPropagation();
              copyPath();
            }}
            className='gap-3 rounded-xl py-3 font-medium px-3'
          >
            <LinkIcon className='w-4 h-4' /> Copy Link
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={(e) => {
              e.stopPropagation();
              setIsDeleteDialogOpen(true);
            }}
            className='gap-3 rounded-xl py-3 font-medium text-rose-500 px-3'
          >
            <Trash className='w-4 h-4' /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDeleteConfirm}
        title='Delete Folder?'
        description={
          <>
            Are you sure you want to delete{" "}
            <span className='font-bold text-slate-800 dark:text-slate-200'>&ldquo;{folder.name}&ldquo;</span>? All contents within this
            folder will be permanently deleted.
          </>
        }
        confirmText='Delete'
        isLoading={isDeleting}
        variant='destructive'
      />

      <RenameFolderDialog folder={folder} isOpen={isRenameDialogOpen} onClose={() => setIsRenameDialogOpen(false)} />
    </>
  );
};
