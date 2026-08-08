import { Calendar, AlertCircle, Clock, CheckCircle2, Trash2 } from "lucide-react";

export interface Task {
  id: string | number;
  title: string;
  description: string;
  status: "To Do" | "In Progress" | "Done";
  priority: "Low" | "Medium" | "High";
  dueDate: string;
}

interface TaskCardProps {
  task: Task;
  onDelete?: (id: string | number) => void;
  onStatusChange?: (id: string | number, newStatus: "To Do" | "In Progress" | "Done") => void;
}

export default function TaskCard({
  task,
  onDelete,
  onStatusChange,
}: TaskCardProps) {
  const getStatusIcon = () => {
    switch (task.status) {
      case "Done":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case "In Progress":
        return <Clock className="h-4 w-4 text-blue-500 animate-pulse" />;
      default:
        return <AlertCircle className="h-4 w-4 text-amber-500" />;
    }
  };

  const getPriorityStyle = () => {
    switch (task.priority) {
      case "High":
        return "bg-rose-50 text-rose-700 dark:bg-rose-950/30 dark:text-rose-400 border-rose-200/50 dark:border-rose-900/30";
      case "Medium":
        return "bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400 border-amber-200/50 dark:border-amber-900/30";
      default:
        return "bg-slate-50 text-slate-700 dark:bg-slate-800/50 dark:text-slate-400 border-slate-200/50 dark:border-slate-800";
    }
  };

  return (
    <div className="group relative rounded-xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm hover:shadow-md hover:border-gray-300 dark:hover:border-slate-700 transition-all duration-300 flex flex-col justify-between min-h-[140px]">
      <div>
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-semibold text-gray-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1">
            {task.title}
          </h3>
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getPriorityStyle()}`}>
            {task.priority}
          </span>
        </div>

        <p className="mt-2 text-sm text-gray-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
          {task.description}
        </p>
      </div>

      <div className="mt-4 pt-3 border-t border-gray-100 dark:border-slate-800 flex items-center justify-between text-xs text-gray-500 dark:text-slate-500">
        <div className="flex items-center gap-1.5 font-medium">
          <Calendar size={13} className="text-gray-400" />
          <span>{task.dueDate}</span>
        </div>

        <div className="flex items-center gap-2">
          {/* Status Badge & Selector */}
          {onStatusChange ? (
            <div className="flex items-center gap-1 bg-gray-50 dark:bg-slate-800/85 px-1.5 py-0.5 rounded-lg border border-gray-200 dark:border-slate-800/60">
              {getStatusIcon()}
              <select
                value={task.status}
                onChange={(e) => onStatusChange(task.id, e.target.value as any)}
                className="font-semibold text-[11px] text-gray-700 dark:text-slate-300 bg-transparent border-none outline-none pr-1 py-0.5 cursor-pointer"
              >
                <option value="To Do" className="bg-white dark:bg-slate-900">To Do</option>
                <option value="In Progress" className="bg-white dark:bg-slate-900">In Progress</option>
                <option value="Done" className="bg-white dark:bg-slate-900">Done</option>
              </select>
            </div>
          ) : (
            <div className="flex items-center gap-1 bg-gray-50 dark:bg-slate-800/80 px-2.5 py-1 rounded-lg border border-gray-100 dark:border-slate-800/50">
              {getStatusIcon()}
              <span className="font-semibold text-[11px] text-gray-700 dark:text-slate-300 ml-0.5">
                {task.status}
              </span>
            </div>
          )}

          {onDelete && (
            <button
              onClick={() => onDelete(task.id)}
              className="p-1.5 rounded-lg text-gray-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-all cursor-pointer"
              title="Delete task"
            >
              <Trash2 size={14} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
