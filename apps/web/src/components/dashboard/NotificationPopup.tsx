"use client";

import React from "react";
import { motion } from "motion/react";
import { Bell, Check, Info, AlertTriangle, AlertCircle, X } from "lucide-react";
import { cn } from "@repo/ui/lib/utils";

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  type: "info" | "success" | "warning" | "error";
  read: boolean;
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    title: "Upload Successful",
    message: "Your file 'project_blueprint.pdf' has been uploaded.",
    time: "2 mins ago",
    type: "success",
    read: false,
  },
  {
    id: "2",
    title: "Storage Limit",
    message: "You have used 80% of your storage capacity.",
    time: "1 hour ago",
    type: "warning",
    read: false,
  },
  {
    id: "3",
    title: "New Login",
    message: "New login detected from a Chrome browser on Linux.",
    time: "5 hours ago",
    type: "info",
    read: true,
  },
];

const icons = {
  info: <Info size={16} className='text-blue-500' />,
  success: <Check size={16} className='text-emerald-500' />,
  warning: <AlertTriangle size={16} className='text-amber-500' />,
  error: <AlertCircle size={16} className='text-red-500' />,
};

export function NotificationPopup() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.95 }}
      transition={{ type: "spring", damping: 20, stiffness: 300 }}
      className='absolute right-0 mt-2 w-80 sm:w-96 bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-2xl overflow-hidden z-50'
    >
      <div className='p-4 border-b border-neutral-100 dark:border-neutral-800 flex items-center justify-between bg-neutral-50/50 dark:bg-neutral-800/30'>
        <h3 className='font-bold text-neutral-900 dark:text-white flex items-center gap-2'>
          <Bell size={18} />
          Notifications
        </h3>
        <button className='text-xs text-blue-600 dark:text-blue-400 font-medium hover:underline'>Mark all as read</button>
      </div>

      <div className='max-h-[400px] overflow-y-auto custom-scrollbar'>
        {mockNotifications.length > 0 ? (
          <div className='divide-y divide-neutral-100 dark:divide-neutral-800'>
            {mockNotifications.map((notification) => (
              <div
                key={notification.id}
                className={cn(
                  "p-4 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors cursor-pointer relative group",
                  !notification.read && "bg-blue-50/30 dark:bg-blue-900/10"
                )}
              >
                {!notification.read && <div className='absolute top-4 right-4 w-2 h-2 bg-blue-600 rounded-full' />}
                <div className='flex gap-3'>
                  <div className='mt-0.5 w-8 h-8 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center shrink-0'>
                    {icons[notification.type]}
                  </div>
                  <div className='flex-1 min-w-0'>
                    <p className='text-sm font-semibold text-neutral-900 dark:text-white truncate'>{notification.title}</p>
                    <p className='text-xs text-neutral-500 dark:text-neutral-400 mt-1 line-clamp-2'>{notification.message}</p>
                    <p className='text-[10px] text-neutral-400 mt-2'>{notification.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className='p-10 text-center'>
            <div className='w-12 h-12 bg-neutral-100 dark:bg-neutral-800 rounded-full flex items-center justify-center mx-auto mb-4 text-neutral-400'>
              <Bell size={24} />
            </div>
            <p className='text-neutral-900 dark:text-white font-medium'>No notifications yet</p>
            <p className='text-sm text-neutral-500 mt-1'>We'll let you know when something happens.</p>
          </div>
        )}
      </div>

      <div className='p-3 border-t border-neutral-100 dark:border-neutral-800 text-center'>
        <button className='text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors'>
          View all notifications
        </button>
      </div>
    </motion.div>
  );
}
