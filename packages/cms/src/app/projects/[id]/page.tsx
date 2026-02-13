'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
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

export default function ProjectEditPage() {
  const params = useParams();
  const router = useRouter();
  const projectId = params.id as string;

  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const loadProject = async () => {
      try {
        const data = await api.getProject<Project>(projectId);
        setProject(data);
      } catch (error) {
        setMessage('Failed to load project');
      } finally {
        setLoading(false);
      }
    };

    loadProject();
  }, [projectId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    if (!project) return;

    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setProject({
      ...project,
      [name]: type === 'checkbox' ? checked : type === 'number' ? parseInt(value) : value,
    });
  };

  const handleTechStackChange = (index: number, value: string) => {
    if (!project) return;
    const updated = [...project.techStack];
    updated[index] = value;
    setProject({ ...project, techStack: updated });
  };

  const addTech = () => {
    if (!project) return;
    setProject({ ...project, techStack: [...project.techStack, ''] });
  };

  const removeTech = (index: number) => {
    if (!project) return;
    setProject({
      ...project,
      techStack: project.techStack.filter((_, i) => i !== index),
    });
  };

  const handleTagsChange = (index: number, value: string) => {
    if (!project) return;
    const updated = [...project.tags];
    updated[index] = value;
    setProject({ ...project, tags: updated });
  };

  const addTag = () => {
    if (!project) return;
    setProject({ ...project, tags: [...project.tags, ''] });
  };

  const removeTag = (index: number) => {
    if (!project) return;
    setProject({
      ...project,
      tags: project.tags.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!project) return;

    setSaving(true);
    try {
      await api.updateProject(projectId, project);
      setMessage('Project updated successfully!');
      setTimeout(() => {
        router.push('/projects');
      }, 1500);
    } catch (error) {
      setMessage('Failed to update project');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Edit Project</h1>

      {message && (
        <div className="mb-4 p-4 rounded bg-blue-50 text-blue-800">
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
        <div>
          <label className="block text-sm font-semibold mb-2">Title</label>
          <input
            type="text"
            name="title"
            value={project?.title || ''}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Slug</label>
          <input
            type="text"
            name="slug"
            value={project?.slug || ''}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Description</label>
          <textarea
            name="description"
            value={project?.description || ''}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-2 border rounded"
          />
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold mb-2">Status</label>
            <select
              name="status"
              value={project?.status || 'wip'}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded"
            >
              <option value="live">Live</option>
              <option value="complete">Complete</option>
              <option value="wip">WIP</option>
              <option value="archived">Archived</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Year</label>
            <input
              type="number"
              name="year"
              value={project?.year || new Date().getFullYear()}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded"
            />
          </div>
        </div>

        <div className="flex gap-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="featured"
              checked={project?.featured || false}
              onChange={handleChange}
              className="w-4 h-4"
            />
            <span>Featured</span>
          </label>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Image URL</label>
          <input
            type="text"
            name="imageUrl"
            value={project?.imageUrl || ''}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
            placeholder="https://..."
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Repository URL</label>
          <input
            type="url"
            name="repoUrl"
            value={project?.repoUrl || ''}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
            placeholder="https://github.com/..."
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Live URL (optional)</label>
          <input
            type="url"
            name="liveUrl"
            value={project?.liveUrl || ''}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
            placeholder="https://..."
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Tech Stack</label>
          <div className="space-y-2 mb-2">
            {project?.techStack.map((tech, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  value={tech}
                  onChange={(e) => handleTechStackChange(index, e.target.value)}
                  className="flex-1 px-4 py-2 border rounded"
                />
                <button
                  type="button"
                  onClick={() => removeTech(index)}
                  className="px-4 py-2 bg-red-600 text-white rounded"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={addTech}
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            Add Tech
          </button>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Tags</label>
          <div className="space-y-2 mb-2">
            {project?.tags.map((tag, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  value={tag}
                  onChange={(e) => handleTagsChange(index, e.target.value)}
                  className="flex-1 px-4 py-2 border rounded"
                />
                <button
                  type="button"
                  onClick={() => removeTag(index)}
                  className="px-4 py-2 bg-red-600 text-white rounded"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={addTag}
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            Add Tag
          </button>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {saving ? 'Saving...' : 'Save Project'}
        </button>
      </form>
    </div>
  );
}
