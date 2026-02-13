'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { api } from '@/lib/api';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  publishedAt: string;
  updatedAt: string | null;
  tags: string[];
  published: boolean;
  readingTimeMinutes: number;
  externalUrl: string | null;
}

export default function BlogEditPage() {
  const params = useParams();
  const router = useRouter();
  const postId = params.id as string;

  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const loadPost = async () => {
      try {
        const data = await api.getBlogPost<BlogPost>(postId);
        setPost(data);
      } catch (error) {
        setMessage('Failed to load post');
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [postId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    if (!post) return;

    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setPost({
      ...post,
      [name]: type === 'checkbox' ? checked : type === 'number' ? parseInt(value) : value,
    });
  };

  const handleTagsChange = (index: number, value: string) => {
    if (!post) return;
    const updated = [...post.tags];
    updated[index] = value;
    setPost({ ...post, tags: updated });
  };

  const addTag = () => {
    if (!post) return;
    setPost({ ...post, tags: [...post.tags, ''] });
  };

  const removeTag = (index: number) => {
    if (!post) return;
    setPost({
      ...post,
      tags: post.tags.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!post) return;

    setSaving(true);
    try {
      await api.updateBlogPost(postId, post);
      setMessage('Post updated successfully!');
      setTimeout(() => {
        router.push('/blog');
      }, 1500);
    } catch (error) {
      setMessage('Failed to update post');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Edit Blog Post</h1>

      {message && (
        <div className="mb-4 p-4 rounded bg-blue-50 text-blue-800">
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="max-w-4xl space-y-6">
        <div>
          <label className="block text-sm font-semibold mb-2">Title</label>
          <input
            type="text"
            name="title"
            value={post?.title || ''}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Slug</label>
          <input
            type="text"
            name="slug"
            value={post?.slug || ''}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Excerpt</label>
          <textarea
            name="excerpt"
            value={post?.excerpt || ''}
            onChange={handleChange}
            rows={2}
            className="w-full px-4 py-2 border rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Content (Markdown)</label>
          <textarea
            name="content"
            value={post?.content || ''}
            onChange={handleChange}
            rows={12}
            className="w-full px-4 py-2 border rounded font-mono text-sm"
          />
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold mb-2">Published Date</label>
            <input
              type="date"
              name="publishedAt"
              value={post?.publishedAt || ''}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Reading Time (minutes)</label>
            <input
              type="number"
              name="readingTimeMinutes"
              value={post?.readingTimeMinutes || 5}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded"
            />
          </div>
        </div>

        <div>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="published"
              checked={post?.published || false}
              onChange={handleChange}
              className="w-4 h-4"
            />
            <span>Published</span>
          </label>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">External URL (optional)</label>
          <input
            type="url"
            name="externalUrl"
            value={post?.externalUrl || ''}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
            placeholder="https://..."
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Tags</label>
          <div className="space-y-2 mb-2">
            {post?.tags.map((tag, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  value={tag}
                  onChange={(e) => handleTagsChange(index, e.target.value)}
                  className="flex-1 px-4 py-2 border rounded"
                  placeholder="Tag"
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
          {saving ? 'Saving...' : 'Save Post'}
        </button>
      </form>
    </div>
  );
}
