"use client";

import React from "react";

export const GridSkeleton = () => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6'>
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className='bg-white dark:bg-[#1A1A1A] border border-slate-200/60 dark:border-[#2A2A2A] rounded-[24px] p-4 animate-pulse'
        >
          <div className='flex items-center justify-between mb-4'>
            <div className='p-3 bg-slate-100 dark:bg-white/5 rounded-2xl w-16 h-16' />
            <div className='h-8 w-8 rounded-full bg-slate-100 dark:bg-white/5' />
          </div>
          <div className='h-5 bg-slate-100 dark:bg-white/5 rounded-lg w-3/4 mb-3' />
          <div className='flex items-center justify-between'>
            <div className='h-3 bg-slate-100 dark:bg-white/5 rounded-lg w-1/4' />
            <div className='h-3 bg-slate-100 dark:bg-white/5 rounded-lg w-1/4' />
          </div>
        </div>
      ))}
    </div>
  );
};

export const ListSkeleton = () => {
  return (
    <div className='w-full bg-white dark:bg-[#1A1A1A] rounded-[24px] border border-slate-200/60 dark:border-[#2A2A2A] overflow-hidden shadow-sm animate-pulse'>
      <div className='grid grid-cols-12 gap-4 px-6 py-4 border-b dark:border-[#2A2A2A] bg-slate-50/50 dark:bg-white/2'>
        <div className='col-span-6 h-3 bg-slate-200 dark:bg-white/5 rounded-full w-24' />
        <div className='col-span-3 h-3 bg-slate-200 dark:bg-white/5 rounded-full w-24 mx-auto' />
        <div className='col-span-2 h-3 bg-slate-200 dark:bg-white/5 rounded-full w-16 mx-auto' />
        <div className='col-span-1 h-3 bg-slate-200 dark:bg-white/5 rounded-full w-8 ml-auto' />
      </div>
      <div className='flex flex-col'>
        {[...Array(6)].map((_, i) => (
          <div key={i} className='grid grid-cols-12 gap-4 px-6 py-5 items-center border-b dark:border-[#2A2A2A] last:border-0'>
            <div className='col-span-6 flex items-center gap-3'>
              <div className='w-10 h-10 bg-slate-100 dark:bg-white/5 rounded-lg' />
              <div className='h-4 bg-slate-100 dark:bg-white/5 rounded-lg w-40' />
            </div>
            <div className='col-span-3 flex justify-center'>
              <div className='h-3 bg-slate-100 dark:bg-white/5 rounded-lg w-24' />
            </div>
            <div className='col-span-2 flex justify-center'>
              <div className='h-3 bg-slate-100 dark:bg-white/5 rounded-lg w-16' />
            </div>
            <div className='col-span-1 flex justify-end'>
              <div className='w-8 h-8 bg-slate-100 dark:bg-white/5 rounded-full' />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
