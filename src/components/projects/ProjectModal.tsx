"use client";

import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Project } from "@/components/providers/ProjectProvider";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (title: string, description: string, status: "Planning" | "In Progress" | "Completed") => void;
  project?: Project;
}

export default function ProjectModal({
  isOpen,
  onClose,
  onSubmit,
  project,
}: ProjectModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<"Planning" | "In Progress" | "Completed">("Planning");
  const [error, setError] = useState("");

  useEffect(() => {
    if (project) {
      setTitle(project.title);
      setDescription(project.description);
      setStatus(project.status);
    } else {
      setTitle("");
      setDescription("");
      setStatus("Planning");
    }
    setError("");
  }, [project, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!title.trim()) {
      setError("Project title is required");
      return;
    }

    if (!description.trim()) {
      setError("Project description is required");
      return;
    }

    onSubmit(title.trim(), description.trim(), status);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm transition-opacity duration-300">
      <div 
        className="w-full max-w-md transform rounded-2xl bg-white dark:bg-slate-900 p-6 shadow-2xl border border-gray-200 dark:border-slate-800 transition-all duration-300 scale-100 flex flex-col gap-4 text-gray-900 dark:text-white"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-gray-100 dark:border-slate-800 pb-3">
          <h3 className="text-xl font-bold tracking-tight">
            {project ? "Edit Project" : "Create New Project"}
          </h3>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-slate-800 transition-all cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-500 dark:text-slate-400 uppercase tracking-wider">
              Project Title
            </label>
            <Input
              type="text"
              placeholder="e.g. Portfolio Website"
              value={title}
              onChange={(e) => { setTitle(e.target.value); setError(""); }}
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-500 dark:text-slate-400 uppercase tracking-wider">
              Project Description
            </label>
            <textarea
              placeholder="Provide a detailed description of the project goal..."
              value={description}
              onChange={(e) => { setDescription(e.target.value); setError(""); }}
              className="w-full min-h-[100px] rounded-xl px-4 py-3 border border-gray-300 dark:border-slate-700 bg-gray-50 dark:bg-slate-800/80 text-gray-900 dark:text-white placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm leading-relaxed"
            />
          </div>

          {project && (
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-500 dark:text-slate-400 uppercase tracking-wider">
                Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="w-full rounded-xl px-4 py-3 border border-gray-300 dark:border-slate-700 bg-gray-50 dark:bg-slate-800/80 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm cursor-pointer"
              >
                <option value="Planning">Planning</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          )}

          {error && (
            <p className="text-xs text-red-500 font-medium">
              ⚠️ {error}
            </p>
          )}

          <div className="flex gap-3 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-xl px-6 py-3 font-semibold border border-gray-300 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-800 transition-all active:scale-95 text-sm cursor-pointer text-gray-700 dark:text-slate-300"
            >
              Cancel
            </button>
            <div className="flex-1">
              <Button type="submit">
                {project ? "Save Changes" : "Create"}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
