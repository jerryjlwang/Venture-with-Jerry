import { useState } from 'react';
import golfScorecard from '@/assets/golf-scorecard.png';

interface HoleData {
  hole: number;
  title: string;
  description: string;
  year?: string;
}

const journeyData: HoleData[] = [
  { hole: 1, title: "First Swing", description: "Discovered golf through First Tee Greater Seattle", year: "2018" },
  { hole: 2, title: "Learning the Basics", description: "Grip, stance, and the fundamentals of the game", year: "2018" },
  { hole: 3, title: "First Tee Values", description: "Learning honesty, integrity, and sportsmanship", year: "2018" },
  { hole: 4, title: "First Par", description: "The thrill of my first par on a real course", year: "2019" },
  { hole: 5, title: "Junior Tournaments", description: "Competing in my first junior golf events", year: "2019" },
  { hole: 6, title: "The Mental Game", description: "Learning patience and focus on the course", year: "2019" },
  { hole: 7, title: "Course Management", description: "Strategy over power - playing smart", year: "2020" },
  { hole: 8, title: "Practice Routine", description: "Building discipline through daily practice", year: "2020" },
  { hole: 9, title: "The Turn", description: "Halfway through - reflecting on growth", year: "2020" },
  { hole: 10, title: "High School Golf", description: "Trying out for the varsity team", year: "2021" },
  { hole: 11, title: "Making Varsity", description: "Earning a spot on the varsity golf team", year: "2021" },
  { hole: 12, title: "Team Competition", description: "Learning to compete as part of a team", year: "2021" },
  { hole: 13, title: "Breaking 80", description: "A milestone round in my golf journey", year: "2022" },
  { hole: 14, title: "Leadership", description: "Mentoring younger players on the team", year: "2022" },
  { hole: 15, title: "Overcoming Slumps", description: "Pushing through the challenging times", year: "2022" },
  { hole: 16, title: "State Qualifiers", description: "Competing at the highest level", year: "2023" },
  { hole: 17, title: "Senior Season", description: "Leading the team in my final year", year: "2023" },
  { hole: 18, title: "The Journey Continues", description: "Golf for life - what's next", year: "2024" },
];

// Course layout positions - precise coordinates as % of image grid
// Measured from the scorecard image where each small blue circle appears
const holePositions = [
  { x: 26.5, y: 37.5 },    // Hole 1
  { x: 48.5, y: 24.5 },    // Hole 2
  { x: 61, y: 31 },    // Hole 3
  { x: 74, y: 77 },    // Hole 4
  { x: 67.5, y: 59 },    // Hole 5
  { x: 55.75, y: 52 },    // Hole 6
  { x: 54.25, y: 73.5 },    // Hole 7
  { x: 31, y: 91 },    // Hole 8
  { x: 5.5, y: 75 },     // Hole 9
  { x: 34, y: 45.5 },    // Hole 10
  { x: 52, y: 40.5 },    // Hole 11
  { x: 89.5, y: 44 },    // Hole 12
  { x: 95, y: 84 },    // Hole 13
  { x: 88, y: 69 },    // Hole 14
  { x: 78.25, y: 32.25 },    // Hole 15
  { x: 54, y: 19 },    // Hole 16
  { x: 30.75, y: 12 },    // Hole 17
  { x: 20, y: 34.25 },    // Hole 18
];

const GolfCourseMap = () => {
  const [selectedHole, setSelectedHole] = useState<HoleData | null>(null);
  const [hoveredHole, setHoveredHole] = useState<number | null>(null);
  const [expandingHole, setExpandingHole] = useState<number | null>(null);

  const handleHoleClick = (hole: HoleData, isSelected: boolean) => {
    if (isSelected) {
      setSelectedHole(null);
      setExpandingHole(null);
    } else {
      setExpandingHole(hole.hole);
      // Small delay to allow the expansion animation to start
      setTimeout(() => setSelectedHole(hole), 50);
    }
  };

  const handleClose = () => {
    setSelectedHole(null);
    setExpandingHole(null);
  };

  return (
    <div className="w-full">
      {/* Course Map Container - aspect ratio matches the scorecard image */}
      <div className="relative w-full aspect-[1140/760] rounded-2xl overflow-hidden border border-white/20 shadow-2xl">
        {/* Static content wrapper - no zoom */}
        <div className="absolute inset-0">
          {/* Scorecard background image - object-contain ensures no cropping */}
          <img 
            src={golfScorecard} 
            alt="Golf course scorecard map" 
            className="absolute inset-0 w-full h-full object-fill"
          />

          {/* Hole markers */}
          {journeyData.map((hole, index) => {
            const pos = holePositions[index];
            const isHovered = hoveredHole === hole.hole;
            const isSelected = selectedHole?.hole === hole.hole;
            const isExpanding = expandingHole === hole.hole;
            
            return (
              <button
                key={hole.hole}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 group ${
                  isExpanding ? 'z-50' : isSelected ? 'z-30' : 'z-10'
                } ${selectedHole && !isSelected ? 'opacity-30 pointer-events-none' : 'opacity-100'}`}
                style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                onClick={() => handleHoleClick(hole, isSelected)}
                onMouseEnter={() => !selectedHole && setHoveredHole(hole.hole)}
                onMouseLeave={() => setHoveredHole(null)}
              >
                {/* Marker that expands into popup */}
                <div 
                  className={`rounded-full flex items-center justify-center font-sans font-semibold transition-all shadow-lg origin-center ${
                    isExpanding || isSelected
                      ? 'w-64 h-auto min-h-[80px] rounded-2xl bg-amber-950/95 backdrop-blur-xl border border-white/30 p-4'
                      : isHovered 
                        ? 'w-10 h-10 bg-sky-400 text-white scale-110' 
                        : 'w-8 h-8 bg-sky-500 text-white'
                  }`}
                  style={{
                    transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  }}
                >
                  {isExpanding || isSelected ? (
                    // Expanded content
                    <div className="flex items-start gap-3 w-full animate-fade-in">
                      <div className="w-10 h-10 rounded-full bg-sky-500 border-2 border-white/40 flex items-center justify-center flex-shrink-0">
                        <span className="text-base font-sans font-bold text-white">{hole.hole}</span>
                      </div>
                      <div className="flex-grow min-w-0 text-left">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-sm font-serif text-white truncate">{hole.title}</h3>
                          {hole.year && (
                            <span className="px-1.5 py-0.5 bg-white/10 rounded text-xs font-mono text-white/70 flex-shrink-0">
                              {hole.year}
                            </span>
                          )}
                        </div>
                        <p className="text-gray-300 font-mono text-xs leading-relaxed">{hole.description}</p>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleClose();
                        }}
                        className="text-white/60 hover:text-white transition-colors p-0.5 flex-shrink-0 hover:bg-white/10 rounded-full"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="18" y1="6" x2="6" y2="18"></line>
                          <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                      </button>
                    </div>
                  ) : (
                    // Collapsed number
                    <span className="text-sm text-white">{hole.hole}</span>
                  )}
                </div>

                {/* Hover tooltip - only show when not selected */}
                {isHovered && !selectedHole && (
                  <div className="absolute left-1/2 top-full mt-2 -translate-x-1/2 bg-white/95 backdrop-blur-sm text-green-900 px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap shadow-xl z-30">
                    {hole.title}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default GolfCourseMap;
