import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

export default function Button({
  children,
  onClick,
  disabled = false,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full rounded-xl py-3 font-semibold text-white transition duration-300 ${
        disabled
          ? "cursor-not-allowed bg-gray-600"
          : "bg-cyan-500 hover:bg-cyan-600"
      }`}
    >
      {children}
    </button>
  );
}