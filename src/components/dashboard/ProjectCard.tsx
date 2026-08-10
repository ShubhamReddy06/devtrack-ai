import Link from "next/link";
import { Pencil, Trash2 } from "lucide-react";
import ProgressBar from "../ui/ProgressBar";

interface ProjectCardProps {
  id: number | string;
  title: string;
  description: string;
  tasks: number;
  status: "Planning" | "In Progress" | "Completed";
  progress?: number;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export default function ProjectCard({
  id,
  title,
  description,
  tasks,
  status,
  progress = 0,
  onEdit,
  onDelete,
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
        <div className="flex items-start justify-between gap-4">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white transition-colors duration-300">{title}</h2>
          
          {(onEdit || onDelete) && (
            <div className="flex items-center gap-1 flex-shrink-0">
              {onEdit && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onEdit(String(id));
                  }}
                  className="p-1.5 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-all cursor-pointer"
                  title="Edit project"
                >
                  <Pencil size={13} />
                </button>
              )}
              {onDelete && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onDelete(String(id));
                  }}
                  className="p-1.5 rounded-lg text-gray-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-all cursor-pointer"
                  title="Delete project"
                >
                  <Trash2 size={13} />
                </button>
              )}
            </div>
          )}
        </div>

        <p className="mt-2 text-gray-600 dark:text-slate-300 text-sm line-clamp-2 transition-colors duration-300">{description}</p>

        <div className="mt-4 flex items-center justify-between text-sm text-gray-500 dark:text-slate-400 transition-colors duration-300">
          <span>
            <span className="font-semibold text-gray-700 dark:text-slate-200">{tasks}</span> Tasks
          </span>
          <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${getStatusStyle()}`}>
            {status}
          </span>
        </div>

        {tasks > 0 && (
          <div className="mt-4">
            <ProgressBar value={progress} size="sm" />
          </div>
        )}

        <div className="mt-5 border-t border-gray-100 dark:border-slate-800 pt-4 flex justify-between items-center transition-colors duration-300">
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