"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Button from "@/components/ui/Button";
import ProjectCard from "@/components/dashboard/ProjectCard";
import DashboardLayout from "@/components/layout/DashboardLayout";

const projects = [
  {
    id: 1,
    title: "DevTrack AI",
    description: "AI Productivity Platform",
    tasks: 12,
    status: "In Progress" as const,
  },
  {
    id: 2,
    title: "Portfolio Website",
    description: "Personal Portfolio",
    tasks: 8,
    status: "Completed" as const,
  },
  {
    id: 3,
    title: "Weather App",
    description: "Weather Forecast Project",
    tasks: 5,
    status: "Planning" as const,
  },
];

function ProjectsContent() {
  const searchParams = useSearchParams();
  const searchVal = searchParams.get("search") || "";

  const filteredProjects = projects.filter((project) => {
    if (!searchVal) return true;
    return (
      project.title.toLowerCase().includes(searchVal.toLowerCase()) ||
      project.description.toLowerCase().includes(searchVal.toLowerCase())
    );
  });

  return (
    <div className="min-h-[80vh] p-4 transition-colors duration-300">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white transition-colors duration-300">
            Projects
          </h1>

          <p className="text-gray-500 dark:text-slate-400 mt-1 transition-colors duration-300">
            {searchVal ? `Showing search results for "${searchVal}"` : "Manage all your projects in one place."}
          </p>
        </div>

        <div className="w-40">
          <Button>
            + Create Project
          </Button>
        </div>
      </div>

      {/* Empty State */}
      {filteredProjects.length === 0 ? (
        <div className="rounded-xl bg-white dark:bg-slate-900 p-12 text-center shadow border border-gray-200 dark:border-slate-800 transition-colors duration-300">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            No Projects Found
          </h2>

          <p className="mt-2 text-gray-500 dark:text-slate-400">
            {searchVal ? "Try searching for a different keyword." : "Create your first project."}
          </p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              id={project.id}
              title={project.title}
              description={project.description}
              tasks={project.tasks}
              status={project.status}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function ProjectsPage() {
  return (
    <DashboardLayout>
      <Suspense fallback={<div className="p-8 text-center text-gray-500">Loading projects...</div>}>
        <ProjectsContent />
      </Suspense>
    </DashboardLayout>
  );
}