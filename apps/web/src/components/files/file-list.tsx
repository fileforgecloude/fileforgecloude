"use client";

import { FileCode, FileIcon, FileImage, FileText, Folder, Video, FileType, FileAudio } from "lucide-react";
import { formatDate, formatSize } from "@/utils/format";
import { DriveFile, DriveFolder, DriveItem } from "@/types/file.types";
import { FileActionsDropdown } from "./file-action-dropdown";
import { FolderActionsDropdown } from "../folders/folder-action-dropdown";
import { useRouter } from "next/navigation";
import { useSettings } from "@/hooks/use-settings";

const FilePreview = ({ item, layout = "grid" }: { item: DriveItem; layout?: "grid" | "list" | "grid-full" }) => {
  if (item.isFolder) {
    return (
      <div className={layout === "list" ? "p-1 bg-blue-50 dark:bg-blue-500/10 rounded-lg" : ""}>
        <Folder className={`${layout === "list" ? "w-5 h-5" : "w-16 h-16"} text-blue-500 fill-blue-500/20`} />
      </div>
    );
  }

  const file = item as DriveFile;
  const isImage = file.type.startsWith("image/");
  const isVideo = file.type.startsWith("video/");
  const isPDF = file.type.includes("pdf");
  const isAudio = file.type.startsWith("audio/");
  const isCode =
    file.type.includes("javascript") || file.type.includes("typescript") || file.type.includes("json") || file.type.includes("html");

  if (isImage && layout === "grid-full") {
    return (
      <img src={file.url} alt={file.name} className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-110' />
    );
  }

  if (isVideo && layout === "grid-full") {
    return (
      <div className='w-full h-full relative'>
        <video src={`${file.url}#t=0.1`} className='w-full h-full object-cover' preload='metadata' muted />
        <div className='absolute inset-0 flex items-center justify-center bg-black/20'>
          <Video className='w-12 h-12 text-white drop-shadow-lg' />
        </div>
      </div>
    );
  }

  const getIcon = () => {
    if (isImage) return <FileImage className={`${layout === "list" ? "w-5 h-5" : "w-12 h-12"} text-rose-500`} />;
    if (isVideo) return <Video className={`${layout === "list" ? "w-5 h-5" : "w-12 h-12"} text-amber-500`} />;
    if (isPDF) return <FileText className={`${layout === "list" ? "w-5 h-5" : "w-12 h-12"} text-rose-600`} />;
    if (isCode) return <FileCode className={`${layout === "list" ? "w-5 h-5" : "w-12 h-12"} text-blue-500`} />;
    if (isAudio) return <FileAudio className={`${layout === "list" ? "w-5 h-5" : "w-12 h-12"} text-blue-500`} />;
    if (file.type.includes("text/")) return <FileType className={`${layout === "list" ? "w-5 h-5" : "w-12 h-12"} text-slate-500`} />;
    return <FileIcon className={`${layout === "list" ? "w-5 h-5" : "w-12 h-12"} text-slate-400`} />;
  };

  return <div className={layout === "list" ? "p-1.5 bg-slate-50 dark:bg-[#222] rounded-lg" : ""}>{getIcon()}</div>;
};

const FileIconSmall = ({ item }: { item: DriveItem }) => {
  if (item.isFolder) return <Folder className='w-4 h-4 text-blue-500 fill-blue-500/20' />;
  const file = item as DriveFile;
  const type = file.type;
  if (type.startsWith("image/")) return <FileImage className='w-4 h-4 text-rose-500' />;
  if (type.startsWith("video/")) return <Video className='w-4 h-4 text-amber-500' />;
  if (type.includes("pdf")) return <FileText className='w-4 h-4 text-rose-600' />;
  if (type.includes("audio/")) return <FileAudio className='w-4 h-4 text-blue-500' />;
  if (type.includes("javascript") || type.includes("typescript") || type.includes("json"))
    return <FileCode className='w-4 h-4 text-blue-500' />;
  return <FileIcon className='w-4 h-4 text-slate-400' />;
};

