"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Task } from "@/components/projects/TaskCard";

export interface Project {
  id: string;
  title: string;
  description: string;
  status: "Planning" | "In Progress" | "Completed";
  tasks: Task[];
}

interface ProjectContextType {
  projects: Project[];
  addProject: (title: string, description: string, status?: "Planning" | "In Progress" | "Completed") => void;
  editProject: (id: string, updates: Partial<Omit<Project, "id" | "tasks">>) => void;
  deleteProject: (id: string) => void;
  addTask: (projectId: string, task: Omit<Task, "id">) => void;
  deleteTask: (projectId: string, taskId: string | number) => void;
  updateTaskStatus: (projectId: string, taskId: string | number, status: "To Do" | "In Progress" | "Done") => void;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

const defaultProjects: Project[] = [
  {
    id: "1",
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
  {
    id: "2",
    title: "Portfolio Website",
    description: "Personal developer portfolio to showcase skills, experience, and projects to potential employers.",
    status: "Completed",
    tasks: [
      { id: "201", title: "Design mockup", description: "Create visual layout in Figma for desktop and mobile views.", status: "Done", priority: "High", dueDate: "2026-08-01" },
      { id: "202", title: "Setup Next.js site", description: "Initialize framework structure, Tailwind config, and basic navigation.", status: "Done", priority: "Medium", dueDate: "2026-08-03" },
    ]
  },
  {
    id: "3",
    title: "Weather App",
    description: "A location-based weather tracking system retrieving metrics from OpenWeather API.",
    status: "Planning",
    tasks: [
      { id: "301", title: "Research APIs", description: "Compare accuracy, latency, and free-tier access rules of various weather intelligence endpoints.", status: "To Do", priority: "Low", dueDate: "2026-08-15" }
    ]
  }
];

export function ProjectProvider({ children }: { children: React.ReactNode }) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load projects from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("devtrack_projects");
      if (stored) {
        try {
          setProjects(JSON.parse(stored));
        } catch (e) {
          console.error("Failed to parse stored projects", e);
          setProjects(defaultProjects);
        }
      } else {
        setProjects(defaultProjects);
        localStorage.setItem("devtrack_projects", JSON.stringify(defaultProjects));
      }
      setIsLoaded(true);
    }
  }, []);

  // Sync projects to localStorage on change
  useEffect(() => {
    if (isLoaded && typeof window !== "undefined") {
      localStorage.setItem("devtrack_projects", JSON.stringify(projects));
    }
  }, [projects, isLoaded]);

  const addProject = (title: string, description: string, status: "Planning" | "In Progress" | "Completed" = "Planning") => {
    const newProject: Project = {
      id: Math.random().toString(36).substr(2, 9),
      title,
      description,
      status,
      tasks: []
    };
    setProjects(prev => [...prev, newProject]);
  };

  const editProject = (id: string, updates: Partial<Omit<Project, "id" | "tasks">>) => {
    setProjects(prev =>
      prev.map(p => (p.id === id ? { ...p, ...updates } : p))
    );
  };

  const deleteProject = (id: string) => {
    setProjects(prev => prev.filter(p => p.id !== id));
  };

  const addTask = (projectId: string, taskData: Omit<Task, "id">) => {
    const newTask: Task = {
      ...taskData,
      id: Math.random().toString(36).substr(2, 9)
    };
    setProjects(prev =>
      prev.map(p => {
        if (p.id === projectId) {
          return {
            ...p,
            tasks: [...p.tasks, newTask]
          };
        }
        return p;
      })
    );
  };

  const deleteTask = (projectId: string, taskId: string | number) => {
    setProjects(prev =>
      prev.map(p => {
        if (p.id === projectId) {
          return {
            ...p,
            tasks: p.tasks.filter(t => t.id !== taskId)
          };
        }
        return p;
      })
    );
  };

  const updateTaskStatus = (projectId: string, taskId: string | number, status: "To Do" | "In Progress" | "Done") => {
    setProjects(prev =>
      prev.map(p => {
        if (p.id === projectId) {
          return {
            ...p,
            tasks: p.tasks.map(t => (t.id === taskId ? { ...t, status } : t))
          };
        }
        return p;
      })
    );
  };

  return (
    <ProjectContext.Provider
      value={{
        projects,
        addProject,
        editProject,
        deleteProject,
        addTask,
        deleteTask,
        updateTaskStatus
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
}

export function useProjects() {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error("useProjects must be used within a ProjectProvider");
  }
  return context;
}
