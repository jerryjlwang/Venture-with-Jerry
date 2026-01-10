import { useState } from 'react';

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

// Course layout positions matching the reference scorecard layout
const holePositions = [
  { x: 28, y: 52 },  // Hole 1
  { x: 42, y: 22 },  // Hole 2
  { x: 58, y: 18 },  // Hole 3
  { x: 62, y: 75 },  // Hole 4
  { x: 62, y: 55 },  // Hole 5
  { x: 52, y: 48 },  // Hole 6
  { x: 42, y: 72 },  // Hole 7
  { x: 32, y: 88 },  // Hole 8
  { x: 6, y: 68 },   // Hole 9
  { x: 35, y: 48 },  // Hole 10
  { x: 48, y: 38 },  // Hole 11
  { x: 92, y: 42 },  // Hole 12
  { x: 88, y: 82 },  // Hole 13
  { x: 85, y: 58 },  // Hole 14
  { x: 78, y: 28 },  // Hole 15
  { x: 52, y: 12 },  // Hole 16
  { x: 28, y: 8 },   // Hole 17
  { x: 15, y: 42 },  // Hole 18
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
      {/* Course Map Container */}
      <div className="relative w-full aspect-[16/10] bg-gradient-to-br from-amber-700 via-amber-800 to-amber-900 rounded-2xl overflow-hidden border border-white/20 shadow-2xl">
        {/* Zoomable content wrapper */}
        <div 
          className="absolute inset-0 transition-transform duration-700 ease-out"
          style={getTransformStyle()}
        >
          {/* Individual hole fairways */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            {/* Hole 1 - vertical fairway */}
            <ellipse cx="28" cy="45" rx="4" ry="12" fill="rgb(134, 197, 94)" transform="rotate(-10, 28, 45)" />
            <ellipse cx="28" cy="52" rx="2.5" ry="2.5" fill="rgb(144, 217, 104)" /> {/* green */}
            
            {/* Hole 2 - angled fairway */}
            <ellipse cx="42" cy="28" rx="3.5" ry="10" fill="rgb(134, 197, 94)" transform="rotate(15, 42, 28)" />
            <ellipse cx="42" cy="22" rx="2" ry="2" fill="rgb(144, 217, 104)" />
            
            {/* Hole 3 - horizontal fairway */}
            <ellipse cx="58" cy="20" rx="8" ry="3" fill="rgb(134, 197, 94)" transform="rotate(-5, 58, 20)" />
            <ellipse cx="58" cy="18" rx="2" ry="2" fill="rgb(144, 217, 104)" />
            
            {/* Hole 4 - large fairway bottom right */}
            <ellipse cx="62" cy="68" rx="5" ry="12" fill="rgb(134, 197, 94)" transform="rotate(10, 62, 68)" />
            <ellipse cx="62" cy="75" rx="2.5" ry="2.5" fill="rgb(144, 217, 104)" />
            
            {/* Hole 5 - mid right */}
            <ellipse cx="62" cy="52" rx="3" ry="6" fill="rgb(134, 197, 94)" transform="rotate(-5, 62, 52)" />
            <ellipse cx="62" cy="55" rx="2" ry="2" fill="rgb(144, 217, 104)" />
            
            {/* Hole 6 - center */}
            <ellipse cx="52" cy="45" rx="4" ry="7" fill="rgb(134, 197, 94)" transform="rotate(20, 52, 45)" />
            <ellipse cx="52" cy="48" rx="2" ry="2" fill="rgb(144, 217, 104)" />
            
            {/* Hole 7 - center bottom */}
            <ellipse cx="42" cy="68" rx="5" ry="8" fill="rgb(134, 197, 94)" transform="rotate(-15, 42, 68)" />
            <ellipse cx="42" cy="72" rx="2.5" ry="2.5" fill="rgb(144, 217, 104)" />
            
            {/* Hole 8 - bottom center */}
            <ellipse cx="32" cy="82" rx="6" ry="4" fill="rgb(134, 197, 94)" transform="rotate(5, 32, 82)" />
            <ellipse cx="32" cy="88" rx="2" ry="2" fill="rgb(144, 217, 104)" />
            
            {/* Hole 9 - far left */}
            <ellipse cx="10" cy="62" rx="4" ry="10" fill="rgb(134, 197, 94)" transform="rotate(-20, 10, 62)" />
            <ellipse cx="6" cy="68" rx="2.5" ry="2.5" fill="rgb(144, 217, 104)" />
            
            {/* Hole 10 - center left */}
            <ellipse cx="35" cy="44" rx="3" ry="8" fill="rgb(134, 197, 94)" transform="rotate(10, 35, 44)" />
            <ellipse cx="35" cy="48" rx="2" ry="2" fill="rgb(144, 217, 104)" />
            
            {/* Hole 11 - center */}
            <ellipse cx="48" cy="35" rx="4" ry="6" fill="rgb(134, 197, 94)" transform="rotate(-10, 48, 35)" />
            <ellipse cx="48" cy="38" rx="2" ry="2" fill="rgb(144, 217, 104)" />
            
            {/* Hole 12 - far right */}
            <ellipse cx="88" cy="42" rx="6" ry="4" fill="rgb(134, 197, 94)" />
            <ellipse cx="92" cy="42" rx="2.5" ry="2.5" fill="rgb(144, 217, 104)" />
            
            {/* Hole 13 - bottom right */}
            <ellipse cx="85" cy="78" rx="4" ry="8" fill="rgb(134, 197, 94)" transform="rotate(15, 85, 78)" />
            <ellipse cx="88" cy="82" rx="2" ry="2" fill="rgb(144, 217, 104)" />
            
            {/* Hole 14 - right side */}
            <ellipse cx="82" cy="55" rx="4" ry="7" fill="rgb(134, 197, 94)" transform="rotate(-10, 82, 55)" />
            <ellipse cx="85" cy="58" rx="2" ry="2" fill="rgb(144, 217, 104)" />
            
            {/* Hole 15 - upper right */}
            <ellipse cx="78" cy="32" rx="3" ry="8" fill="rgb(134, 197, 94)" transform="rotate(5, 78, 32)" />
            <ellipse cx="78" cy="28" rx="2" ry="2" fill="rgb(144, 217, 104)" />
            
            {/* Hole 16 - top center */}
            <ellipse cx="52" cy="15" rx="5" ry="6" fill="rgb(134, 197, 94)" transform="rotate(-5, 52, 15)" />
            <ellipse cx="52" cy="12" rx="2" ry="2" fill="rgb(144, 217, 104)" />
            
            {/* Hole 17 - top left */}
            <ellipse cx="28" cy="12" rx="4" ry="7" fill="rgb(134, 197, 94)" transform="rotate(-15, 28, 12)" />
            <ellipse cx="28" cy="8" rx="2" ry="2" fill="rgb(144, 217, 104)" />
            
            {/* Hole 18 - left side */}
            <ellipse cx="18" cy="38" rx="4" ry="8" fill="rgb(134, 197, 94)" transform="rotate(10, 18, 38)" />
            <ellipse cx="15" cy="42" rx="2.5" ry="2.5" fill="rgb(144, 217, 104)" />
            
            {/* Sand bunkers scattered */}
            <ellipse cx="30" cy="40" rx="2" ry="1.5" fill="rgb(250, 240, 220)" />
            <ellipse cx="60" cy="25" rx="2.5" ry="1" fill="rgb(250, 240, 220)" />
            <ellipse cx="45" cy="70" rx="2" ry="1.2" fill="rgb(250, 240, 220)" />
            <ellipse cx="80" cy="50" rx="1.8" ry="1" fill="rgb(250, 240, 220)" />
            <ellipse cx="55" cy="52" rx="1.5" ry="1" fill="rgb(250, 240, 220)" />
            <ellipse cx="38" cy="82" rx="2" ry="1.2" fill="rgb(250, 240, 220)" />
            <ellipse cx="90" cy="75" rx="1.8" ry="1" fill="rgb(250, 240, 220)" />
            <ellipse cx="25" cy="18" rx="1.5" ry="1" fill="rgb(250, 240, 220)" />
            <ellipse cx="72" cy="35" rx="2" ry="1.2" fill="rgb(250, 240, 220)" />
            
            {/* Cart paths */}
            <path
              d="M15,50 Q25,55 35,50 Q45,45 55,50 Q65,55 75,48 Q85,42 92,45"
              fill="none"
              stroke="rgba(156, 163, 175, 0.5)"
              strokeWidth="0.8"
              strokeDasharray="2,1"
            />
            <path
              d="M10,70 Q20,75 30,85 Q40,80 50,75 Q60,78 70,72 Q80,78 88,80"
              fill="none"
              stroke="rgba(156, 163, 175, 0.5)"
              strokeWidth="0.8"
              strokeDasharray="2,1"
            />
          </svg>

          {/* Water hazard - ocean on the right */}
          <div className="absolute top-0 right-0 w-[8%] h-full bg-gradient-to-l from-sky-600/60 via-sky-500/40 to-transparent" />
          
          {/* Tree clusters */}
          <div className="absolute top-[35%] right-[5%] w-12 h-16 bg-green-900/70 rounded-full blur-sm" />
          <div className="absolute top-[25%] left-[3%] w-8 h-10 bg-green-900/60 rounded-full blur-sm" />

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

          {/* Clubhouse - hide when zoomed */}
          <div className={`absolute bottom-4 right-4 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2 border border-white/20 transition-opacity duration-500 ${
            selectedHole ? 'opacity-0' : 'opacity-100'
          }`}>
            <span className="text-white/80 text-xs font-mono">Clubhouse</span>
          </div>
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
