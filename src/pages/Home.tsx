import LogoCarousel from '../components/LogoCarousel';
import NextGuests from '../components/NextGuests';
import RecentPostsCarousel from '../components/RecentPostsCarousel';
import missionTeamImage from '@/assets/mission-team.png';
const Home = () => {
  return <div className="min-h-screen bg-slate-900">
      {/* Hero Section with Background Image */}
      <div className="relative">
        {/* Background Image - full width, natural height */}
        <img src="https://te-cdn-marketing-site.storage.googleapis.com/littleamerica/America/parnter/stay/places/usa-washington-state-seattle-skyline.jpg" alt="Seattle skyline" className="w-full h-auto" />
        
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/30 to-slate-900" />
        
        {/* Hero Content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="max-w-6xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h1 className="text-5xl md:text-7xl font-courier font-medium text-white mb-6 leading-tight tracking-widest">
              Welcome to My Personal Page            </h1>
            <p className="text-xl md:text-2xl font-courier mb-8 max-w-3xl mx-auto leading-relaxed tracking-wide text-primary-foreground">
              A place where you can get to know me and learn about my venture capital conversations.
            </p>
            <div className="relative flex justify-center w-full">
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="/posts" className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-courier font-medium transition-colors shadow-lg hover:shadow-xl tracking-wide">
                  Read My Posts
                </a>
                <a href="/about" className="inline-flex items-center justify-center border-2 border-blue-600 text-blue-400 hover:bg-blue-600 hover:text-white px-8 py-4 rounded-lg font-courier font-medium transition-all shadow-lg hover:shadow-xl tracking-wide">
                  Learn About Me
                </a>
              </div>
              <div className="absolute top-0 right-0 w-72 hidden lg:block">
                <NextGuests />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content on blue slate background */}
      <div className="bg-slate-900">
        {/* Recent Posts Section */}
        <RecentPostsCarousel />
        <section className="py-4 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <LogoCarousel direction="horizontal" />
          </div>
        </section>

        {/* My Mission Section */}
        <section className="py-6 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/5 backdrop-blur-md rounded-xl p-8 border border-white/20">
              <h2 className="text-2xl font-courier font-medium text-white mb-6 text-center tracking-wide">
                My Mission
              </h2>
              <div className="flex flex-col items-center gap-8">
                <div className="w-full max-w-2xl">
                  <img src={missionTeamImage} alt="Team collaboration" className="w-full h-auto rounded-lg shadow-lg border border-white/10" />
                </div>
                <p className="text-gray-300 font-courier tracking-wide leading-relaxed text-center text-lg">
                  To demystify the world of venture capital by sharing authentic conversations with the people who shape Seattle's startup ecosystem. Through these interviews, I aim to provide aspiring entrepreneurs and curious minds with real insights into how VCs think, invest, and build lasting relationships with founders.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>;
};
export default Home;