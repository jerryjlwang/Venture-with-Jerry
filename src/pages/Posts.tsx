import PostGraphicCard from '../components/PostGraphicCard';
import { posts } from '../data/posts';
const Posts = () => {
  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-no-repeat relative"
      style={{
        backgroundImage: `url('https://www.randalljhodges.com/images/xl/U001-Seattle-Skyline-at-Night-Kerry-Park-Seattle-WA.jpg')`
      }}
    >
      {/* Dark overlay to ensure text readability */}
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            All Posts
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Check out my insights after interviewing notable venture capital professionals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <PostGraphicCard key={post.id} id={post.id} graphic={post.graphic} title={post.title} />
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
