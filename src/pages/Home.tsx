
import PostCard from '../components/PostCard';
import { posts } from '../data/posts';

const Home = () => {
  const recentPosts = posts.slice(0, 3);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-gray-900 to-black">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Welcome to My
            <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent"> Digital Space</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            A place where I share my thoughts, experiences, and insights on technology, life, and everything in between.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/posts" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors shadow-lg hover:shadow-xl"
            >
              Read My Posts
            </a>
            <a 
              href="/about" 
              className="border-2 border-blue-600 text-blue-400 hover:bg-blue-600 hover:text-white px-8 py-4 rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl"
            >
              Learn About Me
            </a>
          </div>
        </div>
      </section>

      {/* Recent Posts Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
            Recent Posts
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentPosts.map((post) => (
              <PostCard key={post.id} {...post} />
            ))}
          </div>
          <div className="text-center mt-12">
            <a 
              href="/posts" 
              className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors font-medium text-lg"
            >
              View all posts →
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
