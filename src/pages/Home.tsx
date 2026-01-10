import LogoCarousel from '../components/LogoCarousel';
import NextGuests from '../components/NextGuests';
import RecentPostsCarousel from '../components/RecentPostsCarousel';
const Home = () => {
  return <div className="min-h-screen relative">
      {/* Background Image */}
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{
      backgroundImage: `url('https://te-cdn-marketing-site.storage.googleapis.com/littleamerica/America/parnter/stay/places/usa-washington-state-seattle-skyline.jpg')`
    }} />
      
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/30" />
      
      
      {/* Content */}
      <div className="relative z-10 pt-48">
        {/* Hero Section */}
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-playfair font-medium text-white mb-6 leading-tight tracking-widest">
  Welcome to My
              <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent"> Personal Page </span>
            </h1>
            <p className="text-xl md:text-2xl font-playfair mb-8 max-w-3xl mx-auto leading-relaxed tracking-widest text-primary-foreground">
              A place where you can get to know me and learn about my venture capital conversations.
            </p>
            <div className="relative flex justify-center w-full">
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="/posts" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-playfair font-medium transition-colors shadow-lg hover:shadow-xl tracking-widest">
                  Read My Posts
                </a>
                <a href="/about" className="border-2 border-blue-600 text-blue-400 hover:bg-blue-600 hover:text-white px-8 py-4 rounded-lg font-playfair font-medium transition-all shadow-lg hover:shadow-xl tracking-widest">
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
    </div>;
};
export default Home;