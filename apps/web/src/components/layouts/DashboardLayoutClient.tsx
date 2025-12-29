"use client";

import { usePathname } from "next/navigation";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";

export function DashboardLayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHomePage = pathname === "/dashboard";

  return (
    <div className='flex h-screen bg-white dark:bg-[#131313] transition-colors duration-300 overflow-hidden'>
      {!isHomePage && <Sidebar />}
      <div className='flex-1 flex flex-col min-w-0 overflow-hidden'>
        <Header />
        <main className='flex-1 px-4 pb-4 overflow-hidden flex flex-col'>
          <div className='flex-1 overflow-y-auto bg-slate-50 dark:bg-[#1E1E1E] rounded-[32px] border border-slate-200 dark:border-[#333] shadow-sm transition-colors duration-300 custom-scrollbar'>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
