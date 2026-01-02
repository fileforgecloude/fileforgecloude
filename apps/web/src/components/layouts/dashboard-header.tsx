"use client";

import React from "react";
import { Plus, Upload, FolderPlus, Search } from "lucide-react";
import { Button } from "@repo/ui/components/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@repo/ui/components/dropdown-menu";
import { Input } from "@repo/ui/components/input";

interface DashboardHeaderProps {
  onUploadClick: () => void;
  onCreateFolderClick: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  folderId?: string;
}

export const DashboardHeader = ({ onUploadClick, onCreateFolderClick, searchQuery, onSearchChange, folderId }: DashboardHeaderProps) => {
  return (
    <div className='flex flex-col gap-6 mb-8'>
      <div className='flex flex-col md:flex-row md:items-center justify-between gap-4'>
        <div className='flex items-center gap-4 flex-1 max-w-2xl'>
          <h1 className='text-2xl font-semibold text-slate-800 dark:text-slate-100 px-2 hidden sm:block whitespace-nowrap'>My Drive</h1>
          <div className='relative flex-1'>
            <Search className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400' />
            <Input
              placeholder='Search in Drive'
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className='pl-10 h-11 bg-slate-100 border-none dark:bg-[#131313] dark:text-slate-200 rounded-xl focus-visible:ring-2 focus-visible:ring-blue-500/20 transition-all w-full'
            />
          </div>
        </div>

        <div className='flex items-center gap-3'>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className='bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-6 h-11 rounded-[14px] font-bold shadow-lg shadow-blue-500/20 gap-2 transition-transform active:scale-95'>
                <Plus className='w-5 h-5' />
                New
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align='end'
              className='w-56 p-2 rounded-2xl shadow-2xl border-slate-200 dark:border-[#333] bg-white dark:bg-[#1E1E1E]'
            >
              <DropdownMenuItem onClick={onUploadClick} className='gap-3 rounded-xl py-3 font-medium transition-colors'>
                <Upload className='w-4 h-4 text-blue-500' />
                Upload File
              </DropdownMenuItem>
              <DropdownMenuSeparator className='dark:bg-[#333]' />
              <DropdownMenuItem onClick={onCreateFolderClick} className='gap-3 rounded-xl py-3 font-medium transition-colors'>
                <FolderPlus className='w-4 h-4 text-slate-500' />
                New Folder
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};
