"use client";

import React, { use, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Plus, CheckCircle, Clock, ListTodo } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import Button from "@/components/ui/Button";
import TaskCard from "@/components/projects/TaskCard";
import TaskModal from "@/components/projects/TaskModal";
import { useProjects } from "@/components/providers/ProjectProvider";

interface ProjectDetailsPageProps {
  params: Promise<{ id: string }>;
}

export default function ProjectDetailsPage({ params }: ProjectDetailsPageProps) {
  const { id } = use(params);
  const { projects, addTask, deleteTask, updateTaskStatus } = useProjects();
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  const project = projects.find(p => p.id === id);

  if (!project) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center min-h-[70vh] p-6 text-center">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Project Not Found</h2>
          <p className="mt-2 text-gray-500 dark:text-slate-400">The project you are looking for does not exist or has been removed.</p>
          <Link href="/projects" className="mt-6 text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-2">
            <ArrowLeft size={16} /> Back to Projects
          </Link>
        </div>
      </DashboardLayout>
    );
  }

  const handleCreateTask = (title: string, description: string, priority: "Low" | "Medium" | "High", dueDate: string) => {
    addTask(project.id, {
      title,
      description,
      priority,
      dueDate,
      status: "To Do"
    });
  };

  const handleDeleteTask = (taskId: string | number) => {
    if (confirm("Are you sure you want to delete this task?")) {
      deleteTask(project.id, taskId);
    }
  };

  const handleStatusChange = (taskId: string | number, newStatus: "To Do" | "In Progress" | "Done") => {
    updateTaskStatus(project.id, taskId, newStatus);
  };

  const getStatusStyle = () => {
    switch (project.status) {
      case "Completed":
        return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-green-200/50 dark:border-green-800/30";
      case "In Progress":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200/50 dark:border-blue-800/30";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-slate-800 dark:text-slate-400 border-gray-200/50 dark:border-slate-800";
    }
  };

  const todoTasks = project.tasks.filter(t => t.status === "To Do");
  const inProgressTasks = project.tasks.filter(t => t.status === "In Progress");
  const doneTasks = project.tasks.filter(t => t.status === "Done");

  return (
    <DashboardLayout>
      <div className="p-4 transition-colors duration-300">
        {/* Navigation Breadcrumb */}
        <div className="mb-6">
          <Link href="/projects" className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            <ArrowLeft size={16} />
            <span>Back to Projects</span>
          </Link>
        </div>

        {/* Project Header Info Card */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-200 dark:border-slate-800 p-6 mb-8 shadow-sm transition-colors duration-300">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                  {project.title}
                </h1>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${getStatusStyle()}`}>
                  {project.status}
                </span>
              </div>
              <p className="text-gray-600 dark:text-slate-300 max-w-3xl leading-relaxed text-sm md:text-base">
                {project.description}
              </p>
            </div>
            
            <div className="sm:w-44 flex-shrink-0">
              <Button onClick={() => setIsTaskModalOpen(true)}>
                <span className="flex items-center justify-center gap-1.5 text-sm">
                  <Plus size={16} /> Add Task
                </span>
              </Button>
            </div>
          </div>
        </div>

        {/* Task Board Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* TO DO Column */}
          <div className="bg-gray-50 dark:bg-slate-900/40 rounded-2xl p-4 border border-gray-100 dark:border-slate-900/80 min-h-[400px] flex flex-col">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-200/50 dark:border-slate-800/50">
              <div className="flex items-center gap-2">
                <div className="p-1 rounded-lg bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400">
                  <ListTodo size={16} />
                </div>
                <h2 className="font-bold text-gray-800 dark:text-slate-200 text-sm">To Do</h2>
              </div>
              <span className="bg-gray-200 dark:bg-slate-800 text-gray-700 dark:text-slate-300 text-xs px-2 py-0.5 rounded-full font-bold">
                {todoTasks.length}
              </span>
            </div>
            <div className="flex-1 space-y-4 overflow-y-auto max-h-[500px] pr-1">
              {todoTasks.length === 0 ? (
                <div className="text-center py-8 text-gray-400 dark:text-slate-600 text-xs border-2 border-dashed border-gray-200 dark:border-slate-800 rounded-xl">
                  No tasks to do
                </div>
              ) : (
                todoTasks.map(task => (
                  <TaskCard 
                    key={task.id} 
                    task={task} 
                    onDelete={handleDeleteTask} 
                    onStatusChange={handleStatusChange}
                  />
                ))
              )}
            </div>
          </div>

          {/* IN PROGRESS Column */}
          <div className="bg-gray-50 dark:bg-slate-900/40 rounded-2xl p-4 border border-gray-100 dark:border-slate-900/80 min-h-[400px] flex flex-col">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-200/50 dark:border-slate-800/50">
              <div className="flex items-center gap-2">
                <div className="p-1 rounded-lg bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400">
                  <Clock size={16} />
                </div>
                <h2 className="font-bold text-gray-800 dark:text-slate-200 text-sm">In Progress</h2>
              </div>
              <span className="bg-gray-200 dark:bg-slate-800 text-gray-700 dark:text-slate-300 text-xs px-2 py-0.5 rounded-full font-bold">
                {inProgressTasks.length}
              </span>
            </div>
            <div className="flex-1 space-y-4 overflow-y-auto max-h-[500px] pr-1">
              {inProgressTasks.length === 0 ? (
                <div className="text-center py-8 text-gray-400 dark:text-slate-600 text-xs border-2 border-dashed border-gray-200 dark:border-slate-800 rounded-xl">
                  No tasks in progress
                </div>
              ) : (
                inProgressTasks.map(task => (
                  <TaskCard 
                    key={task.id} 
                    task={task} 
                    onDelete={handleDeleteTask} 
                    onStatusChange={handleStatusChange}
                  />
                ))
              )}
            </div>
          </div>

          {/* DONE Column */}
          <div className="bg-gray-50 dark:bg-slate-900/40 rounded-2xl p-4 border border-gray-100 dark:border-slate-900/80 min-h-[400px] flex flex-col">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-200/50 dark:border-slate-800/50">
              <div className="flex items-center gap-2">
                <div className="p-1 rounded-lg bg-green-50 dark:bg-green-950/30 text-green-600 dark:text-green-400">
                  <CheckCircle size={16} />
                </div>
                <h2 className="font-bold text-gray-800 dark:text-slate-200 text-sm">Done</h2>
              </div>
              <span className="bg-gray-200 dark:bg-slate-800 text-gray-700 dark:text-slate-300 text-xs px-2 py-0.5 rounded-full font-bold">
                {doneTasks.length}
              </span>
            </div>
            <div className="flex-1 space-y-4 overflow-y-auto max-h-[500px] pr-1">
              {doneTasks.length === 0 ? (
                <div className="text-center py-8 text-gray-400 dark:text-slate-600 text-xs border-2 border-dashed border-gray-200 dark:border-slate-800 rounded-xl">
                  No tasks completed
                </div>
              ) : (
                doneTasks.map(task => (
                  <TaskCard 
                    key={task.id} 
                    task={task} 
                    onDelete={handleDeleteTask} 
                    onStatusChange={handleStatusChange}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Task Modal Overlay */}
      <TaskModal
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
        onSubmit={handleCreateTask}
      />
    </DashboardLayout>
  );
}
