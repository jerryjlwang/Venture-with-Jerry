import { useState, useEffect } from 'react';
import golfScorecard from '@/assets/golf-scorecard.png';

interface HoleData {
  hole: number | 'clubhouse';
  title: string;
  description: string;
  year?: string;
}

const clubhouseData: HoleData = {
  hole: 'clubhouse',
  title: "Halfway House",
  description: "A quick stop to refuel and reset before tackling the back nine",
};

const clubhousePosition = { x: 14, y: 73 };

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

// Animation phases: idle -> zooming -> expanded
type AnimationPhase = 'idle' | 'zooming' | 'expanded';

// Calculate clamped translation to avoid empty space at edges
const getClampedTranslation = (x: number, y: number, scale: number) => {
  // At scale 1.3, we can translate up to 15% in each direction without showing empty space
  // Formula: maxTranslate = (scale - 1) / scale * 50 = 0.3/1.3 * 50 ≈ 11.5%
  const maxTranslate = ((scale - 1) / scale) * 50;
  
  // Calculate desired translation (move marker toward center, but not fully)
  const targetX = (50 - x) * 0.5; // Only move 50% toward center
  const targetY = (50 - y) * 0.5;
  
  // Clamp to avoid empty space
  const clampedX = Math.max(-maxTranslate, Math.min(maxTranslate, targetX));
  const clampedY = Math.max(-maxTranslate, Math.min(maxTranslate, targetY));
  
  return { x: clampedX, y: clampedY };
};

