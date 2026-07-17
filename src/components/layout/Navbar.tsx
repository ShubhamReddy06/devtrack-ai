export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-8 py-4 border-b">
      <h1 className="text-2xl font-bold text-blue-600">
        DevTrack AI 🚀
      </h1>

      <div className="flex gap-6">
        <a href="#" className="transition-colors duration-200 hover:text-blue-500">
          Dashboard
        </a>
        <a href="#" className="transition-colors duration-200 hover:text-blue-500">
          Projects
        </a>
        <a href="#" className="transition-colors duration-200 hover:text-blue-500">
          Tasks
        </a>
        <a href="#" className="transition-colors duration-200 hover:text-blue-500">
          Analytics
        </a>
        <a href="#" className="transition-colors duration-200 hover:text-blue-500">
          Profile
        </a>
      </div>
    </nav>
  );
}