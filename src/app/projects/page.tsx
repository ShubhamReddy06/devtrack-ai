"use client";

import React, { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import Button from "@/components/ui/Button";
import ProjectCard from "@/components/dashboard/ProjectCard";
import DashboardLayout from "@/components/layout/DashboardLayout";
import ProjectModal from "@/components/projects/ProjectModal";
import { useProjects, Project } from "@/components/providers/ProjectProvider";

function ProjectsContent() {
  const { projects, addProject, editProject, deleteProject } = useProjects();
  const searchParams = useSearchParams();
  const searchVal = searchParams.get("search") || "";

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeEditProject, setActiveEditProject] = useState<Project | undefined>(undefined);

  const filteredProjects = projects.filter((project) => {
    if (!searchVal) return true;
    return (
      project.title.toLowerCase().includes(searchVal.toLowerCase()) ||
      project.description.toLowerCase().includes(searchVal.toLowerCase())
    );
  });

  const handleCreateOrUpdate = (title: string, description: string, status: "Planning" | "In Progress" | "Completed") => {
    if (activeEditProject) {
      editProject(activeEditProject.id, { title, description, status });
    } else {
      addProject(title, description, status);
    }
  };

  const handleEditClick = (id: string) => {
    const proj = projects.find(p => p.id === id);
    if (proj) {
      setActiveEditProject(proj);
      setIsModalOpen(true);
    }
  };

  const handleDeleteClick = (id: string) => {
    if (confirm("Are you sure you want to delete this project and all its tasks?")) {
      deleteProject(id);
    }
  };

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
          <Button onClick={() => { setActiveEditProject(undefined); setIsModalOpen(true); }}>
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
              tasks={project.tasks.length}
              status={project.status}
              onEdit={handleEditClick}
              onDelete={handleDeleteClick}
            />
          ))}
        </div>
      )}

      {/* Project Modal */}
      <ProjectModal
        isOpen={isModalOpen}
        onClose={() => { setIsModalOpen(false); setActiveEditProject(undefined); }}
        onSubmit={handleCreateOrUpdate}
        project={activeEditProject}
      />
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