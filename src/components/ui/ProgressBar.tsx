"use client";

import React from "react";

interface ProgressBarProps {
  value: number; // 0 to 100
  showLabel?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function ProgressBar({
  value,
  showLabel = true,
  size = "md",
  className = "",
}: ProgressBarProps) {
  const clampedValue = Math.min(Math.max(Math.round(value || 0), 0), 100);

  const getSizeStyle = () => {
    switch (size) {
      case "sm":
        return "h-1.5";
      case "lg":
        return "h-3.5";
      default:
        return "h-2.5";
    }
  };

  return (
    <div className={`w-full space-y-1.5 ${className}`}>
      {showLabel && (
        <div className="flex justify-between items-center text-xs font-semibold text-gray-500 dark:text-slate-400">
          <span>Progress</span>
          <span className="font-bold text-blue-600 dark:text-blue-400">{clampedValue}%</span>
        </div>
      )}
      <div className={`w-full rounded-full bg-gray-100 dark:bg-slate-800 overflow-hidden border border-gray-200/20 dark:border-slate-800/50 ${getSizeStyle()}`}>
        <div
          style={{ width: `${clampedValue}%` }}
          className="h-full rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-600 dark:from-blue-600 dark:via-indigo-600 dark:to-blue-500 transition-all duration-700 ease-out"
        />
      </div>
    </div>
  );
}
