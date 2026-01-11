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
  { x: 94.5, y: 84.5 },    // Hole 13
  { x: 89, y: 56 },    // Hole 14
  { x: 79, y: 32 },    // Hole 15
  { x: 52, y: 14 },    // Hole 16
  { x: 31, y: 11 },    // Hole 17
  { x: 21, y: 34 },    // Hole 18
];

const GolfCourseMap = () => {
  const [selectedHole, setSelectedHole] = useState<HoleData | null>(null);
  const [hoveredHole, setHoveredHole] = useState<number | null>(null);

  const selectedIndex = selectedHole ? selectedHole.hole - 1 : null;
  const selectedPos = selectedIndex !== null ? holePositions[selectedIndex] : null;

  // Calculate transform to zoom into selected hole
  const getTransformStyle = () => {
    if (!selectedPos) return {};
    
    // Zoom scale
    const scale = 2.5;
    
    // Calculate translation to center the selected hole
    const translateX = 50 - selectedPos.x;
    const translateY = 50 - selectedPos.y;
    
    return {
      transform: `scale(${scale}) translate(${translateX}%, ${translateY}%)`,
      transformOrigin: 'center center',
    };
  };

  return (
    <div className="w-full">
      {/* Course Map Container - aspect ratio matches the scorecard image */}
      <div className="relative w-full aspect-[1140/760] rounded-2xl overflow-hidden border border-white/20 shadow-2xl">
        {/* Zoomable content wrapper */}
        <div 
          className="absolute inset-0 transition-transform duration-700 ease-out"
          style={getTransformStyle()}
        >
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
            
            return (
              <button
                key={hole.hole}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500 group ${
                  isSelected ? 'z-30' : 'z-10'
                } ${selectedHole && !isSelected ? 'opacity-30 pointer-events-none' : 'opacity-100'}`}
                style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                onClick={() => setSelectedHole(isSelected ? null : hole)}
                onMouseEnter={() => !selectedHole && setHoveredHole(hole.hole)}
                onMouseLeave={() => setHoveredHole(null)}
              >
                {/* Simple blue circle marker */}
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-sans font-semibold text-sm transition-all duration-300 shadow-lg ${
                  isSelected 
                    ? 'bg-sky-400 text-white scale-125 ring-2 ring-white/50' 
                    : isHovered 
                      ? 'bg-sky-400 text-white scale-110' 
                      : 'bg-sky-500 text-white'
                }`}>
                  {hole.hole}
                </div>

                {/* Hover tooltip - only show when not zoomed */}
                {isHovered && !selectedHole && (
                  <div className="absolute left-1/2 top-full mt-2 -translate-x-1/2 bg-white/95 backdrop-blur-sm text-green-900 px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap shadow-xl z-30">
                    {hole.title}
                  </div>
                )}
              </button>
            );
          })}

        </div>


        {/* Expanded card overlay - appears when zoomed */}
        {selectedHole && (
          <div className="absolute inset-0 flex items-end justify-center p-6 z-40">
            <div className="w-full max-w-lg bg-amber-950/95 backdrop-blur-xl border border-white/30 rounded-2xl p-6 animate-fade-in shadow-2xl">
              <div className="flex items-start gap-5">
                <div className="w-16 h-16 rounded-full bg-sky-500 border-4 border-white/40 flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl font-sans font-bold text-white">{selectedHole.hole}</span>
                </div>
                <div className="flex-grow min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-serif text-white truncate">{selectedHole.title}</h3>
                    {selectedHole.year && (
                      <span className="px-2 py-0.5 bg-white/10 rounded text-sm font-mono text-white/70 flex-shrink-0">
                        {selectedHole.year}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-300 font-mono text-sm leading-relaxed">{selectedHole.description}</p>
                </div>
                <button
                  onClick={() => setSelectedHole(null)}
                  className="text-white/60 hover:text-white transition-colors p-1 flex-shrink-0 hover:bg-white/10 rounded-full"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GolfCourseMap;
