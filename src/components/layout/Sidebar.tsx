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

import DepthText from "../ui/DepthText";

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
      className={`border-r border-gray-200 dark:border-slate-800
      bg-white dark:bg-slate-900
      text-gray-900 dark:text-white
      transition-all duration-300
      flex flex-col justify-between
      ${
        collapsed ? "w-20" : "w-64"
      }`}
    >

      {/* Logo */}

      <div>

        <div className="h-16 flex items-center justify-center border-b border-gray-200 dark:border-slate-800">

          {collapsed ? (
            <span className="text-2xl">
              🚀
            </span>
          ) : (
            <div className="flex items-center justify-center py-1">
              <DepthText
                text="DevTrack AI"
                layers={16}
                depth={1.4}
                faceColor="#3b82f6"
                depthColor="#1d4ed8"
                fontSize="1.35rem"
                fontWeight={900}
                tilt={0}
                pointerTracking={false}
                autoOrbit={false}
                shadow={true}
              />
            </div>
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
                className={`flex items-center rounded-xl transition-all duration-300 ${
                  collapsed
                    ? "justify-center py-3"
                    : "gap-3 px-4 py-3"
                } ${
                  active
                    ? "bg-blue-500 dark:bg-blue-700 text-white"
                    : "text-gray-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800 hover:text-black dark:hover:text-white"
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

      <div className="border-t border-gray-200 dark:border-slate-800 p-4">

        {collapsed ? (

          <div className="flex justify-center">

            <User size={22} />

          </div>

        ) : (

          <>

            <p className="text-xs text-gray-500 dark:text-slate-400">
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