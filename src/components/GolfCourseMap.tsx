import { useState } from 'react';

interface HoleData {
  hole: number;
  title: string;
}

const journeyData: HoleData[] = [
  { hole: 1, title: "First swings" },
  { hole: 2, title: "A chunk and a hole out" },
  { hole: 3, title: "First Tee" },
  { hole: 4, title: "High School Varsity" },
  { hole: 5, title: "Junior Tournaments" },
  { hole: 6, title: "Passion Projects" },
  { hole: 7, title: "AIME" },
  { hole: 8, title: "DECA" },
  { hole: 9, title: "Wyze Internship" },
  { hole: 10, title: "Networking" },
  { hole: 11, title: "Economics Olympiad" },
  { hole: 12, title: "Venture with Jerry" },
  { hole: 13, title: "PitchFork" },
  { hole: 14, title: "Taper" },
  { hole: 15, title: "Director of Sales" },
  { hole: 16, title: "The Golden Ratio" },
  { hole: 17, title: "Senior Season" },
  { hole: 18, title: "The Journey Continues" },
];

const GolfCourseMap = () => {
  const [hoveredHole, setHoveredHole] = useState<number | 'clubhouse' | 'halfway' | null>(null);

  const scrollToCard = (holeId: number | 'clubhouse' | 'halfway') => {
    const element = document.getElementById(`hole-card-${holeId}`);
    if (!element) return;
    
    const targetPosition = element.getBoundingClientRect().top + window.scrollY;
    const startPosition = window.scrollY;
    const distance = targetPosition - startPosition - 32;
    const duration = 1200;
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

  const frontNine = journeyData.slice(0, 9);
  const backNine = journeyData.slice(9, 18);

  const HoleCell = ({ hole, title }: { hole: number; title: string }) => {
    const isHovered = hoveredHole === hole;
    
    return (
      <button
        onClick={() => scrollToCard(hole)}
        onMouseEnter={() => setHoveredHole(hole)}
        onMouseLeave={() => setHoveredHole(null)}
        className={`
          relative flex flex-col items-center justify-center
          w-full aspect-square sm:aspect-[4/3]
          rounded-lg border-2 transition-all duration-300
          ${isHovered 
            ? 'border-amber-400 bg-amber-500/20 scale-105 shadow-lg shadow-amber-500/20' 
            : 'border-white/20 bg-white/5 hover:border-amber-500/50 hover:bg-white/10'
          }
          cursor-pointer group
        `}
      >
        <span className={`
          text-xl sm:text-2xl md:text-3xl font-bold font-courier transition-colors duration-300
          ${isHovered ? 'text-amber-400' : 'text-white group-hover:text-amber-300'}
        `}>
          {hole}
        </span>
        
        {/* Tooltip on hover */}
        {isHovered && (
          <div className="absolute left-1/2 top-full mt-2 -translate-x-1/2 bg-white/95 backdrop-blur-sm text-green-900 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-courier whitespace-nowrap shadow-xl z-30">
            {title}
          </div>
        )}
      </button>
    );
  };

  const SpecialCell = ({ type, label, icon }: { type: 'clubhouse' | 'halfway'; label: string; icon: React.ReactNode }) => {
    const isHovered = hoveredHole === type;
    
    return (
      <button
        onClick={() => scrollToCard(type)}
        onMouseEnter={() => setHoveredHole(type)}
        onMouseLeave={() => setHoveredHole(null)}
        className={`
          relative flex flex-col items-center justify-center gap-0.5 sm:gap-1
          w-full aspect-square sm:aspect-[4/3]
          rounded-lg border-2 transition-all duration-300
          ${isHovered 
            ? 'border-amber-400 bg-amber-500/20 scale-105 shadow-lg shadow-amber-500/20' 
            : 'border-white/20 bg-white/5 hover:border-amber-500/50 hover:bg-white/10'
          }
          cursor-pointer group
        `}
      >
        <div className={`transition-colors duration-300 ${isHovered ? 'text-amber-400' : 'text-white/70 group-hover:text-amber-300'}`}>
          {icon}
        </div>
        <span className={`
          text-[8px] sm:text-xs font-courier transition-colors duration-300 text-center leading-tight
          ${isHovered ? 'text-amber-400' : 'text-white/60 group-hover:text-amber-300'}
        `}>
          {label}
        </span>
        
        {/* Tooltip on hover */}
        {isHovered && (
          <div className="absolute left-1/2 top-full mt-2 -translate-x-1/2 bg-white/95 backdrop-blur-sm text-green-900 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-courier whitespace-nowrap shadow-xl z-30">
            {type === 'clubhouse' ? 'Start Here' : 'Halfway House'}
          </div>
        )}
      </button>
    );
  };

  const ClubhouseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
      <polyline points="9 22 9 12 15 12 15 22"></polyline>
    </svg>
  );

  const CoffeeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 8h1a4 4 0 1 1 0 8h-1"></path>
      <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"></path>
      <line x1="6" x2="6" y1="2" y2="4"></line>
      <line x1="10" x2="10" y1="2" y2="4"></line>
      <line x1="14" x2="14" y1="2" y2="4"></line>
    </svg>
  );

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      {/* Scorecard Container */}
      <div className="relative rounded-2xl overflow-hidden border border-white/20 bg-black/40 backdrop-blur-sm shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-900/60 to-green-800/60 border-b border-white/10 px-4 sm:px-6 py-3 sm:py-4">
          <h2 className="text-lg sm:text-xl font-courier text-white text-center tracking-wide">
            Jerry's Scorecard
          </h2>
        </div>
        
        {/* Scorecard Grid */}
        <div className="p-3 sm:p-4 md:p-6 space-y-3 sm:space-y-4">
          {/* Front Nine Row */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 px-1">
              <span className="text-xs sm:text-sm font-courier text-amber-400/80 uppercase tracking-wider">Front 9</span>
              <div className="flex-grow h-px bg-gradient-to-r from-amber-400/30 to-transparent" />
            </div>
            <div className="grid grid-cols-10 gap-1 sm:gap-1.5 md:gap-2">
              <SpecialCell type="clubhouse" label="Start" icon={<ClubhouseIcon />} />
              {frontNine.map(hole => (
                <HoleCell key={hole.hole} hole={hole.hole} title={hole.title} />
              ))}
            </div>
          </div>
          
          {/* Back Nine Row */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 px-1">
              <span className="text-xs sm:text-sm font-courier text-amber-400/80 uppercase tracking-wider">Back 9</span>
              <div className="flex-grow h-px bg-gradient-to-r from-amber-400/30 to-transparent" />
            </div>
            <div className="grid grid-cols-10 gap-1 sm:gap-1.5 md:gap-2">
              <SpecialCell type="halfway" label="Turn" icon={<CoffeeIcon />} />
              {backNine.map(hole => (
                <HoleCell key={hole.hole} hole={hole.hole} title={hole.title} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GolfCourseMap;
