"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut, Menu, ChevronDown } from "lucide-react";
import { dashboardRoutes, NavItem } from "../../lib/routes";
import { useSession, signOut } from "../../lib/auth-client";
import { cn } from "@repo/ui/lib/utils";
import { motion, AnimatePresence } from "motion/react";
import { Drawer } from "vaul";
import { useSidebar } from "./SidebarContext";
import { theme } from "@/theme/theme";

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const { isCollapsed } = useSidebar();
  const [openMenus, setOpenMenus] = useState<string[]>([]);
  const pathname = usePathname();
  const { data: session } = useSession();

  const userRole = (session?.user as any)?.role || "USER";

  const filteredRoutes = useMemo(() => dashboardRoutes.filter((route) => !route.roles || route.roles.includes(userRole)), [userRole]);

  useEffect(() => {
    if (isCollapsed) {
      setOpenMenus([]);
      return;
    }
    const activeParent = filteredRoutes.find((route) => route.children?.some((child) => pathname === child.href));
    if (activeParent && !openMenus.includes(activeParent.title)) {
      setOpenMenus((prev) => [...prev, activeParent.title]);
    }
  }, [pathname, filteredRoutes, isCollapsed]);

  const toggleMenu = (title: string, forcePopup: boolean = false) => {
    if (isCollapsed && !forcePopup) return;
    setOpenMenus((prev) => (prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title]));
  };

  const NavLink = ({ item, isChild = false, onNavigate }: { item: NavItem; isChild?: boolean; onNavigate?: () => void }) => {
    const isExactlyActive = pathname === item.href;
    const Icon = item.icon;
    const hasChildren = item.children && item.children.length > 0;
    const isOpen = openMenus.includes(item.title);

    const [isHovered, setIsHovered] = useState(false);
    const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const handleMouseEnter = () => {
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
      setIsHovered(true);
    };

    const handleMouseLeave = () => {
      hoverTimeoutRef.current = setTimeout(() => {
        setIsHovered(false);
      }, 100);
    };

    const content = (
      <div
        className={cn(
          "flex items-center transition-all group relative cursor-pointer",
          isCollapsed ? "justify-center p-2 rounded-xl" : "gap-3 px-3 py-2 rounded-lg",
          isExactlyActive
            ? "bg-neutral-900 text-white shadow-sm dark:bg-white dark:text-neutral-950"
            : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-white"
        )}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={() => hasChildren && !isCollapsed && toggleMenu(item.title)}
      >
        <Icon
          size={isChild ? 16 : 18}
          className={cn(isExactlyActive ? "text-inherit" : "text-neutral-500 group-hover:text-neutral-900 dark:group-hover:text-white")}
        />

        {!isCollapsed && <span className={cn("font-medium truncate flex-1", isChild ? "text-sm" : "text-sm")}>{item.title}</span>}

        {hasChildren && !isCollapsed && (
          <motion.div animate={{ rotate: isOpen ? 180 : 0 }} className='text-neutral-400'>
            <ChevronDown size={14} />
          </motion.div>
        )}

        {/* Collapsed Popup / Tooltip */}
        <AnimatePresence>
          {isCollapsed && isHovered && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className='fixed left-[70px] ml-2 z-[60]'
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <div className='bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl shadow-2xl p-1.5 min-w-[200px]'>
                <div className='px-3 py-2 border-b border-neutral-100 dark:border-neutral-800 mb-1'>
                  <span className='text-sm font-bold text-neutral-900 dark:text-white'>{item.title}</span>
                </div>
                {hasChildren ? (
                  <div className='flex flex-col gap-0.5'>
                    {item.children?.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={() => {
                          onNavigate?.();
                          setIsHovered(false);
                        }}
                        className={cn(
                          "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all",
                          pathname === child.href
                            ? "bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white"
                            : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 hover:text-neutral-900 dark:hover:text-white"
                        )}
                      >
                        <child.icon size={14} />
                        {child.title}
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className='px-3 py-1'>
                    <p className='text-[10px] text-neutral-400 uppercase font-medium'>Link</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );

    return (
      <div className='space-y-0.5'>
        {item.href && !hasChildren ? (
          <Link href={item.href} onClick={onNavigate} prefetch={true}>
            {content}
          </Link>
        ) : (
          content
        )}

        <AnimatePresence initial={false}>
          {hasChildren && isOpen && !isCollapsed && (
            <motion.div
              key={item.title}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className='overflow-hidden'
            >
              <div className='ml-5 mt-1 pl-2 border-l border-neutral-200 dark:border-neutral-800 flex flex-col space-y-0.5'>
                {item.children?.map((child) => (
                  <NavLink key={child.href} item={child} isChild={true} onNavigate={onNavigate} />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  const SidebarContent = ({ onNavigate }: { onNavigate?: () => void }) => (
    <div className={cn("flex flex-col h-full overflow-x-hidden", theme.dashboard_body)}>
      <div
        className={cn(
          "h-16 flex items-center px-6 border-b border-neutral-100 dark:border-neutral-900",
          isCollapsed ? "justify-center" : "justify-start"
        )}
      >
        <Link href='/' className='flex items-center gap-3' onClick={onNavigate}>
          <div className='w-8 h-8 bg-neutral-900 dark:bg-white rounded-lg flex items-center justify-center shrink-0'>
            <span className='text-white dark:text-neutral-950 font-bold text-lg'>F</span>
          </div>
          {!isCollapsed && <span className='font-bold text-neutral-900 dark:text-white text-lg tracking-tight truncate'>File Forge</span>}
        </Link>
      </div>

      <nav className={cn("flex-1 overflow-y-auto pt-6 px-4 space-y-1.5 custom-scrollbar overflow-x-hidden", isCollapsed && "px-3")}>
        {filteredRoutes.map((route) => (
          <NavLink key={route.title} item={route} onNavigate={onNavigate} />
        ))}
      </nav>

      <div className={cn("p-4 mt-auto border-t border-neutral-100 dark:border-neutral-800 flex flex-col gap-1", isCollapsed && "px-3")}>
        <button
          onClick={() => {
            signOut();
            onNavigate?.();
          }}
          className={cn(
            "flex items-center rounded-lg text-neutral-500 hover:bg-red-50 dark:hover:bg-red-950/30 hover:text-red-600 dark:hover:text-red-400 transition-all group relative",
            isCollapsed ? "justify-center p-2" : "gap-3 px-3 py-2"
          )}
        >
          <LogOut size={18} className='group-hover:text-red-600 dark:group-hover:text-red-400 shrink-0' />
          {!isCollapsed && <span className='font-medium text-sm'>Log out</span>}
        </button>
      </div>
    </div>
  );

  return (
    <>
      <div className='lg:hidden fixed bottom-6 right-6 z-50'>
        <Drawer.Root direction='left'>
          <Drawer.Trigger asChild>
            <button className='p-4 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-2xl shadow-2xl active:scale-95 transition-transform flex items-center justify-center'>
              <Menu size={24} />
            </button>
          </Drawer.Trigger>
          <Drawer.Portal>
            <Drawer.Overlay className='fixed inset-0 bg-black/40 dark:bg-black/60 z-50 backdrop-blur-[2px]' />
            <Drawer.Content className='bg-white dark:bg-[#131313] flex flex-col rounded-r-2xl h-full w-[75vw] fixed bottom-0 left-0 z-50 outline-none'>
              <SidebarContent onNavigate={() => {}} />
            </Drawer.Content>
          </Drawer.Portal>
        </Drawer.Root>
      </div>

      <motion.aside
        initial={false}
        animate={isCollapsed ? "collapsed" : "expanded"}
        variants={{
          expanded: { width: "260px" },
          collapsed: { width: "70px" },
        }}
        transition={{ type: "spring", damping: 25, stiffness: 120 }}
        className={cn("fixed top-0 left-0 z-40 h-screen bg-white dark:bg-[#131313] flex-col hidden lg:flex overflow-x-hidden", className)}
      >
        <SidebarContent />
      </motion.aside>

      <div className='hidden lg:block shrink-0 transition-all duration-300' style={{ width: isCollapsed ? "70px" : "260px" }} />
    </>
  );
}
