'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';

interface Contact {
  email: string;
  formEnabled: boolean;
  formspreeEndpoint: string;
  availableForWork: boolean;
  availabilityNote: string;
  preferredContact: string;
  calendlyUrl: string;
}

export default function ContactPage() {
  const [contact, setContact] = useState<Contact | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const loadContact = async () => {
      try {
        const data = await api.getContact<Contact>();
        setContact(data);
      } catch (error) {
        setMessage('Failed to load contact');
      } finally {
        setLoading(false);
      }
    };

    loadContact();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    if (!contact) return;

    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setContact({
      ...contact,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contact) return;

    setSaving(true);
    try {
      await api.updateContact(contact);
      setMessage('Contact settings updated successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Failed to update contact');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Contact Settings</h1>

      {message && (
        <div className="mb-4 p-4 rounded bg-blue-50 text-blue-800">
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
        <div>
          <label className="block text-sm font-semibold mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={contact?.email || ''}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Preferred Contact Method</label>
          <select
            name="preferredContact"
            value={contact?.preferredContact || ''}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
          >
            <option value="email">Email</option>
            <option value="phone">Phone</option>
            <option value="form">Form</option>
            <option value="calendar">Calendar</option>
          </select>
        </div>

        <div>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="availableForWork"
              checked={contact?.availableForWork || false}
              onChange={handleChange}
              className="w-4 h-4"
            />
            <span className="font-semibold">Available for Work</span>
          </label>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Availability Note</label>
          <textarea
            name="availabilityNote"
            value={contact?.availabilityNote || ''}
            onChange={handleChange}
            rows={3}
            className="w-full px-4 py-2 border rounded"
          />
        </div>

        <div>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="formEnabled"
              checked={contact?.formEnabled || false}
              onChange={handleChange}
              className="w-4 h-4"
            />
            <span className="font-semibold">Enable Contact Form</span>
          </label>
        </div>

        {contact?.formEnabled && (
          <div>
            <label className="block text-sm font-semibold mb-2">Formspree Endpoint</label>
            <input
              type="text"
              name="formspreeEndpoint"
              value={contact?.formspreeEndpoint || ''}
              onChange={handleChange}
              placeholder="https://formspree.io/f/..."
              className="w-full px-4 py-2 border rounded"
            />
          </div>
        )}

        <div>
          <label className="block text-sm font-semibold mb-2">Calendly URL (optional)</label>
          <input
            type="url"
            name="calendlyUrl"
            value={contact?.calendlyUrl || ''}
            onChange={handleChange}
            placeholder="https://calendly.com/..."
            className="w-full px-4 py-2 border rounded"
          />
        </div>

        <button
          type="submit"
          disabled={saving}
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {saving ? 'Saving...' : 'Save Settings'}
        </button>
      </form>
    </div>
  );
}
