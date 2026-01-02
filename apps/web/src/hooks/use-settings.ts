"use client";

import { useState, useEffect } from "react";

export type NavigationMode = "single-click" | "double-click";

interface Settings {
  navigationMode: NavigationMode;
  uploadLimit: number; // in GB
  notifyUpload: boolean;
  notifyFolderCreate: boolean;
  notifyDelete: boolean;
  notifyEdit: boolean;
}

const DEFAULT_SETTINGS: Settings = {
  navigationMode: "double-click",
  uploadLimit: 2,
  notifyUpload: true,
  notifyFolderCreate: true,
  notifyDelete: true,
  notifyEdit: true,
};

export const useSettings = () => {
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("forge-settings");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          setSettings({ ...DEFAULT_SETTINGS, ...parsed });
        } catch (e) {
          console.error("Failed to parse settings", e);
        }
      }
      setIsLoaded(true);
    }
  }, []);

  const updateSettings = (newSettings: Partial<Settings>) => {
    setSettings((prev) => {
      const updated = { ...prev, ...newSettings };
      if (typeof window !== "undefined") {
        localStorage.setItem("forge-settings", JSON.stringify(updated));
      }
      return updated;
    });
  };

  return {
    ...settings,
    updateSettings,
    isLoaded,
  };
};
