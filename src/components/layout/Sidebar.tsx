import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-gray-900 text-white shadow-lg border-r border-gray-800">
      <div className="p-6">
        <h2 className="text-xl font-bold text-blue-500 mb-8">
          Navigation
        </h2>

        <div className="flex flex-col gap-3">
          <Link
            href="/dashboard"
            className="px-4 py-3 rounded-lg hover:bg-blue-600 transition-colors"
          >
            🏠 Dashboard
          </Link>

          <Link
            href="/projects"
            className="px-4 py-3 rounded-lg hover:bg-blue-600 transition-colors"
          >
            📁 Projects
          </Link>

          <Link
            href="/tasks"
            className="px-4 py-3 rounded-lg hover:bg-blue-600 transition-colors"
          >
            ✅ Tasks
          </Link>

          <Link
            href="/analytics"
            className="px-4 py-3 rounded-lg hover:bg-blue-600 transition-colors"
          >
            📊 Analytics
          </Link>

          <Link
            href="/settings"
            className="px-4 py-3 rounded-lg hover:bg-blue-600 transition-colors"
          >
            ⚙️ Settings
          </Link>

          <Link
            href="/profile"
            className="px-4 py-3 rounded-lg hover:bg-blue-600 transition-colors"
          >
            👤 Profile
          </Link>
        </div>
      </div>
    </aside>
  );
}