export const FileGrid = ({ items }: { items: DriveItem[] }) => {
  const router = useRouter();
  const { navigationMode } = useSettings();

  const handleItemClick = (item: DriveItem) => {
    if (item.isFolder) {
      const path = item.slug || item.id;
      router.push(`${window.location.pathname}/${path}`.replace(/\/+/g, "/"));
    }
  };

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6'>
      {items.map((item) => (
        <div
          key={item.id}
          onClick={() => navigationMode === "single-click" && handleItemClick(item)}
          onDoubleClick={() => navigationMode === "double-click" && handleItemClick(item)}
          className='group bg-white dark:bg-[#1A1A1A] border border-slate-200/60 dark:border-[#2A2A2A] rounded-[12px] overflow-hidden transition-all duration-300 cursor-pointer relative flex flex-col'
        >
          {/* Card Header */}
          <div className='flex items-center justify-between pl-4 pr-2 py-1 bg-[#FBFCFD] dark:bg-[#1A1A1A] z-10'>
            <div className='flex items-center gap-2 truncate flex-1 mr-2'>
              <FileIconSmall item={item} />
              <span className='truncate font-semibold text-slate-700 dark:text-slate-200 text-[14px]' title={item.name}>
                {item.name}
              </span>
            </div>
            <div onClick={(e) => e.stopPropagation()} onDoubleClick={(e) => e.stopPropagation()}>
              {item.isFolder ? (
                <FolderActionsDropdown folder={item as DriveFolder} alwaysVisible />
              ) : (
                <FileActionsDropdown file={item as DriveFile} alwaysVisible />
              )}
            </div>
          </div>

          {/* Card Body / Preview */}
          <div className='aspect-[4/3] w-full bg-slate-50/50 dark:bg-[#111] flex items-center justify-center border-t dark:border-[#2A2A2A] overflow-hidden relative'>
            <FilePreview item={item} layout='grid-full' />
          </div>
        </div>
      ))}
    </div>
  );
};

export const FileList = ({ items }: { items: DriveItem[] }) => {
  const router = useRouter();
  const { navigationMode } = useSettings();

  const handleItemClick = (item: DriveItem) => {
    if (item.isFolder) {
      const path = (item as DriveFolder).slug || item.id;
      router.push(`${window.location.pathname}/${path}`.replace(/\/+/g, "/"));
    }
  };

  return (
    <div className='w-full bg-white dark:bg-[#1A1A1A] rounded-[24px] border border-slate-200/60 dark:border-[#2A2A2A] overflow-hidden shadow-sm'>
      <div className='grid grid-cols-12 gap-4 px-6 py-4 text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest border-b dark:border-[#2A2A2A] bg-slate-50/50 dark:bg-white/5'>
        <div className='col-span-6'>Name</div>
        <div className='col-span-3 text-center'>Last modified</div>
        <div className='col-span-2 text-center'>Size</div>
        <div className='col-span-1 text-right'>Action</div>
      </div>
      <div className='flex flex-col'>
        {items.map((item) => (
          <div
            key={item.id}
            onClick={() => navigationMode === "single-click" && handleItemClick(item)}
            onDoubleClick={() => navigationMode === "double-click" && handleItemClick(item)}
            className='grid grid-cols-12 gap-4 px-6 py-3 items-center hover:bg-blue-50/30 dark:hover:bg-blue-500/5 transition-colors border-b dark:border-[#2A2A2A] last:border-0 group cursor-pointer'
          >
            <div className='col-span-6 flex items-center gap-3'>
              <FilePreview item={item} layout='list' />
              <span className='truncate font-bold text-slate-700 dark:text-slate-200 text-[14px]' title={item.name}>
                {item.name}
              </span>
            </div>
            <div className='col-span-3 text-[13px] font-medium text-slate-500 dark:text-slate-400 text-center opacity-80'>
              {formatDate(item.updatedAt)}
            </div>
            <div className='col-span-2 text-[13px] font-medium text-slate-500 dark:text-slate-400 text-center opacity-80'>
              {item.isFolder ? "Folder" : formatSize((item as DriveFile).size)}
            </div>
            <div className='col-span-1 flex justify-end' onClick={(e) => e.stopPropagation()} onDoubleClick={(e) => e.stopPropagation()}>
              {item.isFolder ? (
                <FolderActionsDropdown folder={item as DriveFolder} alwaysVisible />
              ) : (
                <FileActionsDropdown file={item as DriveFile} alwaysVisible />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
