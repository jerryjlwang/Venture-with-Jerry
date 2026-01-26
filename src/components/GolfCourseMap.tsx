import { useState } from 'react';
import golfScorecard from '@/assets/golf-scorecard.png';

interface HoleData {
  hole: number | 'clubhouse' | 'halfway';
  title: string;
}

const halfwayHouseData: HoleData = {
  hole: 'halfway',
  title: "Halfway House",
};

const halfwayHousePosition = { x: 13, y: 72 };

const clubhouseData: HoleData = {
  hole: 'clubhouse',
  title: "Clubhouse",
};

const clubhousePosition = { x: 7, y: 49 };

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

// Course layout positions - precise coordinates as % of image grid
const holePositions = [
  { x: 26.75, y: 36.25 },    // Hole 1
  { x: 48.75, y: 23.25 },    // Hole 2
  { x: 61.25, y: 30 },    // Hole 3
  { x: 74, y: 75.25 },    // Hole 4
  { x: 67.5, y: 58.25 },    // Hole 5
  { x: 56, y: 51.25 },    // Hole 6
  { x: 54.5, y: 72.5 },    // Hole 7
  { x: 31.25, y: 89.75 },    // Hole 8
  { x: 6, y: 73.25 },     // Hole 9
  { x: 34.25, y: 44.25 },    // Hole 10
  { x: 52.25, y: 39.25 },    // Hole 11
  { x: 89.5, y: 42.75 },    // Hole 12
  { x: 94.75, y: 82.5 },    // Hole 13
  { x: 87.5, y: 67.5 },    // Hole 14
  { x: 78, y: 31.25 },    // Hole 15
  { x: 54.25, y: 17.75 },    // Hole 16
  { x: 30.25, y: 10.75 },    // Hole 17
  { x: 20.25, y: 33 },    // Hole 18
];

