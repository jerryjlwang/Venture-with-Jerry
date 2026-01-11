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

  const handleHoleClick = (hole: HoleData, isSelected: boolean) => {
    if (isSelected) {
      setSelectedHole(null);
    } else {
      setSelectedHole(hole);
    }
  };

  const handleClose = () => {
    setSelectedHole(null);
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

          {/* Hole markers - always visible */}
          {journeyData.map((hole, index) => {
            const pos = holePositions[index];
            const isHovered = hoveredHole === hole.hole;
            const isSelected = selectedHole?.hole === hole.hole;
            
            return (
              <button
                key={hole.hole}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 group z-10`}
                style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                onClick={() => handleHoleClick(hole, isSelected)}
                onMouseEnter={() => !selectedHole && setHoveredHole(hole.hole)}
                onMouseLeave={() => setHoveredHole(null)}
              >
                {/* Marker circle */}
                <div 
                  className={`rounded-full flex items-center justify-center font-sans font-semibold shadow-lg transition-all duration-200 ${
                    isSelected
                      ? 'w-10 h-10 bg-amber-500 text-white ring-2 ring-white/50'
                      : isHovered 
                        ? 'w-10 h-10 bg-sky-400 text-white scale-110' 
                        : 'w-8 h-8 bg-sky-500 text-white'
                  }`}
                >
                  <span className="text-sm text-white">{hole.hole}</span>
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

          {/* Expanded popup overlay - almost covers the whole map */}
          {selectedHole && (
            <div 
              className="absolute inset-4 z-50 flex items-center justify-center animate-scale-in"
              onClick={handleClose}
            >
              <div 
                className="w-full h-full bg-amber-950/95 backdrop-blur-xl rounded-2xl border border-white/30 p-8 shadow-2xl flex flex-col justify-center"
                onClick={(e) => e.stopPropagation()}
                style={{
                  animation: 'scale-in 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                }}
              >
                <div className="flex items-start gap-6">
                  <div className="w-20 h-20 rounded-full bg-sky-500 border-4 border-white/40 flex items-center justify-center flex-shrink-0">
                    <span className="text-3xl font-sans font-bold text-white">{selectedHole.hole}</span>
                  </div>
                  <div className="flex-grow min-w-0">
                    <div className="flex items-center gap-4 mb-3">
                      <h3 className="text-3xl font-serif text-white">{selectedHole.title}</h3>
                      {selectedHole.year && (
                        <span className="px-3 py-1 bg-white/10 rounded-lg text-lg font-mono text-white/70">
                          {selectedHole.year}
                        </span>
                      )}
                    </div>
                    <p className="text-gray-300 font-mono text-xl leading-relaxed">{selectedHole.description}</p>
                  </div>
                  <button
                    onClick={handleClose}
                    className="text-white/60 hover:text-white transition-colors p-2 flex-shrink-0 hover:bg-white/10 rounded-full"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
    </div>
  );
};

export default GolfCourseMap;
