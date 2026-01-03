"use client";

import React from "react";
import { Moon, Sun, Monitor, MousePointer2, MousePointer, HardDrive, ShieldCheck, ArrowLeft, Bell } from "lucide-react";
import { useTheme } from "next-themes";
import { useSettings } from "@/hooks/use-settings";
import { Button } from "@repo/ui/components/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@repo/ui/components/card";
import { Separator } from "@repo/ui/components/separator";
import { Label } from "@repo/ui/components/label";
import { useRouter } from "next/navigation";
import { cn } from "@repo/ui/lib/utils";

const SettingsPage = () => {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const settings = useSettings();
  const { navigationMode, uploadLimit, updateSettings, isLoaded } = settings;

  if (!isLoaded) return null;

  const themes = [
    { name: "Light", value: "light", icon: Sun },
    { name: "Dark", value: "dark", icon: Moon },
    { name: "System", value: "system", icon: Monitor },
  ];

  const navigationModes = [
    { name: "Single Click", value: "single-click", icon: MousePointer, description: "Open folders and files with a single click." },
    {
      name: "Double Click",
      value: "double-click",
      icon: MousePointer2,
      description: "Open folders and files with a double click (standard).",
    },
  ];

  return (
    <div className='p-6 max-w-4xl mx-auto space-y-8 duration-500'>
      <div className='flex items-center gap-4'>
        <Button variant='ghost' size='icon' onClick={() => router.back()} className='rounded-full'>
          <ArrowLeft className='w-5 h-5' />
        </Button>
        <div>
          <h1 className='text-3xl font-bold text-slate-900 dark:text-white'>Settings</h1>
          <p className='text-slate-500 dark:text-slate-400'>Manage your personal preferences and account settings.</p>
        </div>
      </div>

      <Separator className='bg-slate-200/60 dark:bg-[#2A2A2A]' />

      <div className='grid gap-8'>
        {/* Appearance Section */}
        <section className='space-y-4'>
          <div className='flex items-center gap-2 text-slate-700 dark:text-slate-200 font-semibold text-lg'>
            <Monitor className='w-5 h-5 text-blue-500' />
            <h2>Appearance</h2>
          </div>
          <Card className='border-slate-200/60 dark:border-[#2A2A2A] bg-white dark:bg-[#1A1A1A] shadow-sm'>
            <CardHeader>
              <CardTitle className='text-base'>Theme Mode</CardTitle>
              <CardDescription>Select your preferred color scheme for the dashboard.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className='grid grid-cols-3 gap-4'>
                {themes.map((t) => (
                  <button
                    key={t.value}
                    onClick={() => setTheme(t.value)}
                    className={`flex flex-col items-center gap-3 p-4 rounded-xl border-2 transition-all ${
                      theme === t.value
                        ? "border-blue-500 bg-blue-50/50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400"
                        : "border-slate-100 dark:border-[#2A2A2A] hover:border-blue-200 dark:hover:border-blue-500/30 text-slate-600 dark:text-slate-400"
                    }`}
                  >
                    <t.icon className='w-6 h-6' />
                    <span className='font-medium text-sm'>{t.name}</span>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Navigation Section */}
        <section className='space-y-4'>
          <div className='flex items-center gap-2 text-slate-700 dark:text-slate-200 font-semibold text-lg'>
            <MousePointer2 className='w-5 h-5 text-purple-500' />
            <h2>Navigation</h2>
          </div>
          <Card className='border-slate-200/60 dark:border-[#2A2A2A] bg-white dark:bg-[#1A1A1A] shadow-sm'>
            <CardHeader>
              <CardTitle className='text-base'>Folder Interaction</CardTitle>
              <CardDescription>Choose how you want to interact with items in your drive.</CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='grid gap-3'>
                {navigationModes.map((mode) => (
                  <button
                    key={mode.value}
                    onClick={() => updateSettings({ navigationMode: mode.value as any })}
                    className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left ${
                      navigationMode === mode.value
                        ? "border-blue-500 bg-blue-50/50 dark:bg-blue-500/10"
                        : "border-slate-100 dark:border-[#2A2A2A] hover:border-blue-200 dark:hover:border-blue-500/30"
                    }`}
                  >
                    <div
                      className={`p-2 rounded-lg ${
                        navigationMode === mode.value ? "bg-blue-500 text-white" : "bg-slate-100 dark:bg-[#2A2A2A] text-slate-500"
                      }`}
                    >
                      <mode.icon className='w-5 h-5' />
                    </div>
                    <div className='flex-1'>
                      <p
                        className={`font-semibold text-sm ${navigationMode === mode.value ? "text-blue-600 dark:text-blue-400" : "text-slate-700 dark:text-slate-200"}`}
                      >
                        {mode.name}
                      </p>
                      <p className='text-xs text-slate-500 dark:text-slate-400'>{mode.description}</p>
                    </div>
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        navigationMode === mode.value ? "border-blue-500 bg-blue-500" : "border-slate-300 dark:border-[#444]"
                      }`}
                    >
                      {navigationMode === mode.value && (
                        <div className='w-2 h-2 rounded-full bg-white transition-all transform scale-100' />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Notification Preferences Section */}
        <section className='space-y-4'>
          <div className='flex items-center gap-2 text-slate-700 dark:text-slate-200 font-semibold text-lg'>
            <Bell className='w-5 h-5 text-rose-500' />
            <h2>Notification Preferences</h2>
          </div>
          <Card className='border-slate-200/60 dark:border-[#2A2A2A] bg-white dark:bg-[#1A1A1A] shadow-sm'>
            <CardHeader>
              <CardTitle className='text-base'>Alert Settings</CardTitle>
              <CardDescription>Choose which actions should trigger a notification.</CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='grid gap-4'>
                {[
                  { label: "File Uploads", key: "notifyUpload", description: "Get notified when a file is successfully uploaded." },
                  { label: "Folder Creation", key: "notifyFolderCreate", description: "Get notified when a new folder is created." },
                  { label: "Deletions", key: "notifyDelete", description: "Get notified when files or folders are deleted." },
                  { label: "Edits & Renames", key: "notifyEdit", description: "Get notified when items are renamed or modified." },
                ].map((pref) => (
                  <div
                    key={pref.key}
                    className='flex items-center justify-between p-4 rounded-xl border border-slate-100 dark:border-[#2A2A2A] bg-slate-50/30 dark:bg-white/5'
                  >
                    <div className='space-y-0.5'>
                      <Label className='text-sm font-bold text-slate-900 dark:text-white'>{pref.label}</Label>
                      <p className='text-xs text-slate-500 dark:text-slate-400'>{pref.description}</p>
                    </div>
                    <button
                      onClick={() => updateSettings({ [pref.key]: !(settings as any)[pref.key] })}
                      className={cn(
                        "relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
                        (settings as any)[pref.key] ? "bg-blue-600" : "bg-slate-200 dark:bg-[#333]"
                      )}
                    >
                      <span
                        className={cn(
                          "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                          (settings as any)[pref.key] ? "translate-x-6" : "translate-x-1"
                        )}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default SettingsPage;
