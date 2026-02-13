'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';

interface Profile {
  name: string;
  tagline: string;
  bio: string;
  avatarUrl: string;
  location: string;
  resumeUrl: string;
  social: {
    github: string;
    linkedin: string;
    twitter: string;
    email: string;
  };
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await api.getProfile<Profile>();
        setProfile(data);
      } catch (error) {
        setMessage('Failed to load profile');
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!profile) return;

    const { name, value } = e.target;

    if (name.startsWith('social.')) {
      const socialKey = name.split('.')[1];
      setProfile({
        ...profile,
        social: {
          ...profile.social,
          [socialKey]: value,
        },
      });
    } else {
      setProfile({
        ...profile,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;

    setSaving(true);
    try {
      await api.updateProfile(profile);
      setMessage('Profile updated successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Edit Profile</h1>

      {message && (
        <div className="mb-4 p-4 rounded bg-blue-50 text-blue-800">
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
        <div>
          <label className="block text-sm font-semibold mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={profile?.name || ''}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Tagline</label>
          <input
            type="text"
            name="tagline"
            value={profile?.tagline || ''}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Bio</label>
          <textarea
            name="bio"
            value={profile?.bio || ''}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-2 border rounded"
          />
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold mb-2">Avatar URL</label>
            <input
              type="text"
              name="avatarUrl"
              value={profile?.avatarUrl || ''}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Resume URL</label>
            <input
              type="text"
              name="resumeUrl"
              value={profile?.resumeUrl || ''}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold mb-2">Location</label>
            <input
              type="text"
              name="location"
              value={profile?.location || ''}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded"
            />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Social Links</h3>
          <div className="space-y-4">
            {Object.entries(profile?.social || {}).map(([key, value]) => (
              <div key={key}>
                <label className="block text-sm font-medium mb-2 capitalize">
                  {key}
                </label>
                <input
                  type="text"
                  name={`social.${key}`}
                  value={value}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded"
                />
              </div>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {saving ? 'Saving...' : 'Save Profile'}
        </button>
      </form>
    </div>
  );
}
