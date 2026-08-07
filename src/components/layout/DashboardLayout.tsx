"use client";

import { useState } from "react";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({
  children,
}: DashboardLayoutProps) {

  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-slate-950 transition-colors duration-300">

      <Sidebar collapsed={collapsed} />

      <div className="flex flex-col flex-1">

        <Navbar
          collapsed={collapsed}
          setCollapsed={setCollapsed}
        />

        <main className="flex-1 overflow-y-auto p-6 bg-gray-100 dark:bg-slate-950 transition-colors duration-300">
          {children}
        </main>

      </div>

    </div>
  );
}