"use client";

import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@repo/ui/components/dialog";
import { Button } from "@repo/ui/components/button";
import { Input } from "@repo/ui/components/input";
import { useUpdateFolder } from "@/react-query/folders/folder-actions";
import { useSession } from "@/lib/auth-client";
import { DriveFolder } from "@/types/file.types";

interface RenameFolderDialogProps {
  folder: DriveFolder | null;
  isOpen: boolean;
  onClose: () => void;
}

export const RenameFolderDialog = ({ folder, isOpen, onClose }: RenameFolderDialogProps) => {
  const [name, setName] = useState("");
  const { data: session } = useSession();
  const updateFolderMutation = useUpdateFolder();
  const [isRenaming, setIsRenaming] = useState(false);

  useEffect(() => {
    if (folder && isOpen) {
      setName(folder.name);
    }
  }, [folder, isOpen]);

  const handleRename = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !folder || !session?.user?.id) return;

    setIsRenaming(true);

    try {
      await updateFolderMutation.mutateAsync({
        id: folder.id,
        userId: session.user.id,
        data: { name: name.trim() },
      });
      onClose();
    } catch {
      // Error handled by mutation toast
    } finally {
      setIsRenaming(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='sm:max-w-md rounded-[28px] p-8 border-none dark:bg-[#1E1E1E] shadow-2xl animate-in fade-in zoom-in duration-300'>
        <DialogHeader>
          <DialogTitle className='text-2xl font-bold bg-linear-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-400 bg-clip-text text-transparent'>
            Rename Folder
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleRename} className='space-y-6 pt-4'>
          <div className='space-y-2'>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder='Folder name'
              className='h-14 rounded-2xl bg-slate-50 dark:bg-[#131313] border-none focus-visible:ring-2 focus-visible:ring-blue-500/20 text-lg font-medium transition-all px-6'
              autoFocus
            />
          </div>
          <DialogFooter className='sm:justify-end gap-3 pt-4'>
            <Button
              type='button'
              variant='ghost'
              onClick={onClose}
              className='h-12 px-8 rounded-xl font-bold hover:bg-slate-100 dark:hover:bg-white/5 transition-colors'
            >
              Cancel
            </Button>
            <Button
              type='submit'
              disabled={!name.trim() || name === folder?.name || isRenaming}
              className='h-12 px-10 rounded-xl font-bold bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white shadow-lg shadow-blue-500/20 transition-all active:scale-95 disabled:opacity-50 disabled:scale-100'
            >
              {isRenaming ? "Updating..." : "Rename"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
