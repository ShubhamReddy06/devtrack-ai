import Link from "next/link";

interface ProjectCardProps {
  id: number | string;
  title: string;
  description: string;
  tasks: number;
  status: "Planning" | "In Progress" | "Completed";
}

export default function ProjectCard({
  id,
  title,
  description,
  tasks,
  status,
}: ProjectCardProps) {
  const getStatusStyle = () => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";

      case "In Progress":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400";

      default:
        return "bg-gray-100 text-gray-700 dark:bg-slate-800 dark:text-slate-400";
    }
  };

  return (
    <Link href={`/projects/${id}`} className="block">
      <div className="rounded-xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-blue-500/50 dark:hover:border-blue-500/50 cursor-pointer">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white transition-colors duration-300">{title}</h2>

        <p className="mt-2 text-gray-600 dark:text-slate-300 text-sm line-clamp-2 transition-colors duration-300">{description}</p>

        <p className="mt-4 text-sm text-gray-500 dark:text-slate-400 transition-colors duration-300">
          <span className="font-semibold text-gray-700 dark:text-slate-200">{tasks}</span> Tasks
        </p>

        <div className="mt-4">
          <span
            className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusStyle()}`}
          >
            {status}
          </span>
        </div>

        <div className="mt-6 border-t border-gray-100 dark:border-slate-800 pt-4 flex justify-between items-center transition-colors duration-300">
          <div>
            <p className="text-[10px] uppercase tracking-wider text-gray-400 dark:text-slate-500">
              Created by
            </p>

            <p className="text-xs font-semibold text-gray-800 dark:text-slate-300">
              Shubham
            </p>
          </div>
          <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 group-hover:underline">
            View details &rarr;
          </span>
        </div>
      </div>
    </Link>
  );
}