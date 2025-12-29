"use client";

import React from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@repo/ui/components/dialog";
import { Button } from "@repo/ui/components/button";
import { AlertTriangle, Loader2 } from "lucide-react";
import { cn } from "@repo/ui/lib/utils";

interface ConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: React.ReactNode;
  confirmText?: string;
  cancelText?: string;
  variant?: "destructive" | "primary";
  isLoading?: boolean;
  icon?: React.ReactNode;
}

export const ConfirmationDialog = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "destructive",
  isLoading = false,
  icon,
}: ConfirmationDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='sm:max-w-[420px] p-0 overflow-hidden border-none bg-white dark:bg-[#1A1A1A] rounded-[28px] shadow-2xl'>
        <div className='p-6 pt-8 flex flex-col items-center text-center'>
          <div
            className={cn(
              "w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-transform hover:scale-110",
              variant === "destructive" ? "bg-rose-50 dark:bg-rose-500/10" : "bg-blue-50 dark:bg-blue-500/10"
            )}
          >
            {icon ||
              (variant === "destructive" ? (
                <AlertTriangle className='w-8 h-8 text-rose-500' />
              ) : (
                <AlertTriangle className='w-8 h-8 text-blue-500' />
              ))}
          </div>

          <DialogHeader className='gap-2'>
            <DialogTitle className='text-xl font-bold text-slate-900 dark:text-white'>{title}</DialogTitle>
            <DialogDescription className='text-slate-500 dark:text-slate-400 text-[15px] leading-relaxed px-2'>
              {description}
            </DialogDescription>
          </DialogHeader>
        </div>

        <DialogFooter className='p-6 space-x-2 bg-slate-50 dark:bg-white/5 gap-3 sm:gap-0 sm:flex-row border-t dark:border-[#2A2A2A]'>
          <Button
            variant='ghost'
            onClick={onClose}
            disabled={isLoading}
            className='flex-1 h-12 rounded-2xl font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-white/5 transition-all'
          >
            {cancelText}
          </Button>
          <Button
            onClick={onConfirm}
            disabled={isLoading}
            className={cn(
              "flex-1 h-12 rounded-2xl font-bold text-white shadow-lg active:scale-[0.98] transition-all gap-2",
              variant === "destructive"
                ? "bg-rose-500 hover:bg-rose-600 shadow-rose-500/20"
                : "bg-blue-600 hover:bg-blue-700 shadow-blue-500/20"
            )}
          >
            {isLoading ? (
              <>
                <Loader2 className='w-4 h-4 animate-spin' />
                Processing...
              </>
            ) : (
              confirmText
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
