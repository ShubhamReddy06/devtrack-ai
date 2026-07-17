export default function Sidebar() {
  return (
    <aside className="w-64 min-h-screen border-r p-6">
      <h2 className="text-xl font-bold mb-6">
        Navigation
      </h2>

      <nav className="flex flex-col gap-4">
        <a
          href="#"
          className="hover:text-blue-600 hover:font-semibold"
        >
          🏠 Dashboard
        </a>

        <a
          href="#"
          className="hover:text-blue-600 hover:font-semibold"
        >
          📁 Projects
        </a>

        <a
          href="#"
          className="hover:text-blue-600 hover:font-semibold"
        >
          ✅ Tasks
        </a>

        <a
          href="#"
          className="hover:text-blue-600 hover:font-semibold"
        >
          📊 Analytics
        </a>

        <a
          href="#"
          className="hover:text-blue-600 hover:font-semibold"
        >
          ⚙️ Settings
        </a>

        <a
          href="#"
          className="hover:text-blue-600 hover:font-semibold"
        >
          👤 Profile
        </a>
      </nav>
    </aside>
  );
}