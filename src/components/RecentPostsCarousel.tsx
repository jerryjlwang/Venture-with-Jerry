import { useMemo } from 'react';
import ParallaxImages, {
  type ParallaxImageItem,
} from '@/components/ui/3d-parallax-effect-on-hover';
import { posts } from '../data/posts';

const RecentPostsCarousel = () => {
  const featuredPosts = useMemo<ParallaxImageItem[]>(
    () =>
      [...posts]
        .sort(
          (a, b) =>
            new Date(b.date).getTime() - new Date(a.date).getTime()
        )
        .slice(0, 3)
        .map((post, index) => ({
          src:
            post.graphic ||
            post.imageUrl ||
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=1400&fit=crop",
          alt: post.title,
          href: `/posts/${post.id}`,
          title: post.title,
          excerpt: post.excerpt,
          date: post.date,
          readTime: post.readTime,
          f: [0.08, 0.12, 0.1][index % 3],
          r: ["18px", "26px", "14px"][index % 3],
        })),
    []
  );

  return <section className="px-4 pb-8 pt-8 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-3xl md:text-4xl font-courier font-medium text-white tracking-wide">
            Recent Posts
          </h2>
        </div>

        <div>
          <ParallaxImages items={featuredPosts} />
        </div>

        <div className="text-center mt-8">
          <a href="/posts" className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors font-courier font-medium text-lg tracking-wide">
            View all posts →
          </a>
        </div>
      </div>
    </section>;
};
export default RecentPostsCarousel;
