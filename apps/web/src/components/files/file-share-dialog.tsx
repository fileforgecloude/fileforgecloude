"use client";

import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@repo/ui/components/dialog";
import { Button } from "@repo/ui/components/button";
import { DriveFile } from "@/types/file.types";
import { toast } from "sonner";

type Props = {
  file: DriveFile | null;
  open: boolean;
  onClose: () => void;
};

export const ShareFileDialog = ({ file, open, onClose }: Props) => {
  const [visibility, setVisibility] = useState<"private" | "public">("private");

  if (!file) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(file.url);
    toast.success("Link copied to clipboard");
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className='max-w-md rounded-2xl'>
        <DialogHeader>
          <DialogTitle>Share "{file.name}"</DialogTitle>
        </DialogHeader>

        <div className='space-y-5'>
          {/* Visibility options */}
          <div className='space-y-3'>
            <label className='flex items-start gap-3 cursor-pointer'>
              <input type='radio' checked={visibility === "private"} onChange={() => setVisibility("private")} />
              <div>
                <p className='font-medium'>Private</p>
                <p className='text-xs text-slate-500'>Only you can access</p>
              </div>
            </label>

            <label className='flex items-start gap-3 cursor-pointer'>
              <input type='radio' checked={visibility === "public"} onChange={() => setVisibility("public")} />
              <div>
                <p className='font-medium'>Public</p>
                <p className='text-xs text-slate-500'>Anyone with the link can view</p>
              </div>
            </label>
          </div>

          {/* Public link */}
          {visibility === "public" && <div className='rounded-xl bg-slate-100 dark:bg-[#222] p-3 text-xs break-all'>{file.url}</div>}

          {/* Actions */}
          <div className='flex justify-end gap-2'>
            <Button variant='ghost' onClick={onClose}>
              Cancel
            </Button>
            {visibility === "public" && <Button onClick={handleCopy}>Copy link</Button>}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
