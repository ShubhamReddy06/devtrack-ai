import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between bg-gray-900 text-white shadow-lg px-8 py-4 border-b border-gray-800">
      <h1 className="text-2xl font-bold text-blue-500">
        DevTrack AI 🚀
      </h1>

      <div className="flex items-center gap-6">
        <Link href="/" className="hover:text-blue-500 transition-colors">
          Home
        </Link>

        <Link href="/dashboard" className="hover:text-blue-500 transition-colors">
          Dashboard
        </Link>

        <Link href="/projects" className="hover:text-blue-500 transition-colors">
          Projects
        </Link>

        <Link href="/tasks" className="hover:text-blue-500 transition-colors">
          Tasks
        </Link>

        <Link href="/analytics" className="hover:text-blue-500 transition-colors">
          Analytics
        </Link>

        <Link href="/settings" className="hover:text-blue-500 transition-colors">
          Settings
        </Link>

        <Link href="/profile" className="hover:text-blue-500 transition-colors">
          Profile
        </Link>
      </div>
    </nav>
  );
}