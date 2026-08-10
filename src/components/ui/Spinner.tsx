"use client";

import React from "react";

interface SpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function Spinner({
  size = "md",
  className = "",
}: SpinnerProps) {
  const getSizeStyle = () => {
    switch (size) {
      case "sm":
        return "h-4 w-4 border-2";
      case "lg":
        return "h-12 w-12 border-4";
      default:
        return "h-8 w-8 border-3";
    }
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div
        className={`animate-spin rounded-full border-solid border-blue-500 border-t-transparent ${getSizeStyle()}`}
      />
    </div>
  );
}
