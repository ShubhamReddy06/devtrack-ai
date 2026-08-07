"use client";

import Button from "@/components/ui/Button";
import DashboardCard from "@/components/dashboard/DashboardCard";
import RecentActivity from "@/components/dashboard/RecentActivity";
import DashboardLayout from "@/components/layout/DashboardLayout";

export default function DashboardPage() {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const activities = [
    {
      id: 1,
      title: "Created Project DevTrack AI",
      time: "2 hours ago",
    },
    {
      id: 2,
      title: "Completed UI Design",
      time: "Yesterday",
    },
    {
      id: 3,
      title: "Generated AI Report",
      time: "2 days ago",
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8 p-6 transition-colors duration-300">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white transition-colors duration-300">
              Welcome back, Shubham 👋
            </h1>

            <p className="mt-2 text-gray-500 dark:text-slate-400 transition-colors duration-300">
              {today}
            </p>

            <p className="mt-2 text-gray-600 dark:text-slate-300 transition-colors duration-300">
              Here's a quick overview of your development progress.
            </p>
          </div>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
          <DashboardCard
            title="📁 Projects"
            value={12}
            description="+3 this week"
          />

          <DashboardCard
            title="✅ Tasks"
            value={48}
            description="+8 completed"
          />

          <DashboardCard
            title="🎉 Completed"
            value={36}
            description="75% completion"
          />

          <DashboardCard
            title="🤖 AI Reports"
            value={7}
            description="+2 generated"
          />
        </div>

        {/* Recent Activity */}
        <RecentActivity activities={activities} />
      </div>
    </DashboardLayout>
  );
}