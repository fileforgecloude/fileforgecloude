import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { SidebarProvider } from "@/components/dashboard/SidebarContext";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className='flex min-h-screen bg-neutral-50 dark:bg-neutral-950 transition-colors'>
        <Sidebar />
        <div className='flex-1 flex flex-col min-w-0'>
          <Header />
          <main className='flex-1 p-6 overflow-y-auto custom-scrollbar'>{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
