
import PostCard from '../components/PostCard';
import { posts } from '../data/posts';

const Posts = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-gray-900 to-black">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            All Posts
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Thoughts, tutorials, and insights from my journey in technology and life.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <PostCard key={post.id} {...post} />
          ))}
        </div>

        {posts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-400 text-lg">
              No posts yet. Check back soon for new content!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Posts;
