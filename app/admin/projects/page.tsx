"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Search, MoreVertical, Edit2, Trash2, Image as ImageIcon, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Type definitions (Mock)
type Project = {
  id: string;
  title: string;
  category: string;
  status: "Published" | "Draft";
  views: number;
};

// Mock Data
const initialProjects: Project[] = [
  { id: "1", title: "E-commerce Dashboard", category: "Web App", status: "Published", views: 1240 },
  { id: "2", title: "Finance Mobile App", category: "Mobile", status: "Draft", views: 0 },
  { id: "3", title: "AI Generator", category: "SaaS", status: "Published", views: 850 },
];

const projectSchema = z.object({
  title: z.string().min(3, "Title is required"),
  slug: z.string().min(3, "Slug is required"),
  category: z.string(),
  description: z.string().optional(),
});

type ProjectFormData = z.infer<typeof projectSchema>;

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
  });

  const onSubmit = (data: ProjectFormData) => {
    // Simulate API Call
    const newProject: Project = {
      id: Math.random().toString(36).substr(2, 9),
      title: data.title,
      category: data.category,
      status: "Draft",
      views: 0,
    };
    
    setProjects([newProject, ...projects]);
    setIsDrawerOpen(false);
    reset();
    // In real app: invalidate queries here
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this project?")) {
      setProjects(projects.filter(p => p.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
        <button 
          onClick={() => { setEditingId(null); setIsDrawerOpen(true); }}
          className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-md font-medium text-sm hover:opacity-90 transition-opacity"
        >
          <Plus size={16} />
          Add Project
        </button>
      </div>

      {/* Filters & Search */}
      <div className="flex items-center gap-3 mb-6">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input 
            type="text" 
            placeholder="Search projects..." 
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-sm focus:ring-2 focus:ring-black dark:focus:ring-white focus:outline-none"
          />
        </div>
      </div>

      {/* Projects Table */}
      <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 dark:bg-zinc-800/50 border-b border-gray-100 dark:border-zinc-800">
            <tr>
              <th className="px-6 py-3 font-medium text-gray-500">Title</th>
              <th className="px-6 py-3 font-medium text-gray-500">Category</th>
              <th className="px-6 py-3 font-medium text-gray-500">Status</th>
              <th className="px-6 py-3 font-medium text-gray-500 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-zinc-800">
            {projects.map((project) => (
              <tr key={project.id} className="hover:bg-gray-50 dark:hover:bg-zinc-900/50 transition-colors">
                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{project.title}</td>
                <td className="px-6 py-4 text-gray-500">{project.category}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    project.status === "Published" 
                      ? "bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400" 
                      : "bg-yellow-50 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400"
                  }`}>
                    {project.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button className="p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-full text-gray-500">
                      <Edit2 size={16} />
                    </button>
                    <button 
                      onClick={() => handleDelete(project.id)}
                      className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full text-red-500"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Project Drawer (Simplified) */}
      <AnimatePresence>
        {isDrawerOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDrawerOpen(false)}
              className="fixed inset-0 bg-black z-40"
            />
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-full w-full max-w-lg bg-white dark:bg-zinc-950 border-l border-gray-200 dark:border-zinc-800 shadow-2xl z-50 flex flex-col"
            >
              <div className="p-6 border-b border-gray-100 dark:border-zinc-800 flex items-center justify-between">
                <h2 className="text-xl font-bold">Create Project</h2>
                <button onClick={() => setIsDrawerOpen(false)} className="p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-full">
                  <X size={20} />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-6">
                <form id="project-form" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Project Title</label>
                    <input 
                      {...register("title")}
                      className="w-full p-2 rounded-md border border-gray-200 dark:border-zinc-800 bg-transparent" 
                      placeholder="e.g. Marketing Website"
                    />
                    {errors.title && <p className="text-red-500 text-xs">{errors.title.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Slug</label>
                    <input 
                      {...register("slug")}
                      className="w-full p-2 rounded-md border border-gray-200 dark:border-zinc-800 bg-transparent" 
                      placeholder="marketing-website"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Category</label>
                    <select 
                      {...register("category")}
                      className="w-full p-2 rounded-md border border-gray-200 dark:border-zinc-800 bg-transparent"
                    >
                      <option value="Web App">Web App</option>
                      <option value="Mobile App">Mobile App</option>
                      <option value="Design">Design</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Description</label>
                    <textarea 
                      {...register("description")}
                      rows={4}
                      className="w-full p-2 rounded-md border border-gray-200 dark:border-zinc-800 bg-transparent resize-none"
                      placeholder="Short description..."
                    />
                  </div>

                  <div className="p-4 border border-dashed border-gray-300 dark:border-zinc-700 rounded-lg text-center">
                    <ImageIcon className="mx-auto text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500">Drag and drop images here</p>
                  </div>
                </form>
              </div>

              <div className="p-6 border-t border-gray-100 dark:border-zinc-800 flex justify-end gap-3">
                <button 
                  onClick={() => setIsDrawerOpen(false)}
                  className="px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-100 dark:hover:bg-zinc-800"
                >
                  Cancel
                </button>
                <button 
                  form="project-form"
                  type="submit"
                  className="px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-md text-sm font-medium hover:opacity-90"
                >
                  Save Project
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
