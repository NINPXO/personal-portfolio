import { BlogPost } from '../../types';
import { SectionWrapper } from '../ui/SectionWrapper';
import { BlogCard } from '../ui/BlogCard';

interface BlogProps {
  posts: BlogPost[];
}

export function Blog({ posts }: BlogProps) {
  if (!posts || posts.length === 0) return null;

  // Sort by date (newest first)
  const sorted = [...posts].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  return (
    <SectionWrapper id="blog" title="Blog">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {sorted.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
    </SectionWrapper>
  );
}
