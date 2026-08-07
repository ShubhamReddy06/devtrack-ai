import { ReactNode, MouseEvent } from "react";

interface ButtonProps {
  children?: ReactNode;
  text?: string;
  onClick?: (e?: MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  className?: string;
}

export default function Button({
  children,
  text,
  onClick,
  disabled = false,
  type = "button",
  className = "",
}: ButtonProps) {
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (type !== "submit") {
      e.preventDefault();
    }
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <button
      type={type}
      onClick={handleClick}
      disabled={disabled}
      className={`w-full rounded-xl px-6 py-3 font-semibold transition-all duration-300 ${
        disabled
          ? "cursor-not-allowed bg-gray-300 text-gray-500 dark:bg-slate-700 dark:text-slate-400"
          : "bg-blue-600 text-white hover:bg-blue-700 active:scale-95 shadow-md hover:shadow-lg"
      } ${className}`}
    >
      {children ?? text}
    </button>
  );
}