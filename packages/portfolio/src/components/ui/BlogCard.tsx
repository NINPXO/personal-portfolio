import { BlogPost } from '../../types';

interface BlogCardProps {
  post: BlogPost;
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <article className="bg-white rounded-lg p-6 border border-gray-200 hover:shadow-lg transition">
      <div className="mb-4">
        <h3 className="text-2xl font-bold mb-2">{post.title}</h3>
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <time>{formatDate(post.publishedAt)}</time>
          <span>{post.readingTimeMinutes} min read</span>
        </div>
      </div>

      <p className="text-gray-700 mb-4">{post.excerpt}</p>

      {post.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map((tag) => (
            <span key={tag} className="px-2 py-1 text-xs bg-gray-100 rounded">
              #{tag}
            </span>
          ))}
        </div>
      )}

      {post.externalUrl ? (
        <a
          href={post.externalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          Read on external site →
        </a>
      ) : (
        <a href="#" className="text-blue-600 hover:underline">
          Read more →
        </a>
      )}
    </article>
  );
}
