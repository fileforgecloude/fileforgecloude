import {
  LayoutDashboard,
  Folder,
  Trash2,
  Star,
  FileText,
  UploadCloud,
  Users,
  Settings,
  Clock,
  User,
} from "lucide-react";

export interface NavItem {
  title: string;
  href: string;
  icon: any;
  roles?: string[];
}

export const dashboardRoutes: NavItem[] = [
  {
    title: "Overview",
    href: "/dashboard",
    icon: LayoutDashboard,
    roles: ["USER", "ADMIN"],
  },
  {
    title: "My Files",
    href: "/dashboard/files",
    icon: Folder,
    roles: ["USER", "ADMIN"],
  },
  {
    title: "Recent",
    href: "/dashboard/files/recent",
    icon: Clock,
    roles: ["USER", "ADMIN"],
  },
  {
    title: "Starred",
    href: "/dashboard/files/starred",
    icon: Star,
    roles: ["USER", "ADMIN"],
  },
  {
    title: "Uploads",
    href: "/dashboard/files/uploads",
    icon: UploadCloud,
    roles: ["USER", "ADMIN"],
  },
  {
    title: "Trash",
    href: "/dashboard/files/trash",
    icon: Trash2,
    roles: ["USER", "ADMIN"],
  },
  {
    title: "Shared with Me",
    href: "/dashboard/shared",
    icon: Users,
    roles: ["USER", "ADMIN"],
  },
  {
    title: "All Users",
    href: "/dashboard/admin/users",
    icon: Users,
    roles: ["ADMIN"],
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
    roles: ["USER", "ADMIN"],
  },
];
