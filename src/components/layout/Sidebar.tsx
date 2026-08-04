"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  LayoutDashboard,
  FolderKanban,
  CheckSquare,
  BarChart3,
  Settings,
  User,
} from "lucide-react";

interface SidebarProps {
  collapsed: boolean;
}

const menuItems = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Projects",
    href: "/projects",
    icon: FolderKanban,
  },
  {
    name: "Tasks",
    href: "/tasks",
    icon: CheckSquare,
  },
  {
    name: "Analytics",
    href: "/analytics",
    icon: BarChart3,
  },
  {
    name: "Settings",
    href: "/settings",
    icon: Settings,
  },
  {
    name: "Profile",
    href: "/profile",
    icon: User,
  },
];

export default function Sidebar({
  collapsed,
}: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={`bg-slate-900 border-r border-slate-800 text-white transition-all duration-300 flex flex-col justify-between ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Logo */}
      <div>
        <div className="h-16 flex items-center justify-center border-b border-slate-800">
          {collapsed ? (
            <span className="text-2xl">🚀</span>
          ) : (
            <h2 className="text-xl font-bold">
              DevTrack AI 🚀
            </h2>
          )}
        </div>

        {/* Navigation */}
        <nav className="p-3 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;

            const active = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center rounded-xl transition-all duration-200 ${
                  collapsed
                    ? "justify-center py-3"
                    : "gap-3 px-4 py-3"
                } ${
                  active
                    ? "bg-blue-600 text-white"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`}
              >
                <Icon size={20} />

                {!collapsed && (
                  <span>{item.name}</span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer */}
      <div className="border-t border-slate-800 p-4">
        {collapsed ? (
          <div className="flex justify-center">
            <User size={22} />
          </div>
        ) : (
          <>
            <p className="text-xs text-slate-400">
              Logged in as
            </p>

            <p className="font-semibold">
              Shubham
            </p>
          </>
        )}
      </div>
    </aside>
  );
}