const GolfCourseMap = () => {
  const [hoveredHole, setHoveredHole] = useState<number | 'clubhouse' | 'halfway' | null>(null);

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8">
      {/* Course Map Container */}
      <div className="relative w-full aspect-[1140/760] rounded-2xl overflow-hidden border border-white/20 shadow-2xl">
        {/* Scorecard background image - desaturated for sophisticated look */}
        <img 
          src={golfScorecard} 
          alt="Golf course scorecard map" 
          className="absolute inset-0 w-full h-full object-fill"
          style={{ filter: 'saturate(0.4) brightness(0.95)' }}
        />

        {/* Hole markers */}
        {journeyData.map((hole, index) => {
          const pos = holePositions[index];
          const isHovered = hoveredHole === hole.hole;
          
          return (
            <div
              key={hole.hole}
              className="absolute transform -translate-x-1/2 transition-all duration-300 group z-10"
              style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
              onMouseEnter={() => setHoveredHole(hole.hole)}
              onMouseLeave={() => setHoveredHole(null)}
            >
              {/* Elegant pin marker */}
              <div className="relative flex flex-col items-center">
                {/* Pin head with number */}
                <div 
                  className={`rounded-full flex items-center justify-center font-courier font-bold shadow-lg transition-all duration-200 ${
                    isHovered 
                      ? 'w-9 h-9 bg-amber-500 text-amber-950 scale-110' 
                      : 'w-8 h-8 bg-amber-600/90 text-white'
                  }`}
                  style={{
                    boxShadow: isHovered 
                      ? '0 4px 12px rgba(0,0,0,0.3), 0 0 20px rgba(251,191,36,0.4)' 
                      : '0 2px 8px rgba(0,0,0,0.3)',
                  }}
                >
                  <span className="text-sm">{hole.hole}</span>
                </div>
                {/* Pin point */}
                <div 
                  className={`w-0 h-0 transition-all duration-200 ${
                    isHovered ? 'border-l-[6px] border-r-[6px] border-t-[10px]' 
                    : 'border-l-[5px] border-r-[5px] border-t-[8px]'
                  }`}
                  style={{
                    borderLeftColor: 'transparent',
                    borderRightColor: 'transparent',
                    borderTopColor: isHovered ? '#f59e0b' : 'rgba(217, 119, 6, 0.9)',
                    marginTop: '-1px',
                  }}
                />
              </div>

              {isHovered && (
                <div className="absolute left-1/2 top-full mt-1 -translate-x-1/2 bg-white/95 backdrop-blur-sm text-green-900 px-3 py-1.5 rounded-lg text-sm font-courier whitespace-nowrap shadow-xl z-30">
                  {hole.title}
                </div>
              )}
            </div>
          );
        })}

        {/* Halfway House marker */}
        {(() => {
          const isHovered = hoveredHole === 'halfway';
          
          return (
            <div
              className="absolute transform -translate-x-1/2 transition-all duration-300 group z-10"
              style={{ left: `${halfwayHousePosition.x}%`, top: `${halfwayHousePosition.y}%` }}
              onMouseEnter={() => setHoveredHole('halfway')}
              onMouseLeave={() => setHoveredHole(null)}
            >
              <div className="relative flex flex-col items-center">
                <div 
                  className={`rounded-full flex items-center justify-center shadow-lg transition-all duration-200 ${
                    isHovered 
                      ? 'w-10 h-10 bg-amber-500 text-amber-950 scale-110' 
                      : 'w-9 h-9 bg-amber-600/90 text-white'
                  }`}
                  style={{
                    boxShadow: isHovered 
                      ? '0 4px 12px rgba(0,0,0,0.3), 0 0 20px rgba(251,191,36,0.4)' 
                      : '0 2px 8px rgba(0,0,0,0.3)',
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 8h1a4 4 0 1 1 0 8h-1"></path>
                    <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"></path>
                    <line x1="6" x2="6" y1="2" y2="4"></line>
                    <line x1="10" x2="10" y1="2" y2="4"></line>
                    <line x1="14" x2="14" y1="2" y2="4"></line>
                  </svg>
                </div>
                <div 
                  className={`w-0 h-0 transition-all duration-200 ${
                    isHovered ? 'border-l-[6px] border-r-[6px] border-t-[10px]' 
                    : 'border-l-[5px] border-r-[5px] border-t-[8px]'
                  }`}
                  style={{
                    borderLeftColor: 'transparent',
                    borderRightColor: 'transparent',
                    borderTopColor: isHovered ? '#f59e0b' : 'rgba(217, 119, 6, 0.9)',
                    marginTop: '-1px',
                  }}
                />
              </div>

              {isHovered && (
                <div className="absolute left-1/2 top-full mt-1 -translate-x-1/2 bg-white/95 backdrop-blur-sm text-green-900 px-3 py-1.5 rounded-lg text-sm font-courier whitespace-nowrap shadow-xl z-30">
                  Halfway House
                </div>
              )}
            </div>
          );
        })()}

        {/* Clubhouse marker */}
        {(() => {
          const isHovered = hoveredHole === 'clubhouse';
          
          return (
            <div
              className="absolute transform -translate-x-1/2 transition-all duration-300 group z-10"
              style={{ left: `${clubhousePosition.x}%`, top: `${clubhousePosition.y}%` }}
              onMouseEnter={() => setHoveredHole('clubhouse')}
              onMouseLeave={() => setHoveredHole(null)}
            >
              <div className="relative flex flex-col items-center">
                <div 
                  className={`rounded-full flex items-center justify-center shadow-lg transition-all duration-200 relative ${
                    isHovered 
                      ? 'w-12 h-12 bg-amber-500 text-amber-950 scale-110' 
                      : 'w-11 h-11 bg-amber-500/90 text-white clubhouse-pulse'
                  }`}
                  style={{
                    boxShadow: isHovered 
                      ? '0 4px 16px rgba(0,0,0,0.3), 0 0 24px rgba(251,191,36,0.5)' 
                      : '0 2px 10px rgba(0,0,0,0.3), 0 0 16px rgba(251,191,36,0.3)',
                  }}
                >
                  {/* Pulsing ring - only when not hovered */}
                  {!isHovered && (
                    <span className="absolute inset-0 rounded-full clubhouse-ring" />
                  )}
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 relative z-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                  </svg>
                </div>
                <div 
                  className={`w-0 h-0 transition-all duration-200 ${
                    isHovered ? 'border-l-[8px] border-r-[8px] border-t-[12px]' 
                    : 'border-l-[7px] border-r-[7px] border-t-[10px]'
                  }`}
                  style={{
                    borderLeftColor: 'transparent',
                    borderRightColor: 'transparent',
                    borderTopColor: isHovered ? '#f59e0b' : 'rgba(245, 158, 11, 0.9)',
                    marginTop: '-1px',
                  }}
                />
              </div>

              {isHovered && (
                <div className="absolute left-1/2 top-full mt-1 -translate-x-1/2 bg-white/95 backdrop-blur-sm text-green-900 px-3 py-1.5 rounded-lg text-sm font-courier whitespace-nowrap shadow-xl z-30">
                  Start Here
                </div>
              )}
            </div>
          );
        })()}
      </div>
    </div>
  );
};

export default GolfCourseMap;
