"use client";

import Link from "next/link";
import { FolderKanban, Plus } from "lucide-react";
import DashboardCard from "@/components/dashboard/DashboardCard";
import RecentActivity from "@/components/dashboard/RecentActivity";
import DashboardLayout from "@/components/layout/DashboardLayout";
import ProgressBar from "@/components/ui/ProgressBar";
import Spinner from "@/components/ui/Spinner";
import { useProjects } from "@/components/providers/ProjectProvider";

export default function DashboardPage() {
  const { projects, activities, loading } = useProjects();
  
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  // Calculate dynamic metrics
  const projectCount = projects.length;
  let totalTasks = 0;
  let completedTasks = 0;

  projects.forEach(project => {
    totalTasks += project.tasks.length;
    completedTasks += project.tasks.filter(t => t.status === "Done").length;
  });

  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex min-h-[75vh] items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <Spinner size="lg" />
            <p className="text-sm font-semibold text-gray-500 dark:text-slate-400 animate-pulse">
              Hydrating dashboard workspace...
            </p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

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

        {projectCount === 0 ? (
          /* Empty Workspace State */
          <div className="rounded-2xl border-2 border-dashed border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 p-12 text-center shadow-sm flex flex-col items-center justify-center gap-4 transition-colors">
            <div className="p-4 rounded-full bg-blue-50 dark:bg-slate-800 text-blue-600 dark:text-blue-400">
              <FolderKanban size={36} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white">Workspace is Empty</h3>
              <p className="mt-1.5 text-sm text-gray-500 dark:text-slate-400 max-w-sm">
                Get started by creating your first development project to track tasks, sprints and completion metrics.
              </p>
            </div>
            <Link href="/projects" className="inline-flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-semibold text-sm px-6 py-3 shadow transition-all">
              <Plus size={16} /> Create Project
            </Link>
          </div>
        ) : (
          <>
            {/* Dynamic Dashboard Cards */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
              <DashboardCard
                title="📁 Projects"
                value={projectCount}
                description="Active projects"
              />

              <DashboardCard
                title="✅ Tasks"
                value={totalTasks}
                description={`${completedTasks} completed`}
              />

              <DashboardCard
                title="🎉 Completed"
                value={`${completionRate}%`}
                description="Average completion"
              />

              <DashboardCard
                title="🤖 AI Reports"
                value={7}
                description="Sprint summaries"
              />
            </div>

            {/* Global Sprint Progress Card */}
            {totalTasks > 0 && (
              <div className="rounded-2xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm transition-colors duration-300">
                <h3 className="font-bold text-lg text-gray-800 dark:text-white mb-2">Overall Sprint Progress</h3>
                <p className="text-xs text-gray-500 dark:text-slate-400 mb-4">
                  Aggregated task progress tracking across all current active projects.
                </p>
                <ProgressBar value={completionRate} size="lg" />
              </div>
            )}

            {/* Dynamic Recent Activity */}
            <RecentActivity activities={activities} />
          </>
        )}
      </div>
    </DashboardLayout>
  );
}