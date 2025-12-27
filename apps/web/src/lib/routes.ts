import {
  LayoutDashboard,
  Users,
  Settings,
  FileText,
  ShieldCheck,
  CreditCard,
  History,
  FolderOpen,
  UserCog,
  ShieldAlert,
} from "lucide-react";

export interface NavItem {
  title: string;
  href: string;
  icon: any;
  roles?: string[];
  children?: NavItem[];
}

export const dashboardRoutes: NavItem[] = [
  {
    title: "Overview",
    href: "/dashboard",
    icon: LayoutDashboard,
    roles: ["USER", "ADMIN"],
  },
  {
    title: "Storage",
    href: "/dashboard/files",
    icon: FolderOpen,
    roles: ["USER", "ADMIN"],
    children: [
      {
        title: "All Files",
        href: "/dashboard/files",
        icon: FileText,
      },
      {
        title: "Recent",
        href: "/dashboard/files/recent",
        icon: History,
      },
    ],
  },
  {
    title: "Billing",
    href: "/dashboard/billing",
    icon: CreditCard,
    roles: ["USER", "ADMIN"],
  },
  {
    title: "Admin Panel",
    href: "/dashboard/admin",
    icon: ShieldCheck,
    roles: ["ADMIN"],
    children: [
      {
        title: "User Management",
        href: "/dashboard/admin/users",
        icon: Users,
      },
      {
        title: "Roles & Permissions",
        href: "/dashboard/admin/permissions",
        icon: UserCog,
      },
      {
        title: "System Logs",
        href: "/dashboard/admin/logs",
        icon: ShieldAlert,
      },
    ],
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
    roles: ["USER", "ADMIN"],
  },
];
