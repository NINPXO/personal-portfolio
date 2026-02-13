'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { api } from '@/lib/api';

interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  techStack: string[];
  tags: string[];
  liveUrl: string | null;
  repoUrl: string;
  imageUrl: string | null;
  featured: boolean;
  status: 'live' | 'complete' | 'wip' | 'archived';
  year: number;
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await api.getProjects<Project>();
        setProjects(data);
      } catch (error) {
        setMessage('Failed to load projects');
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;

    try {
      await api.deleteProject(id);
      setProjects(projects.filter((p) => p.id !== id));
      setMessage('Project deleted successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Failed to delete project');
    }
  };

  const handleAddNew = async () => {
    try {
      const newProject: Partial<Project> = {
        title: 'New Project',
        slug: 'new-project',
        description: '',
        techStack: [],
        tags: [],
        liveUrl: null,
        repoUrl: '',
        imageUrl: null,
        featured: false,
        status: 'wip',
        year: new Date().getFullYear(),
      };
      const result = await api.createProject(newProject);
      setProjects([...projects, result.project]);
    } catch (error) {
      setMessage('Failed to create project');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Projects</h1>
        <button
          onClick={handleAddNew}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          + New Project
        </button>
      </div>

      {message && (
        <div className="mb-4 p-4 rounded bg-blue-50 text-blue-800">
          {message}
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-4 text-left">Title</th>
              <th className="border p-4 text-left">Status</th>
              <th className="border p-4 text-left">Featured</th>
              <th className="border p-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.id} className="hover:bg-gray-50">
                <td className="border p-4">{project.title}</td>
                <td className="border p-4">
                  <span className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded">
                    {project.status}
                  </span>
                </td>
                <td className="border p-4">
                  {project.featured ? '✓' : '—'}
                </td>
                <td className="border p-4 space-x-2">
                  <Link
                    href={`/projects/${project.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(project.id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {projects.length === 0 && (
        <div className="text-center py-12 text-gray-600">
          <p>No projects yet. Create your first one!</p>
        </div>
      )}
    </div>
  );
}
