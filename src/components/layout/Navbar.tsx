import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-slate-900 text-white px-8 py-4 border-b border-slate-700">
      <div className="flex items-center justify-between">

        {/* Logo */}
        <Link
          href="/"
          className="text-4xl font-bold text-blue-500"
        >
          DevTrack AI 🚀
        </Link>

        {/* Search Bar */}
        <div className="flex-1 mx-10">
          <input
            type="text"
            placeholder="Search..."
            className="w-full max-w-md px-4 py-2 rounded-lg bg-slate-800 border border-slate-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Navigation Links */}
        <div className="flex items-center gap-8 text-lg">
          <Link href="/">Home</Link>
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/projects">Projects</Link>
          <Link href="/tasks">Tasks</Link>
          <Link href="/analytics">Analytics</Link>
          <Link href="/settings">Settings</Link>
          <Link href="/profile">Profile</Link>
        </div>

      </div>
    </nav>
  );
}