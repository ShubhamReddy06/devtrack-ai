interface ButtonProps {
  text: string;
  color: string;
}

export default function Button({ text, color }: ButtonProps) {
  return (
    <button
      className={`text-white px-4 py-2 rounded-lg transition ${
        color === "red"
          ? "bg-red-600 hover:bg-red-700"
          : "bg-blue-600 hover:bg-blue-700"
      }`}
    >
      {text}
    </button>
  );
}