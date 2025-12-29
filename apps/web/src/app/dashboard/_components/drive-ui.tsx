"use client";

import React from "react";
import { Cloud, File, Folder, Grid, List, Plus, Search, Settings, Star, Trash2, Clock, HardDrive } from "lucide-react";
import { Button } from "@repo/ui/components/button";
import { Input } from "@repo/ui/components/input";

export const DriveSidebar = ({ onNewClick }: { onNewClick: () => void }) => {
  const menuItems = [
    { icon: HardDrive, label: "My Drive", active: true },
    { icon: Clock, label: "Recent", active: false },
    { icon: Star, label: "Starred", active: false },
    { icon: Trash2, label: "Trash", active: false },
  ];

  return (
    <div className='w-64 h-full bg-white dark:bg-[#131313] p-4 flex flex-col gap-6 transition-colors duration-300'>
      <div className='flex items-center gap-2 px-3 text-xl font-semibold text-slate-800 dark:text-slate-100'>
        <HardDrive className='w-8 h-8 text-blue-600 dark:text-blue-400' />
        <span>FileForge</span>
      </div>

      <Button
        onClick={onNewClick}
        className='w-32 bg-white dark:bg-[#1E1E1E] text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-[#2A2A2A] border dark:border-[#333] shadow-sm flex items-center justify-center gap-3 h-14 rounded-2xl transition-all font-semibold'
      >
        <Plus className='w-6 h-6 text-blue-600 dark:text-blue-400' />
        <span>New</span>
      </Button>

      <nav className='flex-1'>
        <ul className='space-y-1'>
          {menuItems.map((item) => (
            <li key={item.label}>
              <button
                className={`w-full flex items-center gap-4 px-4 py-2.5 rounded-full text-sm font-medium transition-all ${
                  item.active
                    ? "bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300"
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-[#1E1E1E]"
                }`}
              >
                <item.icon className={`w-5 h-5 ${item.active ? "text-blue-700 dark:text-blue-300" : ""}`} />
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className='mt-auto px-4 pb-4'>
        <div className='flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 mb-2'>
          <Cloud className='w-4 h-4' />
          <span>Storage</span>
        </div>
        <div className='w-full bg-slate-200 dark:bg-[#2A2A2A] h-1.5 rounded-full overflow-hidden'>
          <div className='bg-blue-600 dark:bg-blue-400 h-full w-[20%] transition-all' />
        </div>
        <p className='text-xs text-slate-500 dark:text-slate-500 mt-2'>3.2 GB of 15 GB used</p>
      </div>
    </div>
  );
};

export const DriveHeader = () => {
  return (
    <header className='h-16 flex items-center px-6 bg-white dark:bg-[#131313] gap-4 transition-colors duration-300'>
      <div className='flex-1 max-w-2xl relative'>
        <Search className='absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 dark:text-slate-500' />
        <Input
          className='w-full bg-slate-100 dark:bg-[#1E1E1E] border-none pl-12 h-12 rounded-full focus-visible:ring-2 focus-visible:ring-blue-500 transition-all font-medium text-slate-800 dark:text-slate-200 placeholder:text-slate-500'
          placeholder='Search in Drive'
        />
      </div>
      <div className='flex items-center gap-2'>
        <Button variant='ghost' size='icon' className='rounded-full hover:bg-slate-100 dark:hover:bg-[#1E1E1E]'>
          <Settings className='w-5 h-5 text-slate-600 dark:text-slate-400' />
        </Button>
      </div>
    </header>
  );
};
