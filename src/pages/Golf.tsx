import { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import GolfCourseMap from '@/components/GolfCourseMap';

const VIDEOS = [
  '/videos/golf-background.mp4',
  '/videos/golf-background-2.mp4'
];

const Golf = () => {
  const [showArrow, setShowArrow] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowArrow(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleVideoEnded = () => {
    setCurrentVideoIndex((prev) => (prev + 1) % VIDEOS.length);
  };

  const smoothScrollTo = (elementId: string) => {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    const targetPosition = element.getBoundingClientRect().top + window.scrollY;
    const startPosition = window.scrollY;
    const distance = targetPosition - startPosition;
    const duration = 1500; // 1.5 seconds
    let startTime: number | null = null;

    const easeInOutCubic = (t: number) => {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    };

    const animation = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      window.scrollTo(0, startPosition + distance * easeInOutCubic(progress));
      
      if (elapsed < duration) {
        requestAnimationFrame(animation);
      }
    };

    requestAnimationFrame(animation);
  };

  return <div className="min-h-screen relative" style={{
    backgroundColor: '#052e16'
  }}>
      {/* Background video section */}
      <div className="absolute top-0 left-0 w-full h-screen overflow-hidden">
        <video
          key={currentVideoIndex}
          src={VIDEOS[currentVideoIndex]}
          autoPlay
          muted
          playsInline
          preload="auto"
          onEnded={handleVideoEnded}
          className="absolute inset-0 w-full h-full object-cover object-top opacity-40"
        />
        <div className="absolute inset-0 bg-green-950 bg-opacity-20"></div>
        <div 
          className="absolute inset-0" 
          style={{
            background: 'linear-gradient(to bottom, transparent 40%, #052e16 100%)'
          }}
        ></div>
      </div>
      
      {/* Hero section - centered in viewport */}
      <div className="relative z-10 h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl text-white mb-4 font-courier tracking-wide font-medium">18 Holes, 18 Milestones</h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto font-courier">My life through golf.</p>
          
          <button 
            onClick={() => smoothScrollTo('golf-map')}
            className={`mt-8 transition-all duration-700 cursor-pointer ${
              showArrow ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            aria-label="Scroll to golf course map"
          >
            <ChevronDown className="w-8 h-8 text-white/60 mx-auto animate-bounce hover:text-white/80 transition-colors" />
          </button>
        </div>
      </div>

      {/* Map section - below the fold */}
      <div id="golf-map" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <GolfCourseMap />

        <div className="mt-16 text-center">
          <p className="text-white/60 font-courier text-sm">
            ​
          </p>
        </div>
      </div>
    </div>;
};
export default Golf;