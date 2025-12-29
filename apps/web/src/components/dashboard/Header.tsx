"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  User,
  LogOut,
  Settings,
  ChevronDown,
  Search,
  Bell,
  Sun,
  Moon,
  Command,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";
import { DashboardBreadcrumb } from "./Breadcrumb";
import { NotificationPopup } from "./NotificationPopup";
import { CommandSearch } from "./CommandSearch";
import { useSession, authClient } from "../../lib/auth-client";
import { useSidebar } from "./SidebarContext";
import { cn } from "@repo/ui/lib/utils";
import { motion, AnimatePresence } from "motion/react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { theme as customTheme } from "@/theme/theme";

const UserMenu = ({ user }: { user: any }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/");
          router.refresh();
        },
      },
    });
  };

  const menuItems = [
    { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard", color: "text-blue-600 dark:text-blue-400" },
    { label: "Profile", icon: User, href: "/profile", color: "text-purple-600 dark:text-purple-400" },
    { label: "Settings", icon: Settings, href: "/settings", color: "text-amber-600 dark:text-amber-400" },
  ];

  return (
    <div className='relative' ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='flex items-center gap-2 p-1.5 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all outline-none group border border-transparent hover:border-neutral-200 dark:hover:border-neutral-700'
      >
        <div className='w-8 h-8 rounded-lg bg-neutral-900 dark:bg-white flex items-center justify-center text-white dark:text-neutral-950 overflow-hidden shadow-sm group-hover:scale-105 transition-transform'>
          {user.image ? (
            <img src={user.image} alt={user.name} className='w-full h-full object-cover' />
          ) : (
            <span className='font-bold text-xs'>{user.name?.charAt(0).toUpperCase()}</span>
          )}
        </div>
        <div className='hidden sm:flex flex-col items-start text-left'>
          <span className='text-sm font-semibold text-neutral-900 dark:text-white leading-none'>{user.name}</span>
          <span className='text-[10px] text-neutral-500 dark:text-neutral-400 mt-0.5 capitalize'>{user.role || "User"}</span>
        </div>
        <ChevronDown size={14} className={cn("text-neutral-400 transition-transform duration-300", isOpen && "rotate-180")} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className='absolute right-0 mt-2 w-64 bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-xl overflow-hidden z-50'
          >
            <div className='p-4 border-b border-neutral-100 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-800/30'>
              <p className='text-sm font-bold text-neutral-900 dark:text-white truncate'>{user.name}</p>
              <p className='text-xs text-neutral-500 dark:text-neutral-400 truncate mt-0.5'>{user.email}</p>
            </div>

            <div className='p-1.5 space-y-0.5'>
              {menuItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className='flex items-center gap-3 p-2.5 rounded-xl hover:bg-neutral-50 dark:hover:bg-neutral-800/50 text-neutral-700 dark:text-neutral-300 font-medium transition-all group'
                >
                  <div
                    className={cn(
                      "p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 group-hover:scale-110 transition-transform",
                      item.color
                    )}
                  >
                    <item.icon size={18} />
                  </div>
                  <span className='text-sm'>{item.label}</span>
                </Link>
              ))}
            </div>

            <div className='p-1.5 border-t border-neutral-100 dark:border-neutral-800'>
              <button
                onClick={handleSignOut}
                className='w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-red-50 dark:hover:bg-red-500/10 text-red-600 dark:text-red-400 font-medium transition-all group'
              >
                <div className='p-2 bg-red-100 dark:bg-red-500/20 rounded-lg group-hover:scale-110 transition-transform'>
                  <LogOut size={18} />
                </div>
                <span className='text-sm'>Sign out</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export function Header() {
  const { data: session } = useSession();
  const { theme, setTheme } = useTheme();
  const { isCollapsed, toggleSidebar } = useSidebar();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setShowSearch(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className={cn("h-16 flex items-center justify-between px-6 sticky top-0 z-30 transition-colors", customTheme.dashboard_body)}>
      <div className='flex items-center gap-4'>
        {/* Sidebar Toggle (Desktop only) */}
        <button
          onClick={toggleSidebar}
          className='hidden lg:flex p-2 text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-xl transition-colors hover:text-neutral-900 dark:hover:text-white'
          title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? <PanelLeftOpen size={20} /> : <PanelLeftClose size={20} />}
        </button>
        <DashboardBreadcrumb />
      </div>

      <div className='flex items-center gap-4'>
        {/* Search Trigger */}
        <button
          onClick={() => setShowSearch(true)}
          className='hidden md:flex items-center bg-neutral-100 dark:bg-neutral-900 rounded-xl px-4 py-2 border border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 transition-all group'
        >
          <Search size={18} className='text-neutral-500 group-hover:text-neutral-900 dark:group-hover:text-white' />
          <span className='text-sm ml-3 text-neutral-500 mr-8'>Search dashboard...</span>
          <div className='flex items-center gap-1 px-1.5 py-0.5 rounded border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-[10px] font-medium text-neutral-400'>
            <Command size={10} />
            <span>K</span>
          </div>
        </button>

        {/* Mobile Search Button */}
        <button
          onClick={() => setShowSearch(true)}
          className='md:hidden p-2.5 text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-xl transition-colors'
        >
          <Search size={20} />
        </button>

        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className='p-2.5 text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-xl transition-colors'
        >
          {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <div className='relative' ref={notificationRef}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className={cn(
              "p-2.5 text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-xl transition-colors relative",
              showNotifications && "bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white"
            )}
          >
            <Bell size={20} />
            <span className='absolute top-3 right-3 w-2 h-2 bg-blue-600 rounded-full border-2 border-white dark:border-neutral-950 shadow-sm' />
          </button>
          <AnimatePresence>{showNotifications && <NotificationPopup />}</AnimatePresence>
        </div>

        <div className='pl-4 border-l border-neutral-200 dark:border-neutral-800'>{session?.user && <UserMenu user={session.user} />}</div>
      </div>

      <AnimatePresence>{showSearch && <CommandSearch isOpen={showSearch} onClose={() => setShowSearch(false)} />}</AnimatePresence>
    </header>
  );
}
