'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { randomUUID } from 'crypto';

interface Skill {
  name: string;
  level: 'expert' | 'proficient' | 'learning' | 'familiar';
}

interface SkillCategory {
  id: string;
  name: string;
  skills: Skill[];
}

interface SkillsData {
  categories: SkillCategory[];
}

export default function SkillsPage() {
  const [skills, setSkills] = useState<SkillsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const loadSkills = async () => {
      try {
        const data = await api.getSkills<SkillsData>();
        setSkills(data);
      } catch (error) {
        setMessage('Failed to load skills');
      } finally {
        setLoading(false);
      }
    };

    loadSkills();
  }, []);

  const handleCategoryNameChange = (categoryId: string, newName: string) => {
    if (!skills) return;
    setSkills({
      ...skills,
      categories: skills.categories.map((cat) =>
        cat.id === categoryId ? { ...cat, name: newName } : cat
      ),
    });
  };

  const handleSkillNameChange = (categoryId: string, skillIndex: number, newName: string) => {
    if (!skills) return;
    setSkills({
      ...skills,
      categories: skills.categories.map((cat) =>
        cat.id === categoryId
          ? {
              ...cat,
              skills: cat.skills.map((skill, idx) =>
                idx === skillIndex ? { ...skill, name: newName } : skill
              ),
            }
          : cat
      ),
    });
  };

  const handleSkillLevelChange = (
    categoryId: string,
    skillIndex: number,
    newLevel: Skill['level']
  ) => {
    if (!skills) return;
    setSkills({
      ...skills,
      categories: skills.categories.map((cat) =>
        cat.id === categoryId
          ? {
              ...cat,
              skills: cat.skills.map((skill, idx) =>
                idx === skillIndex ? { ...skill, level: newLevel } : skill
              ),
            }
          : cat
      ),
    });
  };

  const addSkillToCategory = (categoryId: string) => {
    if (!skills) return;
    setSkills({
      ...skills,
      categories: skills.categories.map((cat) =>
        cat.id === categoryId
          ? {
              ...cat,
              skills: [...cat.skills, { name: 'New Skill', level: 'learning' as const }],
            }
          : cat
      ),
    });
  };

  const removeSkill = (categoryId: string, skillIndex: number) => {
    if (!skills) return;
    setSkills({
      ...skills,
      categories: skills.categories.map((cat) =>
        cat.id === categoryId
          ? { ...cat, skills: cat.skills.filter((_, idx) => idx !== skillIndex) }
          : cat
      ),
    });
  };

  const addCategory = () => {
    if (!skills) return;
    setSkills({
      ...skills,
      categories: [
        ...skills.categories,
        { id: Math.random().toString(), name: 'New Category', skills: [] },
      ],
    });
  };

  const removeCategory = (categoryId: string) => {
    if (!skills) return;
    setSkills({
      ...skills,
      categories: skills.categories.filter((cat) => cat.id !== categoryId),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!skills) return;

    setSaving(true);
    try {
      await api.updateSkills(skills);
      setMessage('Skills updated successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Failed to update skills');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Manage Skills</h1>

      {message && (
        <div className="mb-4 p-4 rounded bg-blue-50 text-blue-800">
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="max-w-4xl space-y-8">
        {skills?.categories.map((category) => (
          <div key={category.id} className="bg-white p-6 rounded border">
            <div className="flex justify-between items-center mb-4">
              <input
                type="text"
                value={category.name}
                onChange={(e) => handleCategoryNameChange(category.id, e.target.value)}
                className="text-2xl font-bold px-4 py-2 border rounded flex-1 mr-4"
              />
              <button
                type="button"
                onClick={() => removeCategory(category.id)}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Remove
              </button>
            </div>

            <div className="space-y-3 mb-4">
              {category.skills.map((skill, skillIndex) => (
                <div key={skillIndex} className="flex gap-4">
                  <input
                    type="text"
                    value={skill.name}
                    onChange={(e) =>
                      handleSkillNameChange(category.id, skillIndex, e.target.value)
                    }
                    className="flex-1 px-4 py-2 border rounded"
                    placeholder="Skill name"
                  />
                  <select
                    value={skill.level}
                    onChange={(e) =>
                      handleSkillLevelChange(
                        category.id,
                        skillIndex,
                        e.target.value as Skill['level']
                      )
                    }
                    className="px-4 py-2 border rounded"
                  >
                    <option value="expert">Expert</option>
                    <option value="proficient">Proficient</option>
                    <option value="learning">Learning</option>
                    <option value="familiar">Familiar</option>
                  </select>
                  <button
                    type="button"
                    onClick={() => removeSkill(category.id, skillIndex)}
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => addSkillToCategory(category.id)}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Add Skill
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={addCategory}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 mb-4"
        >
          Add Category
        </button>

        <button
          type="submit"
          disabled={saving}
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {saving ? 'Saving...' : 'Save Skills'}
        </button>
      </form>
    </div>
  );
}
