'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
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

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const data = await api.getBlog<BlogPost>();
        setPosts(data);
      } catch (error) {
        setMessage('Failed to load blog posts');
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return;

    try {
      await api.deleteBlogPost(id);
      setPosts(posts.filter((p) => p.id !== id));
      setMessage('Post deleted successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Failed to delete post');
    }
  };

  const handleAddNew = async () => {
    try {
      const newPost: Partial<BlogPost> = {
        title: 'New Blog Post',
        slug: 'new-blog-post',
        excerpt: '',
        content: '',
        publishedAt: new Date().toISOString().split('T')[0],
        updatedAt: null,
        tags: [],
        published: false,
        readingTimeMinutes: 5,
        externalUrl: null,
      };
      const result = await api.createBlogPost(newPost);
      setPosts([...posts, result.post]);
    } catch (error) {
      setMessage('Failed to create post');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Blog Posts</h1>
        <button
          onClick={handleAddNew}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          + New Post
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
              <th className="border p-4 text-left">Published</th>
              <th className="border p-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id} className="hover:bg-gray-50">
                <td className="border p-4">{post.title}</td>
                <td className="border p-4">
                  <span
                    className={`px-3 py-1 text-sm rounded ${
                      post.published
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {post.published ? 'Published' : 'Draft'}
                  </span>
                </td>
                <td className="border p-4 text-sm text-gray-600">
                  {post.publishedAt}
                </td>
                <td className="border p-4 space-x-2">
                  <Link
                    href={`/blog/${post.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(post.id)}
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

      {posts.length === 0 && (
        <div className="text-center py-12 text-gray-600">
          <p>No blog posts yet. Create your first one!</p>
        </div>
      )}
    </div>
  );
}
