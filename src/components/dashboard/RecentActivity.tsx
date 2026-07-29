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
    <div className="rounded-xl bg-white p-6 shadow-md">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Recent Activity
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Track your latest development activities.
          </p>
        </div>

        <button
          onClick={() => console.log("Navigate to activity page")}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
        >
          View All
        </button>
      </div>

      {/* Activity List */}
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div
            key={activity.id}
            className="flex items-start gap-4 rounded-lg border border-gray-200 p-4 transition hover:bg-gray-50"
          >
            {/* Timeline Dot */}
            <div className="mt-2 h-3 w-3 rounded-full bg-blue-600"></div>

            {/* Activity Content */}
            <div className="flex-1">
              <p
                className={`${
                  index === 0 ? "font-bold text-gray-900" : "font-medium text-gray-700"
                }`}
              >
                📝 {activity.title}
              </p>

              <p className="mt-1 text-sm text-gray-500">
                {activity.time}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}