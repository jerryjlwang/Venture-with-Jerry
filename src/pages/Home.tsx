
import LogoCarousel from '../components/LogoCarousel';
import NextGuests from '../components/NextGuests';
import RecentPostsCarousel from '../components/RecentPostsCarousel';

const Home = () => {

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
      
      {/* Decorative Shapes */}
      <div className="absolute inset-0 z-5 pointer-events-none overflow-hidden">
        {/* Top Left Leaf */}
        <svg className="absolute top-20 left-10 w-16 h-16 text-white/20" viewBox="0 0 64 64" fill="none">
          <path d="M32 8C20 8 8 20 8 32C8 44 20 56 32 56C32 44 32 20 32 8Z" stroke="currentColor" strokeWidth="2"/>
          <path d="M32 8C32 20 32 44 32 56C44 56 56 44 56 32C56 20 44 8 32 8Z" stroke="currentColor" strokeWidth="2"/>
        </svg>
        
        {/* Top Right Flower */}
        <svg className="absolute top-32 right-16 w-20 h-20 text-white/15" viewBox="0 0 80 80" fill="none">
          <circle cx="40" cy="20" r="8" stroke="currentColor" strokeWidth="2"/>
          <circle cx="20" cy="40" r="8" stroke="currentColor" strokeWidth="2"/>
          <circle cx="60" cy="40" r="8" stroke="currentColor" strokeWidth="2"/>
          <circle cx="40" cy="60" r="8" stroke="currentColor" strokeWidth="2"/>
          <circle cx="40" cy="40" r="6" stroke="currentColor" strokeWidth="2"/>
        </svg>

        {/* Bottom Left Branch */}
        <svg className="absolute bottom-40 left-16 w-24 h-24 text-white/25" viewBox="0 0 96 96" fill="none">
          <path d="M8 48Q24 32 48 48Q72 32 88 48" stroke="currentColor" strokeWidth="2"/>
          <path d="M20 48Q28 36 36 48" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M60 48Q68 36 76 48" stroke="currentColor" strokeWidth="1.5"/>
          <circle cx="24" cy="44" r="2" stroke="currentColor" strokeWidth="1"/>
          <circle cx="72" cy="44" r="2" stroke="currentColor" strokeWidth="1"/>
        </svg>

        {/* Bottom Right Geometric */}
        <svg className="absolute bottom-20 right-20 w-18 h-18 text-white/20" viewBox="0 0 72 72" fill="none">
          <polygon points="36,8 64,28 64,44 36,64 8,44 8,28" stroke="currentColor" strokeWidth="2"/>
          <polygon points="36,20 52,30 52,42 36,52 20,42 20,30" stroke="currentColor" strokeWidth="1.5"/>
        </svg>

        {/* Middle Left Swirl */}
        <svg className="absolute top-1/2 left-8 w-14 h-14 text-white/15" viewBox="0 0 56 56" fill="none">
          <path d="M28 8C20 8 14 14 14 22C14 30 20 36 28 36C36 36 42 30 42 22C42 30 36 36 28 36C28 44 34 50 42 50" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>

        {/* Middle Right Star */}
        <svg className="absolute top-1/3 right-8 w-12 h-12 text-white/20" viewBox="0 0 48 48" fill="none">
          <path d="M24 4L28 16H40L30 24L34 36L24 28L14 36L18 24L8 16H20L24 4Z" stroke="currentColor" strokeWidth="2"/>
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-merriweather font-bold text-white mb-6 leading-tight">
  Welcome to My
              <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent"> Personal Page </span>
  on Venture Capital
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              A place where you can get to know me and learn about my venture capital conversations.
            </p>
            <div className="relative flex justify-center w-full">
              <div className="flex flex-col sm:flex-row gap-4">
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
              <div className="absolute top-0 right-0 w-72 hidden lg:block">
                <NextGuests />
              </div>
            </div>
          </div>
        </section>

        {/* Recent Posts Section */}
        <RecentPostsCarousel />
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
