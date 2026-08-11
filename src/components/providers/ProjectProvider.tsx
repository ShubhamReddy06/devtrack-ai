"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
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
  addProject: (title: string, description: string, status?: "Planning" | "In Progress" | "Completed") => Promise<void>;
  editProject: (id: string, updates: Partial<Omit<Project, "id" | "tasks">>) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
  addTask: (projectId: string, task: Omit<Task, "id">) => Promise<void>;
  deleteTask: (projectId: string, taskId: string | number) => Promise<void>;
  updateTaskStatus: (projectId: string, taskId: string | number, status: "To Do" | "In Progress" | "Done") => Promise<void>;
  logActivity: (title: string) => void;
  clearActivities: () => void;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

const API_BASE = "http://localhost:5000/api";

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

  // Fetch projects from backend on mount
  const fetchProjects = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE}/projects`);
      setProjects(res.data);
    } catch (e) {
      console.warn("Failed to fetch projects from backend API server, falling back to local database:", e);
      // Fallback to local storage if API server is offline
      if (typeof window !== "undefined") {
        const storedProjects = localStorage.getItem("devtrack_projects");
        if (storedProjects) {
          try {
            setProjects(JSON.parse(storedProjects));
          } catch (err) {
            setProjects(defaultProjects);
          }
        } else {
          setProjects(defaultProjects);
        }
      }
    } finally {
      setLoading(false);
      setIsLoaded(true);
    }
  };

  useEffect(() => {
    fetchProjects();

    // Load activities from localStorage
    if (typeof window !== "undefined") {
      const storedActivities = localStorage.getItem("devtrack_activities");
      if (storedActivities) {
        try {
          const parsedActs: Activity[] = JSON.parse(storedActivities);
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
    }
  }, []);

  // Sync activities to localStorage on change
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
    setActivities(prev => [newActivity, ...prev].slice(0, 20));
  };

  const clearActivities = () => {
    setActivities([]);
  };

  const addProject = async (title: string, description: string, status: "Planning" | "In Progress" | "Completed" = "Planning") => {
    try {
      const res = await axios.post(`${API_BASE}/projects`, { title, description, status });
      setProjects(prev => [...prev, res.data]);
      logActivity(`Created Project "${title}"`);
    } catch (e) {
      console.error("Failed to create project:", e);
    }
  };

  const editProject = async (id: string, updates: Partial<Omit<Project, "id" | "tasks">>) => {
    try {
      const res = await axios.put(`${API_BASE}/projects/${id}`, updates);
      setProjects(prev =>
        prev.map(p => (p.id === id ? { ...p, ...res.data } : p))
      );
      logActivity(`Updated Project "${updates.title || 'details'}"`);
    } catch (e) {
      console.error("Failed to edit project:", e);
    }
  };

  const deleteProject = async (id: string) => {
    try {
      const oldProj = projects.find(p => p.id === id);
      await axios.delete(`${API_BASE}/projects/${id}`);
      setProjects(prev => prev.filter(p => p.id !== id));
      if (oldProj) {
        logActivity(`Deleted Project "${oldProj.title}"`);
      }
    } catch (e) {
      console.error("Failed to delete project:", e);
    }
  };

  const addTask = async (projectId: string, taskData: Omit<Task, "id">) => {
    try {
      const res = await axios.post(`${API_BASE}/tasks/${projectId}`, taskData);
      const proj = projects.find(p => p.id === projectId);
      
      setProjects(prev =>
        prev.map(p => {
          if (p.id === projectId) {
            return {
              ...p,
              tasks: [...p.tasks, res.data]
            };
          }
          return p;
        })
      );
      if (proj) {
        logActivity(`Added task "${taskData.title}" to project "${proj.title}"`);
      }
    } catch (e) {
      console.error("Failed to add task:", e);
    }
  };

  const deleteTask = async (projectId: string, taskId: string | number) => {
    try {
      const proj = projects.find(p => p.id === projectId);
      const task = proj?.tasks.find(t => t.id === taskId);
      
      await axios.delete(`${API_BASE}/tasks/${taskId}`);
      
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
    } catch (e) {
      console.error("Failed to delete task:", e);
    }
  };

  const updateTaskStatus = async (projectId: string, taskId: string | number, status: "To Do" | "In Progress" | "Done") => {
    try {
      const proj = projects.find(p => p.id === projectId);
      const task = proj?.tasks.find(t => t.id === taskId);
      
      const res = await axios.put(`${API_BASE}/tasks/${taskId}`, { status });
      
      setProjects(prev =>
        prev.map(p => {
          if (p.id === projectId) {
            return {
              ...p,
              tasks: p.tasks.map(t => (t.id === taskId ? { ...t, status: res.data.status } : t))
            };
          }
          return p;
        })
      );
      if (proj && task) {
        logActivity(`Moved task "${task.title}" to "${status}" inside project "${proj.title}"`);
      }
    } catch (e) {
      console.error("Failed to update task status:", e);
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
