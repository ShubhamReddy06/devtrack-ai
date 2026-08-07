"use client";

import React, { use, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Plus, CheckCircle, Clock, ListTodo } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import Button from "@/components/ui/Button";
import TaskCard, { Task } from "@/components/projects/TaskCard";

// Mock data representing database resources
interface ProjectData {
  id: number;
  title: string;
  description: string;
  status: "Planning" | "In Progress" | "Completed";
  tasks: Task[];
}

const projectsData: Record<string, ProjectData> = {
  "1": {
    id: 1,
    title: "DevTrack AI",
    description: "AI Productivity Platform designed to help developers track goals, manage sprints, and generate intelligent productivity reports.",
    status: "In Progress",
    tasks: [
      { id: "101", title: "Build Projects Page", description: "Design a responsive grid layout of project cards with status badges and create action buttons.", status: "Done", priority: "High", dueDate: "2026-08-07" },
      { id: "102", title: "Project Details Page", description: "Add dynamic routing under /projects/[id] to display detailed view and task boards.", status: "In Progress", priority: "High", dueDate: "2026-08-08" },
      { id: "103", title: "Create Task Component", description: "Develop a reusable TaskCard component incorporating priority tags, calendar due dates and delete controls.", status: "Done", priority: "Medium", dueDate: "2026-08-07" },
      { id: "104", title: "Frontend CRUD Operations", description: "Implement interactive modal forms for creating, editing, and deleting projects and tasks using local React state.", status: "To Do", priority: "Medium", dueDate: "2026-08-09" },
      { id: "105", title: "Integrate Express Backend", description: "Replace mock JSON payloads with axios async calls calling the REST database server.", status: "To Do", priority: "High", dueDate: "2026-08-11" },
    ]
  },
  "2": {
    id: 2,
    title: "Portfolio Website",
    description: "Personal developer portfolio to showcase skills, experience, and projects to potential employers.",
    status: "Completed",
    tasks: [
      { id: "201", title: "Design mockup", description: "Create visual layout in Figma for desktop and mobile views.", status: "Done", priority: "High", dueDate: "2026-08-01" },
      { id: "202", title: "Setup Next.js site", description: "Initialize framework structure, Tailwind config, and basic navigation.", status: "Done", priority: "Medium", dueDate: "2026-08-03" },
    ]
  },
  "3": {
    id: 3,
    title: "Weather App",
    description: "A location-based weather tracking system retrieving metrics from OpenWeather API.",
    status: "Planning",
    tasks: [
      { id: "301", title: "Research APIs", description: "Compare accuracy, latency, and free-tier access rules of various weather intelligence endpoints.", status: "To Do", priority: "Low", dueDate: "2026-08-15" }
    ]
  }
};

interface ProjectDetailsPageProps {
  params: Promise<{ id: string }>;
}

export default function ProjectDetailsPage({ params }: ProjectDetailsPageProps) {
  const { id } = use(params);
  const project = projectsData[id];

  const [taskList, setTaskList] = useState<Task[]>(project?.tasks || []);

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

  const handleDeleteTask = (taskId: string | number) => {
    setTaskList(prev => prev.filter(t => t.id !== taskId));
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

  const todoTasks = taskList.filter(t => t.status === "To Do");
  const inProgressTasks = taskList.filter(t => t.status === "In Progress");
  const doneTasks = taskList.filter(t => t.status === "Done");

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
              <Button onClick={() => alert("Add Task modal will be added on Day 22!")}>
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
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
