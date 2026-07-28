import { ReactNode } from "react";

interface ButtonProps {
  children?: ReactNode;
  text?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

export default function Button({
  children,
  text,
  onClick,
  disabled = false,
  type = "button",
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`rounded-xl px-6 py-3 font-semibold text-white transition duration-300 ${
        disabled
          ? "cursor-not-allowed bg-gray-600"
          : "bg-cyan-500 hover:bg-cyan-600"
      }`}
    >
      {children ?? text}
    </button>
  );
}