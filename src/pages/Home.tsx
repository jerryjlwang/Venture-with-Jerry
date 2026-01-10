
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
      
      {/* Decorative Seattle Landmarks */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Space Needle - Top Left */}
        <div className="absolute top-16 left-8 opacity-20 transform rotate-12">
          <svg width="80" height="120" viewBox="0 0 80 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M40 10C35 10 30 15 25 25C20 35 15 45 15 55C15 60 20 65 40 65C60 65 65 60 65 55C65 45 60 35 55 25C50 15 45 10 40 10Z" stroke="white" strokeWidth="2" fill="none"/>
            <line x1="40" y1="65" x2="40" y2="110" stroke="white" strokeWidth="3"/>
            <path d="M25 110 L55 110 L50 115 L30 115 Z" stroke="white" strokeWidth="2" fill="none"/>
            <circle cx="40" cy="40" r="8" stroke="white" strokeWidth="2" fill="none"/>
          </svg>
        </div>

        {/* Ferry - Bottom Right */}
        <div className="absolute bottom-32 right-12 opacity-15 transform -rotate-6">
          <svg width="100" height="40" viewBox="0 0 100 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 25 L90 25 L85 30 L15 30 Z" stroke="white" strokeWidth="2" fill="none"/>
            <rect x="20" y="15" width="60" height="10" stroke="white" strokeWidth="2" fill="none"/>
            <rect x="35" y="10" width="30" height="5" stroke="white" strokeWidth="2" fill="none"/>
            <line x1="25" y1="25" x2="25" y2="35" stroke="white" strokeWidth="1"/>
            <line x1="75" y1="25" x2="75" y2="35" stroke="white" strokeWidth="1"/>
          </svg>
        </div>

        {/* Pike Place Market Sign - Top Right */}
        <div className="absolute top-40 right-16 opacity-20 transform -rotate-3">
          <svg width="120" height="60" viewBox="0 0 120 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="10" y="20" width="100" height="30" stroke="white" strokeWidth="2" fill="none"/>
            <path d="M15 25 L25 25 M30 25 L40 25 M45 25 L55 25" stroke="white" strokeWidth="1"/>
            <path d="M15 35 L35 35 M40 35 L60 35 M65 35 L85 35" stroke="white" strokeWidth="1"/>
            <path d="M15 45 L45 45 M50 45 L70 45" stroke="white" strokeWidth="1"/>
            <rect x="5" y="15" width="110" height="5" stroke="white" strokeWidth="2" fill="none"/>
          </svg>
        </div>

        {/* Mountain Range - Background Left */}
        <div className="absolute top-60 left-20 opacity-10 transform rotate-1">
          <svg width="150" height="80" viewBox="0 0 150 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 70 L30 40 L60 50 L90 20 L120 35 L150 25 L150 70 Z" stroke="white" strokeWidth="2" fill="none"/>
            <path d="M20 70 L40 55 L70 60 L100 30 L130 45 L150 40" stroke="white" strokeWidth="1"/>
          </svg>
        </div>

        {/* Coffee Cup - Bottom Left */}
        <div className="absolute bottom-40 left-16 opacity-25 transform rotate-12">
          <svg width="50" height="60" viewBox="0 0 50 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 20 L10 45 C10 50 15 55 25 55 C35 55 40 50 40 45 L40 20 Z" stroke="white" strokeWidth="2" fill="none"/>
            <path d="M8 20 L42 20" stroke="white" strokeWidth="2"/>
            <path d="M40 30 C45 30 48 33 48 38 C48 43 45 46 40 46" stroke="white" strokeWidth="2" fill="none"/>
            <path d="M15 10 C15 8 17 8 19 10 C21 8 23 8 23 10" stroke="white" strokeWidth="1"/>
            <path d="M27 10 C27 8 29 8 31 10 C33 8 35 8 35 10" stroke="white" strokeWidth="1"/>
          </svg>
        </div>

        {/* Bridge - Center Right */}
        <div className="absolute top-80 right-32 opacity-15 transform -rotate-12">
          <svg width="120" height="50" viewBox="0 0 120 50" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 40 Q60 20 120 40" stroke="white" strokeWidth="2" fill="none"/>
            <line x1="30" y1="30" x2="30" y2="45" stroke="white" strokeWidth="2"/>
            <line x1="60" y1="25" x2="60" y2="45" stroke="white" strokeWidth="2"/>
            <line x1="90" y1="30" x2="90" y2="45" stroke="white" strokeWidth="2"/>
            <path d="M25 35 L35 35 M55 30 L65 30 M85 35 L95 35" stroke="white" strokeWidth="1"/>
          </svg>
        </div>

        {/* Seaplane - Top Center */}
        <div className="absolute top-24 left-1/2 transform -translate-x-1/2 opacity-20 rotate-45">
          <svg width="80" height="30" viewBox="0 0 80 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="40" cy="15" rx="35" ry="3" stroke="white" strokeWidth="2" fill="none"/>
            <rect x="35" y="8" width="10" height="14" stroke="white" strokeWidth="2" fill="none"/>
            <path d="M20 12 L60 12 M20 18 L60 18" stroke="white" strokeWidth="1"/>
            <circle cx="15" cy="15" r="3" stroke="white" strokeWidth="1" fill="none"/>
            <circle cx="65" cy="15" r="3" stroke="white" strokeWidth="1" fill="none"/>
          </svg>
        </div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 pt-48">
        {/* Hero Section */}
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-merriweather font-bold text-white mb-6 leading-tight">
  Welcome to My
              <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent"> Personal Page </span>
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
