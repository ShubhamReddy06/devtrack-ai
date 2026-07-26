import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

export default function Input({
  error,
  className = "",
  ...props
}: InputProps) {
  return (
    <div className="w-full">
      <input
        {...props}
        className={`w-full rounded-xl border border-gray-600 bg-slate-900 px-4 py-3 text-white placeholder-gray-400 outline-none transition focus:border-cyan-500 ${className}`}
      />

      {error && (
        <p className="mt-1 text-sm text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}