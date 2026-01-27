import { useState } from 'react';

// Legend categories with colors
type Category = 'soccer' | 'golf' | 'competitions' | 'internships' | 'startups' | 'me';

const categoryColors: Record<Category, { bg: string; border: string; text: string }> = {
  soccer: { bg: 'bg-white/20', border: 'border-white', text: 'text-white' },
  golf: { bg: 'bg-emerald-500/20', border: 'border-emerald-400', text: 'text-emerald-400' },
  competitions: { bg: 'bg-blue-500/20', border: 'border-blue-400', text: 'text-blue-400' },
  internships: { bg: 'bg-purple-500/20', border: 'border-purple-400', text: 'text-purple-400' },
  startups: { bg: 'bg-orange-500/20', border: 'border-orange-400', text: 'text-orange-400' },
  me: { bg: 'bg-pink-500/20', border: 'border-pink-400', text: 'text-pink-400' },
};

const legendItems: { category: Category; label: string }[] = [
  { category: 'soccer', label: '1-2: Soccer' },
  { category: 'golf', label: '3-5: Golf' },
  { category: 'competitions', label: '6-8: Competitions' },
  { category: 'internships', label: '9-11: Internships' },
  { category: 'startups', label: '12-15: Startups' },
  { category: 'me', label: '16-18: Me' },
];

interface HoleData {
  hole: number;
  title: string;
  category?: Category;
}

const journeyData: HoleData[] = [
  { hole: 1, title: "First swings", category: 'soccer' },
  { hole: 2, title: "A chunk and a hole out", category: 'soccer' },
  { hole: 3, title: "First Tee", category: 'golf' },
  { hole: 4, title: "High School Varsity", category: 'golf' },
  { hole: 5, title: "Junior Tournaments", category: 'golf' },
  { hole: 6, title: "Passion Projects", category: 'competitions' },
  { hole: 7, title: "AIME", category: 'competitions' },
  { hole: 8, title: "DECA", category: 'competitions' },
  { hole: 9, title: "Wyze Internship", category: 'internships' },
  { hole: 10, title: "Networking", category: 'internships' },
  { hole: 11, title: "Economics Olympiad", category: 'internships' },
  { hole: 12, title: "Venture with Jerry", category: 'startups' },
  { hole: 13, title: "PitchFork", category: 'startups' },
  { hole: 14, title: "Taper", category: 'startups' },
  { hole: 15, title: "Director of Sales", category: 'startups' },
  { hole: 16, title: "The Golden Ratio", category: 'me' },
  { hole: 17, title: "Senior Season", category: 'me' },
  { hole: 18, title: "The Journey Continues", category: 'me' },
];

const GolfCourseMap = () => {
  const [hoveredHole, setHoveredHole] = useState<number | null>(null);

  const scrollToCard = (holeId: number) => {
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

  const HoleCell = ({ hole, title, category, tooltipAbove = false }: { hole: number; title: string; category?: Category; tooltipAbove?: boolean }) => {
    const isHovered = hoveredHole === hole;
    const colors = category ? categoryColors[category] : null;
    
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
            ? `${colors?.border || 'border-amber-400'} ${colors?.bg || 'bg-amber-500/20'} scale-105 shadow-lg` 
            : `border-white/20 bg-white/5 hover:${colors?.border || 'border-amber-500/50'} hover:bg-white/10`
          }
          cursor-pointer group
        `}
        style={isHovered && colors ? { boxShadow: `0 10px 25px -5px ${colors.text.replace('text-', 'rgb(var(--')})` } : undefined}
      >
        {/* Category indicator dot */}
        {colors && (
          <div className={`absolute top-1 right-1 w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${colors.border.replace('border-', 'bg-')}`} />
        )}
        
        <span className={`
          text-xl sm:text-2xl md:text-3xl font-normal font-courier transition-colors duration-300
          ${isHovered ? (colors?.text || 'text-amber-400') : 'text-white group-hover:text-amber-300'}
        `}>
          {hole}
        </span>
        
        {/* Tooltip on hover */}
        {isHovered && (
          <div className={`absolute left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-sm text-green-900 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-courier whitespace-nowrap shadow-xl z-30 ${
            tooltipAbove ? 'bottom-full mb-2' : 'top-full mt-2'
          }`}>
            {title}
          </div>
        )}
      </button>
    );
  };


  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      {/* Scorecard Container */}
      <div className="relative rounded-2xl border border-white/20 bg-black/40 backdrop-blur-sm shadow-2xl">
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
            <div className="grid grid-cols-9 gap-1 sm:gap-1.5 md:gap-2">
              {frontNine.map(hole => (
                <HoleCell key={hole.hole} hole={hole.hole} title={hole.title} category={hole.category} />
              ))}
            </div>
          </div>
          
          {/* Back Nine Row */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 px-1">
              <span className="text-xs sm:text-sm font-courier text-amber-400/80 uppercase tracking-wider">Back 9</span>
              <div className="flex-grow h-px bg-gradient-to-r from-amber-400/30 to-transparent" />
            </div>
            <div className="grid grid-cols-9 gap-1 sm:gap-1.5 md:gap-2">
              {backNine.map(hole => (
                <HoleCell key={hole.hole} hole={hole.hole} title={hole.title} category={hole.category} tooltipAbove />
              ))}
            </div>
          </div>
          
          {/* Legend */}
          <div className="pt-3 sm:pt-4 border-t border-white/10">
            <div className="flex items-center justify-center gap-3 sm:gap-6 flex-wrap">
              {legendItems.map(item => (
                <div key={item.category} className="flex items-center gap-1.5 sm:gap-2">
                  <div className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full ${categoryColors[item.category].border.replace('border-', 'bg-')}`} />
                  <span className={`text-xs sm:text-sm font-courier ${categoryColors[item.category].text}`}>
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GolfCourseMap;
