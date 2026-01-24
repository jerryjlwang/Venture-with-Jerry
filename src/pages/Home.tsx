import { useState, useEffect } from 'react';
import LogoCarousel from '../components/LogoCarousel';
import NextGuests from '../components/NextGuests';
import RecentPostsCarousel from '../components/RecentPostsCarousel';
import OptimizedBackground from '../components/OptimizedBackground';
import TypewriterText from '../components/TypewriterText';
import ScrollTypewriterText from '../components/ScrollTypewriterText';
import missionTeamImage from '@/assets/mission-team.png';
import mountainBackground from '@/assets/mountain-background.jpeg';
const SEATTLE_SKYLINE = 'https://te-cdn-marketing-site.storage.googleapis.com/littleamerica/America/parnter/stay/places/usa-washington-state-seattle-skyline.jpg';
const ANIMATION_PLAYED_KEY = 'home-animation-played';
const Home = () => {
  // Check if animations have already played this session
  const hasAnimationPlayed = sessionStorage.getItem(ANIMATION_PLAYED_KEY) === 'true';
  const [subtitleComplete, setSubtitleComplete] = useState(hasAnimationPlayed);

  // Mark animation as played when subtitle completes
  useEffect(() => {
    if (subtitleComplete && !hasAnimationPlayed) {
      sessionStorage.setItem(ANIMATION_PLAYED_KEY, 'true');
    }
  }, [subtitleComplete, hasAnimationPlayed]);
  return <div className="min-h-screen bg-slate-900">
      {/* Hero Section with Background Image */}
      <OptimizedBackground src={SEATTLE_SKYLINE} alt="Seattle skyline" className="h-auto lg:h-screen lg:max-h-[900px]" overlayClassName="bg-gradient-to-b from-black/30 via-black/30 to-slate-900">
        {/* Hero Content */}
        <div className="absolute inset-0 flex flex-col justify-between pt-32 md:pt-40 lg:pt-32 pb-6 lg:pb-10">
          <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
            {/* Main hero grid - right-skewed asymmetric layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              {/* Left column - NextGuests */}
              <div className={`lg:col-span-4 hidden lg:flex lg:justify-start lg:pt-4 transition-all duration-700 ease-out ${subtitleComplete ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{
                transitionDelay: '300ms'
              }}>
                <NextGuests />
              </div>
              
              {/* Right column - main content */}
              <div className="lg:col-span-8 text-left lg:text-right">
                <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-courier mb-6 lg:mb-8 lg:ml-auto max-w-2xl leading-relaxed tracking-wide text-white mt-8 lg:mt-16">
                  {hasAnimationPlayed ? "Get to know me and my venture capital conversations." : <TypewriterText text="Get to know me and my venture capital conversations." speed={30} onComplete={() => setSubtitleComplete(true)} keepCursorAfterComplete={true} />}
                </p>
              </div>
            </div>
            
            {/* Scroll indicator - right-aligned below subheading */}
            <div className={`mt-8 lg:mt-12 flex flex-col items-center lg:items-end gap-2 transition-all duration-700 ease-out ${subtitleComplete ? 'opacity-100 translate-y-0 animate-bounce' : 'opacity-0 translate-y-4'}`} style={{
              transitionDelay: '150ms'
            }}>
              <span className="font-courier text-sm tracking-wide text-primary-foreground">Scroll for More</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
            
          </div>
          
          {/* Logo Carousel at bottom of hero */}
          <div className={`max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 mt-8 transition-all duration-700 ease-out ${subtitleComplete ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{
          transitionDelay: '600ms'
        }}>
            <LogoCarousel />
          </div>
        </div>
      </OptimizedBackground>

      {/* Mountain Background Section */}
      <OptimizedBackground 
        src={mountainBackground} 
        alt="Snow covered mountains" 
        className="h-[60vh] lg:h-[80vh]" 
        overlayClassName="bg-gradient-to-b from-slate-900 via-black/30 to-slate-900"
      >
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Content can be added here if needed */}
        </div>
      </OptimizedBackground>

      {/* Content on blue slate background */}
      <div className="bg-slate-900">
        {/* Recent Posts Section */}
        <RecentPostsCarousel />

        {/* My Mission Section */}
        <section className="py-6 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/5 backdrop-blur-md rounded-xl p-8 border border-white/20">
              <h2 className="text-2xl font-courier font-medium text-white mb-6 text-center tracking-wide">
                <ScrollTypewriterText text="My Mission" speed={80} />
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