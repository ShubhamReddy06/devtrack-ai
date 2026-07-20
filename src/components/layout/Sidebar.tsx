"use client";

import Link from "next/link";
import { useState } from "react";

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Hover Area */}
      <div
        className="fixed left-0 top-20 h-[calc(100vh-5rem)] w-3 z-40"
        onMouseEnter={() => setOpen(true)}
      />

      <aside
        onMouseLeave={() => setOpen(false)}
        className={`fixed top-20 left-0 w-64 h-[calc(100vh-5rem)] bg-slate-900 border-r border-slate-700 transform transition-transform duration-300 z-40 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <nav className="flex flex-col gap-6 p-6 text-white">
          <Link href="/dashboard">🏠 Dashboard</Link>
          <Link href="/projects">📁 Projects</Link>
          <Link href="/tasks">✅ Tasks</Link>
          <Link href="/analytics">📊 Analytics</Link>
          <Link href="/settings">⚙️ Settings</Link>
          <Link href="/profile">👤 Profile</Link>
        </nav>
      </aside>
    </>
  );
}