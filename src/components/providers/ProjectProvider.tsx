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

export interface Activity {
  id: string;
  title: string;
  time: string;
  timestamp: number;
}

interface ProjectContextType {
  projects: Project[];
  activities: Activity[];
  loading: boolean;
  addProject: (title: string, description: string, status?: "Planning" | "In Progress" | "Completed") => void;
  editProject: (id: string, updates: Partial<Omit<Project, "id" | "tasks">>) => void;
  deleteProject: (id: string) => void;
  addTask: (projectId: string, task: Omit<Task, "id">) => void;
  deleteTask: (projectId: string, taskId: string | number) => void;
  updateTaskStatus: (projectId: string, taskId: string | number, status: "To Do" | "In Progress" | "Done") => void;
  logActivity: (title: string) => void;
  clearActivities: () => void;
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

const defaultActivities: Activity[] = [
  {
    id: "a1",
    title: "Created Project DevTrack AI",
    time: "2 hours ago",
    timestamp: Date.now() - 2 * 60 * 60 * 1000
  },
  {
    id: "a2",
    title: "Completed UI Design",
    time: "Yesterday",
    timestamp: Date.now() - 24 * 60 * 60 * 1000
  },
  {
    id: "a3",
    title: "Generated AI Report",
    time: "2 days ago",
    timestamp: Date.now() - 2 * 24 * 60 * 60 * 1000
  }
];

export function ProjectProvider({ children }: { children: React.ReactNode }) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  // Helper to format timestamps into relative time
  const getRelativeTime = (timestamp: number) => {
    const diff = Date.now() - timestamp;
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return "Just now";
    if (mins < 60) return `${mins}m ago`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    if (days === 1) return "Yesterday";
    return `${days} days ago`;
  };

  // Update activities relative time labels periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setActivities(prev =>
        prev.map(act => ({
          ...act,
          time: getRelativeTime(act.timestamp)
        }))
      );
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  // Load from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedProjects = localStorage.getItem("devtrack_projects");
      const storedActivities = localStorage.getItem("devtrack_activities");

      if (storedProjects) {
        try {
          setProjects(JSON.parse(storedProjects));
        } catch (e) {
          setProjects(defaultProjects);
        }
      } else {
        setProjects(defaultProjects);
        localStorage.setItem("devtrack_projects", JSON.stringify(defaultProjects));
      }

      if (storedActivities) {
        try {
          const parsedActs: Activity[] = JSON.parse(storedActivities);
          // Refresh the display time strings based on current clock
          setActivities(
            parsedActs.map(act => ({
              ...act,
              time: getRelativeTime(act.timestamp)
            }))
          );
        } catch (e) {
          setActivities(defaultActivities);
        }
      } else {
        setActivities(defaultActivities);
        localStorage.setItem("devtrack_activities", JSON.stringify(defaultActivities));
      }

      // Simulate a small loading state for UI wow factor spinner
      setTimeout(() => {
        setLoading(false);
        setIsLoaded(true);
      }, 600);
    }
  }, []);

  // Sync projects and activities to localStorage on change
  useEffect(() => {
    if (isLoaded && typeof window !== "undefined") {
      localStorage.setItem("devtrack_projects", JSON.stringify(projects));
    }
  }, [projects, isLoaded]);

  useEffect(() => {
    if (isLoaded && typeof window !== "undefined") {
      localStorage.setItem("devtrack_activities", JSON.stringify(activities));
    }
  }, [activities, isLoaded]);

  const logActivity = (title: string) => {
    const newActivity: Activity = {
      id: Math.random().toString(36).substr(2, 9),
      title,
      time: "Just now",
      timestamp: Date.now()
    };
    setActivities(prev => [newActivity, ...prev].slice(0, 20)); // Limit to recent 20 activities
  };

  const clearActivities = () => {
    setActivities([]);
  };

  const addProject = (title: string, description: string, status: "Planning" | "In Progress" | "Completed" = "Planning") => {
    const newProject: Project = {
      id: Math.random().toString(36).substr(2, 9),
      title,
      description,
      status,
      tasks: []
    };
    setProjects(prev => [...prev, newProject]);
    logActivity(`Created Project "${title}"`);
  };

  const editProject = (id: string, updates: Partial<Omit<Project, "id" | "tasks">>) => {
    const oldProj = projects.find(p => p.id === id);
    setProjects(prev =>
      prev.map(p => (p.id === id ? { ...p, ...updates } : p))
    );
    if (oldProj) {
      logActivity(`Updated Project "${updates.title || oldProj.title}" details`);
    }
  };

  const deleteProject = (id: string) => {
    const oldProj = projects.find(p => p.id === id);
    setProjects(prev => prev.filter(p => p.id !== id));
    if (oldProj) {
      logActivity(`Deleted Project "${oldProj.title}"`);
    }
  };

  const addTask = (projectId: string, taskData: Omit<Task, "id">) => {
    const newTask: Task = {
      ...taskData,
      id: Math.random().toString(36).substr(2, 9)
    };
    setProjects(prev =>
      prev.map(p => {
        if (p.id === projectId) {
          logActivity(`Added task "${taskData.title}" to project "${p.title}"`);
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
    const proj = projects.find(p => p.id === projectId);
    const task = proj?.tasks.find(t => t.id === taskId);
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
    if (proj && task) {
      logActivity(`Deleted task "${task.title}" from project "${proj.title}"`);
    }
  };

  const updateTaskStatus = (projectId: string, taskId: string | number, status: "To Do" | "In Progress" | "Done") => {
    const proj = projects.find(p => p.id === projectId);
    const task = proj?.tasks.find(t => t.id === taskId);
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
    if (proj && task) {
      logActivity(`Moved task "${task.title}" to "${status}" inside project "${proj.title}"`);
    }
  };

  return (
    <ProjectContext.Provider
      value={{
        projects,
        activities,
        loading,
        addProject,
        editProject,
        deleteProject,
        addTask,
        deleteTask,
        updateTaskStatus,
        logActivity,
        clearActivities
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
