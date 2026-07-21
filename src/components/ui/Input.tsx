import { ReactNode } from "react";

interface InputProps {
  type: string;
  placeholder: string;
  icon?: ReactNode;
}

export default function Input({
  type,
  placeholder,
  icon,
}: InputProps) {
  return (
    <div className="flex items-center bg-white rounded-xl border border-gray-300 px-4 py-4 shadow-sm">
      {icon && (
        <div className="text-gray-500 mr-3">
          {icon}
        </div>
      )}

      <input
        type={type}
        placeholder={placeholder}
        className="w-full bg-transparent outline-none text-gray-800 placeholder:text-gray-400"
      />
    </div>
  );
}