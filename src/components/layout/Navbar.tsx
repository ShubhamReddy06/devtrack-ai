"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Menu, Search } from "lucide-react";
import DepthText from "../ui/DepthText";
import ThemeToggle from "../common/ThemeToggle";

interface NavbarProps {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Navbar({
  collapsed,
  setCollapsed,
}: NavbarProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const query = searchQuery.toLowerCase().trim();
      if (!query) return;

      if (query.includes("task")) {
        router.push("/tasks");
      } else if (query.includes("project")) {
        router.push("/projects");
      } else if (query.includes("setting")) {
        router.push("/settings");
      } else if (query.includes("analytic")) {
        router.push("/analytics");
      } else if (query.includes("profile")) {
        router.push("/profile");
      } else if (query.includes("devtrack") || query.includes("productivity")) {
        router.push("/projects/1");
      } else if (query.includes("portfolio")) {
        router.push("/projects/2");
      } else if (query.includes("weather")) {
        router.push("/projects/3");
      } else {
        router.push(`/projects?search=${encodeURIComponent(searchQuery)}`);
      }
    }
  };

  return (
    <header className="h-16 bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 transition-colors duration-300 flex items-center justify-between px-6 shadow-sm">

      {/* Left */}
      <div className="flex items-center gap-4">

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors duration-300"
        >
          <Menu
            size={24}
            className="text-gray-700 dark:text-white"
          />
        </button>

      </div>

      {/* Search */}

      <div className="flex-1 flex justify-center px-10">

        <div className="relative w-full max-w-xl">

          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-slate-400"
          />

          <input
            type="text"
            placeholder="Search projects, tasks, settings... (Press Enter)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearchKeyDown}
            className="w-full rounded-xl
            bg-gray-100 dark:bg-slate-800
            border border-gray-300 dark:border-slate-700
            py-2.5 pl-11 pr-4
            text-gray-900 dark:text-white
            placeholder:text-gray-500 dark:placeholder:text-slate-400
            outline-none
            focus:ring-2 focus:ring-blue-500
            transition-colors duration-300"
          />

        </div>

      </div>

      {/* Right */}

      <div className="flex items-center gap-4">

        <ThemeToggle />

        <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold cursor-pointer">
          S
        </div>

      </div>

    </header>
  );
}