const GolfCourseMap = () => {
  const [selectedHole, setSelectedHole] = useState<HoleData | null>(null);
  const [hoveredHole, setHoveredHole] = useState<number | 'clubhouse' | null>(null);
  const [animationPhase, setAnimationPhase] = useState<AnimationPhase>('idle');
  const [zoomTarget, setZoomTarget] = useState<HoleData | null>(null);
  const [markerRect, setMarkerRect] = useState<{ x: number; y: number } | null>(null);

  const handleHoleClick = (hole: HoleData, isSelected: boolean, event: React.MouseEvent) => {
    if (isSelected || animationPhase !== 'idle') {
      // Close
      setAnimationPhase('idle');
      setSelectedHole(null);
      setZoomTarget(null);
      setMarkerRect(null);
    } else {
      // Get marker position for morph animation
      const button = event.currentTarget as HTMLElement;
      const container = button.closest('.aspect-\\[1140\\/760\\]') as HTMLElement;
      if (container) {
        const containerRect = container.getBoundingClientRect();
        const buttonRect = button.getBoundingClientRect();
        // Store position as percentage of container
        setMarkerRect({
          x: ((buttonRect.left + buttonRect.width / 2) - containerRect.left) / containerRect.width * 100,
          y: ((buttonRect.top + buttonRect.height / 2) - containerRect.top) / containerRect.height * 100,
        });
      }
      // Start zoom animation
      setZoomTarget(hole);
      setAnimationPhase('zooming');
    }
  };

  // After zoom completes, show the popup
  useEffect(() => {
    if (animationPhase === 'zooming' && zoomTarget) {
      const timer = setTimeout(() => {
        setSelectedHole(zoomTarget);
        setAnimationPhase('expanded');
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [animationPhase, zoomTarget]);

  const handleClose = () => {
    setAnimationPhase('idle');
    setSelectedHole(null);
    setZoomTarget(null);
    setMarkerRect(null);
  };

  const isZoomed = animationPhase === 'zooming' || animationPhase === 'expanded';
  const currentZoomHole = zoomTarget || selectedHole;
  
  // Get position for a hole (works for both numbered holes and clubhouse)
  const getHolePosition = (hole: HoleData) => {
    if (hole.hole === 'clubhouse') return clubhousePosition;
    return holePositions[hole.hole - 1];
  };
  
  // Calculate transform with clamped translation
  const getZoomTransform = () => {
    if (!isZoomed || !currentZoomHole) return 'scale(1) translate(0%, 0%)';
    const pos = getHolePosition(currentZoomHole);
    const scale = 1.3;
    const { x, y } = getClampedTranslation(pos.x, pos.y, scale);
    return `scale(${scale}) translate(${x}%, ${y}%)`;
  };

  return (
    <div className="w-full">
      {/* Course Map Container - aspect ratio matches the scorecard image */}
      <div className="relative w-full aspect-[1140/760] rounded-2xl overflow-hidden border border-white/20 shadow-2xl">
        {/* Content wrapper with zoom animation */}
        <div 
          className="absolute inset-0 transition-transform duration-500 ease-out origin-center"
          style={{ transform: getZoomTransform() }}
        >
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
                onClick={(e) => handleHoleClick(hole, isSelected, e)}
                onMouseEnter={() => animationPhase === 'idle' && setHoveredHole(hole.hole)}
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
                {isHovered && animationPhase === 'idle' && (
                  <div className="absolute left-1/2 top-full mt-2 -translate-x-1/2 bg-white/95 backdrop-blur-sm text-green-900 px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap shadow-xl z-30">
                    {hole.title}
                  </div>
                )}
              </button>
            );
          })}

          {/* Clubhouse marker */}
          {(() => {
            const isHovered = hoveredHole === 'clubhouse';
            const isSelected = selectedHole?.hole === 'clubhouse';
            
            return (
              <button
                className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 group z-10"
                style={{ left: `${clubhousePosition.x}%`, top: `${clubhousePosition.y}%` }}
                onClick={(e) => handleHoleClick(clubhouseData, isSelected, e)}
                onMouseEnter={() => animationPhase === 'idle' && setHoveredHole('clubhouse')}
                onMouseLeave={() => setHoveredHole(null)}
              >
                {/* Marker - home icon style */}
                <div 
                  className={`rounded-lg flex items-center justify-center font-sans font-semibold shadow-lg transition-all duration-200 ${
                    isSelected
                      ? 'w-10 h-10 bg-amber-500 text-white ring-2 ring-white/50'
                      : isHovered 
                        ? 'w-10 h-10 bg-amber-600 text-white scale-110' 
                        : 'w-8 h-8 bg-amber-700 text-white'
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                  </svg>
                </div>

                {/* Hover tooltip */}
                {isHovered && animationPhase === 'idle' && (
                  <div className="absolute left-1/2 top-full mt-2 -translate-x-1/2 bg-white/95 backdrop-blur-sm text-green-900 px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap shadow-xl z-30">
                    Halfway House
                  </div>
                )}
              </button>
            );
          })()}
        </div>

        {/* Morphing popup - starts from marker position and expands */}
        {(animationPhase === 'zooming' || animationPhase === 'expanded') && zoomTarget && markerRect && (
          <div 
            className="absolute z-50 pointer-events-none"
            style={{
              // Start from marker position, expand to full size
              left: animationPhase === 'zooming' ? `${markerRect.x}%` : '16px',
              top: animationPhase === 'zooming' ? `${markerRect.y}%` : '16px',
              right: animationPhase === 'zooming' ? 'auto' : '16px',
              bottom: animationPhase === 'zooming' ? 'auto' : '16px',
              width: animationPhase === 'zooming' ? '40px' : 'auto',
              height: animationPhase === 'zooming' ? '40px' : 'auto',
              transform: animationPhase === 'zooming' ? 'translate(-50%, -50%)' : 'none',
              transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}
          >
            <div 
              className={`w-full h-full bg-amber-950/95 backdrop-blur-xl rounded-2xl border border-white/30 shadow-2xl flex flex-col justify-center overflow-hidden ${
                animationPhase === 'expanded' ? 'pointer-events-auto' : ''
              }`}
              style={{
                padding: animationPhase === 'expanded' ? '32px' : '0',
                borderRadius: animationPhase === 'zooming' ? '50%' : '16px',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Content fades in after expansion */}
              <div 
                className="flex items-start gap-6 transition-opacity duration-300"
                style={{ opacity: animationPhase === 'expanded' ? 1 : 0 }}
              >
                <div className={`w-20 h-20 ${zoomTarget.hole === 'clubhouse' ? 'rounded-xl bg-amber-700' : 'rounded-full bg-sky-500'} border-4 border-white/40 flex items-center justify-center flex-shrink-0`}>
                  {zoomTarget.hole === 'clubhouse' ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                      <polyline points="9 22 9 12 15 12 15 22"></polyline>
                    </svg>
                  ) : (
                    <span className="text-3xl font-sans font-bold text-white">{zoomTarget.hole}</span>
                  )}
                </div>
                <div className="flex-grow min-w-0">
                  <div className="flex items-center gap-4 mb-3">
                    <h3 className="text-3xl font-serif text-white">{zoomTarget.title}</h3>
                    {zoomTarget.year && (
                      <span className="px-3 py-1 bg-white/10 rounded-lg text-lg font-mono text-white/70">
                        {zoomTarget.year}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-300 font-mono text-xl leading-relaxed">{zoomTarget.description}</p>
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

        {/* Click overlay to close */}
        {animationPhase === 'expanded' && (
          <div className="absolute inset-0 z-40" onClick={handleClose} />
        )}
      </div>
    </div>
  );
};

export default GolfCourseMap;
