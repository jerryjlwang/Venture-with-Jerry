
import PostCard from '../components/PostCard';
import { posts } from '../data/posts';

const Home = () => {
  const recentPosts = posts.slice(0, 3);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Seattle Skyline Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(
            180deg, 
            rgba(0, 0, 0, 0.3) 0%, 
            rgba(0, 0, 0, 0.5) 50%, 
            rgba(0, 0, 0, 0.8) 100%
          ), url('https://images.unsplash.com/photo-1601972599720-d4b6c04dce0b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`
        }}
      />

      {/* Animated overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-purple-900/20 animate-pulse" 
           style={{ animationDuration: '4s' }} />

      {/* Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="py-32 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-6xl md:text-8xl font-bold text-white mb-8 leading-tight drop-shadow-2xl animate-fade-in">
              Welcome to My
              <span className="bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 bg-clip-text text-transparent block mt-2"> Personal Page</span>
            </h1>
            <p className="text-2xl md:text-3xl text-white/90 mb-12 max-w-4xl mx-auto leading-relaxed drop-shadow-lg font-light">
              A place where you can get to know me and learn about venture capital.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a 
                href="/posts" 
                className="bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700 text-white px-10 py-5 rounded-full font-semibold transition-all duration-300 shadow-2xl hover:shadow-orange-500/25 hover:scale-105 text-lg"
              >
                Read My Posts
              </a>
              <a 
                href="/about" 
                className="border-2 border-white/30 backdrop-blur-sm bg-white/10 text-white hover:bg-white/20 hover:border-white/50 px-10 py-5 rounded-full font-semibold transition-all duration-300 shadow-2xl hover:scale-105 text-lg"
              >
                Learn About Me
              </a>
            </div>
          </div>
        </section>

        {/* Recent Posts Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="bg-black/40 backdrop-blur-lg rounded-3xl p-12 border border-white/10">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-16 text-center drop-shadow-lg">
                Recent Posts
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {recentPosts.map((post, index) => (
                  <div key={post.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.2}s` }}>
                    <PostCard {...post} />
                  </div>
                ))}
              </div>
              <div className="text-center mt-16">
                <a 
                  href="/posts" 
                  className="inline-flex items-center text-orange-400 hover:text-orange-300 transition-colors font-medium text-xl group"
                >
                  View all posts 
                  <span className="ml-2 transform group-hover:translate-x-1 transition-transform">→</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
