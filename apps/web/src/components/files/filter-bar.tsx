"use client";

import React from "react";
import { LayoutGrid, List as ListIcon, Filter, ChevronDown, Clock, Tag } from "lucide-react";
import { Button } from "@repo/ui/components/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@repo/ui/components/dropdown-menu";

interface FilterBarProps {
  view: "grid" | "list";
  onViewChange: (view: "grid" | "list") => void;
  filterType: string;
  onFilterTypeChange: (type: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
}

export const FilterBar = ({ view, onViewChange, filterType, onFilterTypeChange, sortBy, onSortChange }: FilterBarProps) => {
  return (
    <div className='flex items-center justify-between py-2 mb-4 border-b dark:border-[#333]'>
      <div className='flex items-center gap-2'>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant='ghost'
              size='sm'
              className='h-9 gap-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5'
            >
              <Tag className='w-4 h-4' />
              <span>Type: {filterType || "All"}</span>
              <ChevronDown className='w-3 h-3' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className='rounded-xl dark:bg-[#1E1E1E] border-slate-200 dark:border-[#333]'>
            <DropdownMenuItem onClick={() => onFilterTypeChange("")}>All Types</DropdownMenuItem>
            <DropdownMenuItem onClick={() => onFilterTypeChange("image")}>Images</DropdownMenuItem>
            <DropdownMenuItem onClick={() => onFilterTypeChange("pdf")}>PDFs</DropdownMenuItem>
            <DropdownMenuItem onClick={() => onFilterTypeChange("code")}>Code</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant='ghost'
              size='sm'
              className='h-9 gap-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5'
            >
              <Clock className='w-4 h-4' />
              <span>Sort: {sortBy === "name" ? "Name" : "Last modified"}</span>
              <ChevronDown className='w-3 h-3' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className='rounded-xl dark:bg-[#1E1E1E] border-slate-200 dark:border-[#333]'>
            <DropdownMenuItem onClick={() => onSortChange("modified")}>Last modified</DropdownMenuItem>
            <DropdownMenuItem onClick={() => onSortChange("name")}>Name</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className='flex items-center gap-1 bg-slate-100/50 dark:bg-[#131313]/50 p-1 rounded-xl'>
        <Button
          variant='ghost'
          size='sm'
          className={`h-8 w-8 p-0 rounded-lg transition-all ${view === "grid" ? "bg-white dark:bg-white/10 shadow-sm text-blue-600 dark:text-blue-400" : "text-slate-500"}`}
          onClick={() => onViewChange("grid")}
        >
          <LayoutGrid className='w-4 h-4' />
        </Button>
        <Button
          variant='ghost'
          size='sm'
          className={`h-8 w-8 p-0 rounded-lg transition-all ${view === "list" ? "bg-white dark:bg-white/10 shadow-sm text-blue-600 dark:text-blue-400" : "text-slate-500"}`}
          onClick={() => onViewChange("list")}
        >
          <ListIcon className='w-4 h-4' />
        </Button>
      </div>
    </div>
  );
};
