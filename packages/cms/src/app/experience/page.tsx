'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';

interface Experience {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string | null;
  current: boolean;
  location: string;
  description: string;
  highlights: string[];
  techStack: string[];
}

export default function ExperiencePage() {
  const [experience, setExperience] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    const loadExperience = async () => {
      try {
        const data = await api.getExperience<Experience>();
        setExperience(data);
      } catch (error) {
        setMessage('Failed to load experience');
      } finally {
        setLoading(false);
      }
    };

    loadExperience();
  }, []);

  const handleChange = (index: number, field: keyof Experience, value: unknown) => {
    const updated = [...experience];
    (updated[index] as Record<string, unknown>)[field] = value;
    setExperience(updated);
  };

  const handleHighlightChange = (index: number, highlightIndex: number, value: string) => {
    const updated = [...experience];
    updated[index].highlights[highlightIndex] = value;
    setExperience(updated);
  };

  const handleTechStackChange = (index: number, techIndex: number, value: string) => {
    const updated = [...experience];
    updated[index].techStack[techIndex] = value;
    setExperience(updated);
  };

  const addHighlight = (index: number) => {
    const updated = [...experience];
    updated[index].highlights.push('');
    setExperience(updated);
  };

  const removeHighlight = (index: number, highlightIndex: number) => {
    const updated = [...experience];
    updated[index].highlights.splice(highlightIndex, 1);
    setExperience(updated);
  };

  const addTech = (index: number) => {
    const updated = [...experience];
    updated[index].techStack.push('');
    setExperience(updated);
  };

  const removeTech = (index: number, techIndex: number) => {
    const updated = [...experience];
    updated[index].techStack.splice(techIndex, 1);
    setExperience(updated);
  };

  const addExperience = () => {
    setExperience([
      ...experience,
      {
        id: Math.random().toString(),
        company: '',
        role: '',
        startDate: new Date().toISOString().slice(0, 7),
        endDate: null,
        current: false,
        location: '',
        description: '',
        highlights: [],
        techStack: [],
      },
    ]);
  };

  const removeExperience = async (index: number) => {
    const exp = experience[index];
    if (!exp.id.includes('random')) {
      try {
        await api.deleteExperience(exp.id);
      } catch (error) {
        setMessage('Failed to delete experience entry');
        return;
      }
    }
    const updated = experience.filter((_, i) => i !== index);
    setExperience(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      // Update all changed items
      await Promise.all(
        experience
          .filter((exp) => !exp.id.includes('random'))
          .map((exp) => api.updateExperience(exp.id, exp))
      );

      // Create new items
      await Promise.all(
        experience
          .filter((exp) => exp.id.includes('random'))
          .map((exp) => api.createExperience(exp))
      );

      setMessage('Experience updated successfully!');
      setTimeout(() => setMessage(''), 3000);

      // Reload data
      const data = await api.getExperience<Experience>();
      setExperience(data);
    } catch (error) {
      setMessage('Failed to update experience');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Manage Experience</h1>

      {message && (
        <div className="mb-4 p-4 rounded bg-blue-50 text-blue-800">
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="max-w-4xl space-y-6">
        {experience.map((exp, index) => (
          <div
            key={exp.id}
            className="bg-white p-6 rounded border cursor-pointer"
            onClick={() =>
              setExpandedId(expandedId === exp.id ? null : exp.id)
            }
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <h3 className="text-xl font-bold">{exp.role || 'New Entry'}</h3>
                <p className="text-gray-600">{exp.company || 'Company name'}</p>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  removeExperience(index);
                }}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>

            {expandedId === exp.id && (
              <div className="space-y-4 mt-4 border-t pt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Company</label>
                    <input
                      type="text"
                      value={exp.company}
                      onChange={(e) => handleChange(index, 'company', e.target.value)}
                      className="w-full px-4 py-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Role</label>
                    <input
                      type="text"
                      value={exp.role}
                      onChange={(e) => handleChange(index, 'role', e.target.value)}
                      className="w-full px-4 py-2 border rounded"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Start Date (YYYY-MM)</label>
                    <input
                      type="text"
                      value={exp.startDate}
                      onChange={(e) => handleChange(index, 'startDate', e.target.value)}
                      className="w-full px-4 py-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">End Date (YYYY-MM)</label>
                    <input
                      type="text"
                      value={exp.endDate || ''}
                      onChange={(e) => handleChange(index, 'endDate', e.target.value || null)}
                      className="w-full px-4 py-2 border rounded"
                    />
                  </div>
                  <div className="flex items-end">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={exp.current}
                        onChange={(e) => handleChange(index, 'current', e.target.checked)}
                        className="w-4 h-4"
                      />
                      <span>Current</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Location</label>
                  <input
                    type="text"
                    value={exp.location}
                    onChange={(e) => handleChange(index, 'location', e.target.value)}
                    className="w-full px-4 py-2 border rounded"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Description</label>
                  <textarea
                    value={exp.description}
                    onChange={(e) => handleChange(index, 'description', e.target.value)}
                    rows={3}
                    className="w-full px-4 py-2 border rounded"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Highlights</label>
                  <div className="space-y-2 mb-2">
                    {exp.highlights.map((highlight, hIdx) => (
                      <div key={hIdx} className="flex gap-2">
                        <input
                          type="text"
                          value={highlight}
                          onChange={(e) =>
                            handleHighlightChange(index, hIdx, e.target.value)
                          }
                          className="flex-1 px-4 py-2 border rounded"
                        />
                        <button
                          type="button"
                          onClick={() => removeHighlight(index, hIdx)}
                          className="px-4 py-2 bg-red-600 text-white rounded"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => addHighlight(index)}
                    className="px-4 py-2 bg-green-600 text-white rounded"
                  >
                    Add Highlight
                  </button>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Tech Stack</label>
                  <div className="space-y-2 mb-2">
                    {exp.techStack.map((tech, tIdx) => (
                      <div key={tIdx} className="flex gap-2">
                        <input
                          type="text"
                          value={tech}
                          onChange={(e) =>
                            handleTechStackChange(index, tIdx, e.target.value)
                          }
                          className="flex-1 px-4 py-2 border rounded"
                        />
                        <button
                          type="button"
                          onClick={() => removeTech(index, tIdx)}
                          className="px-4 py-2 bg-red-600 text-white rounded"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => addTech(index)}
                    className="px-4 py-2 bg-green-600 text-white rounded"
                  >
                    Add Tech
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}

        <button
          type="button"
          onClick={addExperience}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 mb-4"
        >
          Add Experience
        </button>

        <button
          type="submit"
          disabled={saving}
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {saving ? 'Saving...' : 'Save Experience'}
        </button>
      </form>
    </div>
  );
}
