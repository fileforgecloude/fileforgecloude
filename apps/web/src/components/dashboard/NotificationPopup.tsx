"use client";

import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { Bell, Check, Info, AlertTriangle, AlertCircle, X, Trash2 } from "lucide-react";
import { cn } from "@repo/ui/lib/utils";
import {
  useNotifications,
  useMarkAsRead,
  useMarkAllAsRead,
  useDeleteNotification,
  useClearAll,
} from "@/react-query/notifications/notification-actions";
import { useSession } from "@/lib/auth-client";

const timeAgo = (date: Date) => {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + "y ago";
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + "mo ago";
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + "d ago";
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + "h ago";
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + "m ago";
  return Math.floor(seconds) + "s ago";
};

const icons = {
  INFO: <Info size={16} className='text-blue-500' />,
  SUCCESS: <Check size={16} className='text-emerald-500' />,
  WARNING: <AlertTriangle size={16} className='text-amber-500' />,
  ERROR: <AlertCircle size={16} className='text-red-500' />,
};

export function NotificationPopup() {
  const { data: session } = useSession();
  const userId = session?.user?.id || "";

  const { data: notifications = [], isLoading } = useNotifications(userId);
  const markAsReadMutation = useMarkAsRead();
  const markAllAsReadMutation = useMarkAllAsRead();
  const deleteNotificationMutation = useDeleteNotification();
  const clearAllMutation = useClearAll();

  const handleMarkAsRead = (id: string) => {
    markAsReadMutation.mutate({ id, userId });
  };

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    deleteNotificationMutation.mutate({ id, userId });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.95 }}
      transition={{ type: "spring", damping: 20, stiffness: 300 }}
      className='absolute right-0 mt-2 w-80 sm:w-96 bg-white dark:bg-[#1A1A1A] rounded-2xl border border-slate-200 dark:border-[#2A2A2A] shadow-2xl overflow-hidden z-50 transition-colors duration-300'
    >
      <div className='p-4 border-b border-slate-100 dark:border-[#2A2A2A] flex items-center justify-between bg-slate-50/50 dark:bg-white/5'>
        <h3 className='font-bold text-slate-900 dark:text-white flex items-center gap-2'>
          <Bell size={18} className='text-blue-500' />
          Notifications
          {notifications.some((n: any) => !n.read) && <span className='w-2 h-2 bg-blue-600 rounded-full animate-pulse' />}
        </h3>
        <div className='flex gap-3'>
          <button
            onClick={() => markAllAsReadMutation.mutate(userId)}
            className='text-xs text-blue-600 dark:text-blue-400 font-bold hover:underline transition-all'
            disabled={!notifications.some((n: any) => !n.read)}
          >
            Mark all read
          </button>
          <button
            onClick={() => clearAllMutation.mutate(userId)}
            className='text-xs text-rose-500 hover:text-rose-600 font-bold flex items-center gap-1 transition-all'
            disabled={notifications.length === 0}
          >
            <Trash2 size={12} />
            Clear all
          </button>
        </div>
      </div>

      <div className='max-h-[400px] overflow-y-auto custom-scrollbar'>
        <AnimatePresence mode='popLayout'>
          {notifications.length > 0 ? (
            <div className='divide-y divide-slate-100 dark:divide-[#2A2A2A]'>
              {notifications.map((notification: any) => (
                <motion.div
                  key={notification.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, x: -20 }}
                  onClick={() => !notification.read && handleMarkAsRead(notification.id)}
                  className={cn(
                    "p-4 hover:bg-blue-50/30 dark:hover:bg-blue-500/5 transition-all cursor-pointer relative group",
                    !notification.read && "bg-blue-50/40 dark:bg-blue-900/10"
                  )}
                >
                  <div className='flex gap-3'>
                    <div className='mt-0.5 w-10 h-10 rounded-xl bg-slate-100 dark:bg-[#222] flex items-center justify-center shrink-0 border border-slate-200/50 dark:border-white/5'>
                      {icons[notification.type as keyof typeof icons]}
                    </div>
                    <div className='flex-1 min-w-0'>
                      <div className='flex justify-between items-start gap-2'>
                        <p
                          className={cn(
                            "text-sm truncate",
                            notification.read
                              ? "font-medium text-slate-600 dark:text-slate-400"
                              : "font-bold text-slate-900 dark:text-white"
                          )}
                        >
                          {notification.title}
                        </p>
                        <button
                          onClick={(e) => handleDelete(e, notification.id)}
                          className='opacity-0 group-hover:opacity-100 p-1 hover:bg-slate-200 dark:hover:bg-[#333] rounded-md transition-all text-slate-400 hover:text-rose-500'
                        >
                          <X size={14} />
                        </button>
                      </div>
                      <p className='text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed'>{notification.message}</p>
                      <p className='text-[10px] text-slate-400 dark:text-slate-500 mt-2 font-medium'>
                        {timeAgo(new Date(notification.createdAt))}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className='p-12 text-center'>
              <div className='w-16 h-16 bg-slate-100 dark:bg-[#222] rounded-2xl flex items-center justify-center mx-auto mb-4 text-slate-300 dark:text-slate-700 border border-slate-200/50 dark:border-white/5'>
                <Bell size={32} />
              </div>
              <p className='text-slate-900 dark:text-white font-bold'>All caught up!</p>
              <p className='text-xs text-slate-500 dark:text-slate-400 mt-2'>
                {isLoading ? "Fetching your notifications..." : "No new notifications yet."}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className='p-3 border-t border-slate-100 dark:border-[#2A2A2A] text-center bg-slate-50/30 dark:bg-white/5'>
        <button className='text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors uppercase tracking-widest'>
          Notification Center
        </button>
      </div>
    </motion.div>
  );
}
