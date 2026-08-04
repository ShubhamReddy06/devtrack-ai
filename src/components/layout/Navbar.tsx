"use client";

import { Menu, Search } from "lucide-react";

interface NavbarProps {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Navbar({
  collapsed,
  setCollapsed,
}: NavbarProps) {
  return (
    <header className="h-16 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-6">

      {/* Left Side */}
      <div className="flex items-center gap-5">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded-lg hover:bg-slate-800 transition"
        >
          <Menu size={28} className="text-white" />
        </button>

        <h1 className="text-3xl font-bold text-blue-500">
          DevTrack AI
        </h1>
      </div>

      {/* Center Search Bar */}
      <div className="flex-1 flex justify-center px-10">
        <div className="relative w-full max-w-xl">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search projects, tasks..."
            className="w-full bg-slate-800 border border-slate-700 rounded-xl py-2.5 pl-11 pr-4 text-white placeholder:text-gray-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition"
          />
        </div>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-semibold text-white">
          S
        </div>
      </div>
    </header>
  );
}