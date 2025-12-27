"use client";

import React, { useState, useEffect, useRef } from "react";
import { Search, Command, CornerDownLeft } from "lucide-react";
import { motion } from "motion/react";
import { dashboardRoutes, NavItem } from "@/lib/routes";
import { cn } from "@repo/ui/lib/utils";
import { useRouter } from "next/navigation";

interface CommandSearchProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CommandSearch({ isOpen, onClose }: CommandSearchProps) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { data: session } = useSession();
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const userRole = (session?.user as any)?.role || "USER";

  // Flatten routes for easier searching
  const flattenedRoutes = useMemo(() => {
    const flatten = (items: NavItem[]): NavItem[] => {
      let result: NavItem[] = [];
      items.forEach((item) => {
        if (!item.roles || item.roles.includes(userRole)) {
          if (item.href) result.push({ ...item, children: undefined });
          if (item.children) result = [...result, ...flatten(item.children)];
        }
      });
      return result;
    };
    return flatten(dashboardRoutes);
  }, [userRole]);

  const filteredRoutes = flattenedRoutes.filter((route) => route.title.toLowerCase().includes(query.toLowerCase())).slice(0, 8);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      setQuery("");
      setSelectedIndex(0);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        setSelectedIndex((prev) => (prev + 1) % filteredRoutes.length);
      } else if (e.key === "ArrowUp") {
        setSelectedIndex((prev) => (prev - 1 + filteredRoutes.length) % filteredRoutes.length);
      } else if (e.key === "Enter" && filteredRoutes[selectedIndex]) {
        handleNavigate(filteredRoutes[selectedIndex].href);
      } else if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, filteredRoutes, selectedIndex]);

  const handleNavigate = (href: string) => {
    router.push(href);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-[100] flex items-start justify-center pt-[15vh]'>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className='fixed inset-0 bg-neutral-950/40 backdrop-blur-sm'
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: -20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: -20 }}
        className='relative w-full max-w-2xl bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden mx-4'
      >
        <div className='flex items-center px-4 py-3 border-b border-neutral-100 dark:border-neutral-800'>
          <Search size={20} className='text-neutral-400 mr-3' />
          <input
            ref={inputRef}
            type='text'
            placeholder='Search routes (e.g. Settings, Admin...)'
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            className='flex-1 bg-transparent border-none focus:ring-0 text-neutral-900 dark:text-white placeholder:text-neutral-500 outline-none'
          />
          <div className='flex items-center gap-1 px-1.5 py-0.5 rounded border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-[10px] font-medium text-neutral-400 uppercase'>
            Esc
          </div>
        </div>

        <div className='p-2 max-h-[400px] overflow-y-auto custom-scrollbar'>
          {filteredRoutes.length > 0 ? (
            <div className='space-y-1'>
              {filteredRoutes.map((route, index) => {
                const Icon = route.icon;
                const isSelected = index === selectedIndex;
                return (
                  <div
                    key={route.href + route.title}
                    onMouseEnter={() => setSelectedIndex(index)}
                    onClick={() => handleNavigate(route.href)}
                    className={cn(
                      "flex items-center justify-between px-3 py-2.5 rounded-xl cursor-pointer transition-all",
                      isSelected
                        ? "bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white"
                        : "text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
                    )}
                  >
                    <div className='flex items-center gap-3'>
                      <div
                        className={cn(
                          "p-1.5 rounded-lg bg-white dark:bg-neutral-950 shadow-sm border border-neutral-200 dark:border-neutral-800",
                          isSelected && "border-neutral-300 dark:border-neutral-700"
                        )}
                      >
                        <Icon size={18} />
                      </div>
                      <span className='font-medium'>{route.title}</span>
                    </div>

                    {isSelected && (
                      <div className='flex items-center gap-1 text-[10px] font-medium text-neutral-400 uppercase'>
                        <span>Go to</span>
                        <CornerDownLeft size={10} />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className='p-10 text-center'>
              <div className='w-12 h-12 bg-neutral-100 dark:bg-neutral-800 rounded-full flex items-center justify-center mx-auto mb-4 text-neutral-400'>
                <Search size={24} />
              </div>
              <p className='text-neutral-900 dark:text-white font-medium'>No results found</p>
              <p className='text-sm text-neutral-500 mt-1'>Try searching for something else.</p>
            </div>
          )}
        </div>

        <div className='px-4 py-3 bg-neutral-50 dark:bg-neutral-800/30 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-[11px] text-neutral-400 font-medium'>
          <div className='flex items-center gap-4'>
            <div className='flex items-center gap-1.5'>
              <kbd className='px-1.5 py-0.5 rounded border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 leading-none'>
                ↑
              </kbd>
              <kbd className='px-1.5 py-0.5 rounded border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 leading-none'>
                ↓
              </kbd>
              <span>to navigate</span>
            </div>
            <div className='flex items-center gap-1.5'>
              <kbd className='px-1.5 py-0.5 rounded border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 leading-none'>
                Enter
              </kbd>
              <span>to select</span>
            </div>
          </div>
          <div className='flex items-center gap-1'>
            <Command size={10} />
            <span>K to shortcut</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// Add useMemo to CommandSearch imports
import { useMemo } from "react";
import { useSession } from "@/lib/auth-client";
