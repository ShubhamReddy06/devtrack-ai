import Link from "next/link";

interface Activity {
  id: number;
  title: string;
  time: string;
}

interface RecentActivityProps {
  activities: Activity[];
}

export default function RecentActivity({
  activities,
}: RecentActivityProps) {
  return (
    <div className="rounded-xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 p-6 shadow-md transition-colors duration-300">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white transition-colors">
            Recent Activity
          </h2>

          <p className="mt-1 text-sm text-gray-500 dark:text-slate-400 transition-colors">
            Track your latest development activities.
          </p>
        </div>

        <Link
          href="/projects"
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 shadow-md hover:shadow-lg active:scale-95 inline-block"
        >
          View All
        </Link>
      </div>

      {/* Activity List */}
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div
            key={activity.id}
            className="flex items-start gap-4 rounded-lg border border-gray-200 dark:border-slate-800/80 p-4 transition hover:bg-gray-50 dark:hover:bg-slate-800/40 transition-colors duration-200"
          >
            {/* Timeline Dot */}
            <div className="mt-2 h-3 w-3 rounded-full bg-blue-600"></div>

            {/* Activity Content */}
            <div className="flex-1">
              <p
                className={`${
                  index === 0 
                    ? "font-bold text-gray-900 dark:text-white" 
                    : "font-medium text-gray-700 dark:text-slate-300"
                } transition-colors`}
              >
                📝 {activity.title}
              </p>

              <p className="mt-1 text-sm text-gray-500 dark:text-slate-400 transition-colors">
                {activity.time}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}