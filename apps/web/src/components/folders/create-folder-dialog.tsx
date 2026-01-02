"use client";

import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@repo/ui/components/dialog";
import { Button } from "@repo/ui/components/button";
import { Input } from "@repo/ui/components/input";
import { useCreateFolder } from "@/react-query/folders/folder-actions";
import { useSession } from "@/lib/auth-client";

interface CreateFolderDialogProps {
  isOpen: boolean;
  onClose: () => void;
  parentId?: string | null;
}

export const CreateFolderDialog = ({ isOpen, onClose, parentId }: CreateFolderDialogProps) => {
  const [folderName, setFolderName] = useState("");
  const { data: session } = useSession();
  const createFolderMutation = useCreateFolder();

  const handleCreate = async () => {
    if (!folderName.trim() || !session?.user) return;

    try {
      await createFolderMutation.mutateAsync({
        name: folderName,
        userId: session.user.id,
        parentId: parentId || null,
      });
      setFolderName("");
      onClose();
    } catch (error) {
      console.error("Failed to create folder:", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='sm:max-w-md bg-white dark:bg-[#1A1A1A] border-slate-200 dark:border-[#333] rounded-[30px]'>
        <DialogHeader>
          <DialogTitle className='text-xl font-bold dark:text-slate-100'>New Folder</DialogTitle>
        </DialogHeader>
        <div className='py-4'>
          <Input
            placeholder='Folder name'
            value={folderName}
            onChange={(e) => setFolderName(e.target.value)}
            className='h-12 bg-slate-100 dark:bg-[#131313] border-none rounded-xl'
            autoFocus
            onKeyDown={(e) => e.key === "Enter" && handleCreate()}
          />
        </div>
        <DialogFooter className='gap-2'>
          <Button variant='ghost' onClick={onClose} className='rounded-full px-6 transition-all active:scale-95'>
            Cancel
          </Button>
          <Button
            onClick={handleCreate}
            disabled={!folderName.trim() || createFolderMutation.isPending}
            className='bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-full px-8 font-bold transition-all active:scale-95'
          >
            {createFolderMutation.isPending ? "Creating..." : "Create"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
