"use client";

import { FileCode, FileIcon, FileImage, FileText } from "lucide-react";
import { formatDate, formatSize } from "@/utils/format";
import { DriveFile } from "@/types/file.types";
import { FileActionsDropdown } from "./file-action-dropdown";

const getFileIcon = (type: string) => {
  if (type.startsWith("image/")) return <FileImage className='w-10 h-10 text-rose-500' />;
  if (type.includes("pdf")) return <FileText className='w-10 h-10 text-orange-500' />;
  if (type.includes("typescript") || type.includes("javascript")) return <FileCode className='w-10 h-10 text-blue-500' />;
  return <FileIcon className='w-10 h-10 text-slate-400' />;
};

export const FileGrid = ({ files }: { files: DriveFile[] }) => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6'>
      {files.map((file) => (
        <div
          key={file.id}
          className='group bg-white dark:bg-[#1A1A1A] border border-slate-200/60 dark:border-[#2A2A2A] rounded-[24px] p-4 hover:border-blue-400 dark:hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 cursor-pointer relative'
        >
          <div className='flex items-center justify-between mb-4'>
            <div className='p-3 bg-slate-50 dark:bg-[#222] rounded-2xl group-hover:bg-blue-50 dark:group-hover:bg-blue-500/10 transition-colors'>
              {getFileIcon(file.type)}
            </div>
            <FileActionsDropdown file={file} alwaysVisible />
          </div>
          <div className='truncate font-bold text-slate-800 dark:text-slate-100 mb-1 text-[15px]' title={file.name}>
            {file.name}
          </div>
          <div className='text-[12px] text-slate-500 dark:text-slate-400 flex items-center justify-between font-medium opacity-70 group-hover:opacity-100 transition-opacity'>
            <span>{formatSize(file.size)}</span>
            <span>{formatDate(file.updatedAt)}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export const FileList = ({ files }: { files: DriveFile[] }) => {
  return (
    <div className='w-full bg-white dark:bg-[#1A1A1A] rounded-[24px] border border-slate-200/60 dark:border-[#2A2A2A] overflow-hidden shadow-sm'>
      <div className='grid grid-cols-12 gap-4 px-6 py-4 text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest border-b dark:border-[#2A2A2A] bg-slate-50/50 dark:bg-white/5'>
        <div className='col-span-6'>Name</div>
        <div className='col-span-3 text-center'>Last modified</div>
        <div className='col-span-2 text-center'>Size</div>
        <div className='col-span-1 text-right'>Action</div>
      </div>
      <div className='flex flex-col'>
        {files.map((file) => (
          <div
            key={file.id}
            className='grid grid-cols-12 gap-4 px-6 py-3 items-center hover:bg-blue-50/30 dark:hover:bg-blue-500/5 transition-colors border-b dark:border-[#2A2A2A] last:border-0 group cursor-pointer'
          >
            <div className='col-span-6 flex items-center gap-3'>
              <div className='scale-75 p-1 bg-slate-50 dark:bg-[#222] rounded-lg group-hover:bg-white dark:group-hover:bg-[#333] transition-colors'>
                {getFileIcon(file.type)}
              </div>
              <span className='truncate font-bold text-slate-700 dark:text-slate-200 text-[14px]' title={file.name}>
                {file.name}
              </span>
            </div>
            <div className='col-span-3 text-[13px] font-medium text-slate-500 dark:text-slate-400 text-center opacity-80'>
              {formatDate(file.updatedAt)}
            </div>
            <div className='col-span-2 text-[13px] font-medium text-slate-500 dark:text-slate-400 text-center opacity-80'>
              {formatSize(file.size)}
            </div>
            <div className='col-span-1 flex justify-end'>
              <FileActionsDropdown file={file} alwaysVisible />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
