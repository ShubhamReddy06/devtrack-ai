"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="rounded-xl border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900 p-2 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors duration-300"
      aria-label="Toggle Theme"
    >
      {isDark ? (
        <Sun
          size={20}
          className="text-yellow-400"
        />
      ) : (
        <Moon
          size={20}
          className="text-slate-700"
        />
      )}
    </button>
  );
}