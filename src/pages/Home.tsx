
import PostCard from '../components/PostCard';
import { posts } from '../data/posts';
import LogoCarousel from '../components/LogoCarousel';
import NextGuests from '../components/NextGuests';

const Home = () => {
  const recentPosts = posts.slice(0, 3);

  return (
    <div className="min-h-screen relative">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://te-cdn-marketing-site.storage.googleapis.com/littleamerica/America/parnter/stay/places/usa-washington-state-seattle-skyline.jpg')`
        }}
      />
      
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/50" />
      
      {/* Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Welcome to My
              <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent"> Personal Page </span>
              on Venture Capital
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              A place where you can get to know me and learn about my venture capital conversations.
            </p>
            <div className="flex flex-col lg:flex-row gap-8 justify-center items-start">
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
              <div className="w-full max-w-sm lg:max-w-xs">
                <NextGuests />
              </div>
            </div>
          </div>
        </section>

        {/* Recent Posts Section */}
        <section className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">
              Recent Posts
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recentPosts.map((post) => (
                <PostCard key={post.id} {...post} />
              ))}
            </div>
            <div className="text-center mt-8">
              <a 
                href="/posts" 
                className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors font-medium text-lg"
              >
                View all posts →
              </a>
            </div>
          </div>
        </section>
        <section className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <LogoCarousel direction="horizontal" />
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
