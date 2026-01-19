import { useState, useEffect, useCallback } from 'react';
import golfScorecard from '@/assets/golf-scorecard.png';

// User's original photos for popup content
import clubhousePhoto from '@/assets/clubhouse-photo.jpeg';
import hole2Photo from '@/assets/hole2-photo.jpeg';
import hole3Photo from '@/assets/hole3-photo.png';
import hole4Photo from '@/assets/hole4-photo.jpeg';
import hole5Photo from '@/assets/hole5-photo.png';
import hole6Photo from '@/assets/hole6-photo.jpeg';
import hole7Photo from '@/assets/hole7-photo.png';
import hole8Photo from '@/assets/hole8-photo.jpeg';
import hole9Photo from '@/assets/hole9-photo.png';
import hole10Photo from '@/assets/hole10-photo.jpeg';
import hole11Photo from '@/assets/hole11-photo.png';
import hole12Photo from '@/assets/hole12-photo.png';
import hole13Photo from '@/assets/hole13-photo.png';

// Chambers Bay background images for popups
import chambersBayClubhouse from '@/assets/chambers-bay-clubhouse.jpg';
import chambersBayHalfway from '@/assets/chambers-bay-halfway.jpg';
import chambersBayHole1 from '@/assets/chambers-bay-hole1.jpg';
import chambersBayHole2 from '@/assets/chambers-bay-hole2.jpg';
import chambersBayHole3 from '@/assets/chambers-bay-hole3.jpg';
import chambersBayHole4 from '@/assets/chambers-bay-hole4.jpg';
import chambersBayHole5 from '@/assets/chambers-bay-hole5.jpg';
import chambersBayHole6 from '@/assets/chambers-bay-hole6.jpg';
import chambersBayHole7 from '@/assets/chambers-bay-hole7.jpg';
import chambersBayHole8 from '@/assets/chambers-bay-hole8.jpg';
import chambersBayHole9 from '@/assets/chambers-bay-hole9.jpg';
import chambersBayHole10 from '@/assets/chambers-bay-hole10.jpg';
import chambersBayHole11 from '@/assets/chambers-bay-hole11.jpg';
import chambersBayHole12 from '@/assets/chambers-bay-hole12.jpg';
import chambersBayHole13 from '@/assets/chambers-bay-hole13.jpg';
import chambersBayHole14 from '@/assets/chambers-bay-hole14.jpg';
import chambersBayHole15 from '@/assets/chambers-bay-hole15.jpg';
import chambersBayHole16 from '@/assets/chambers-bay-hole16.jpg';
import chambersBayHole17 from '@/assets/chambers-bay-hole17.jpg';
import chambersBayHole18 from '@/assets/chambers-bay-hole18.jpg';

interface HoleData {
  hole: number | 'clubhouse' | 'halfway';
  title: string;
  description: string;
  year?: string;
}

const halfwayHouseData: HoleData = {
  hole: 'halfway',
  title: "Halfway House",
  description: "At this point in time, I took a step back to think about what I really wanted. After interviewing a venture capital partner for a class project, my eyes caught a glimpse of the startup world for the first time.",
};

const halfwayHousePosition = { x: 13, y: 72 };

const clubhouseData: HoleData = {
  hole: 'clubhouse',
  title: "Clubhouse",
  description: "The clubhouse is where every round begins and ends. For me, this cycle looked like picking up my first club after leaving my previous passion, soccer, behind.",
};

const clubhousePosition = { x: 7, y: 49 };

const journeyData: HoleData[] = [
  { hole: 1, title: "First swings", description: "My primary interest at this time was math and programming. Mostly through competitions, I aspired to be a software developer because I loved using computational methods to solve problems.", year: "2018" },
  { hole: 2, title: "A chunk and a hole out", description: "After my first round of 168 at Bellevue Golf Course, I was ready to toss the clubs. However, seeing the $5 tee times offered through Youth on Course, I decided to give it another shot. After a thinned chip-in on the second par-5 for quadruple bogey, I became hooked.", year: "2018" },
  { hole: 3, title: "First Tee", description: "I started volunteering with First Tee, representing the non-profit at the Seattle Golf Show and helping out with equipment sales.", year: "2018" },
  { hole: 4, title: "High School Varsity", description: "After relentless driving range practice and dozens of balls lost to the pond, I made the Varsity team in my second year of golfing.", year: "2019" },
  { hole: 5, title: "Junior Tournaments", description: "I played in my first WJGA tournaments that summer and performed...horribly.", year: "2019" },
  { hole: 6, title: "Passion Projects", description: "I built a lot of projects at this time (i.e. A pricing algorithm so my family wouldn't overcharge for rent or a course management tool using machine learning to make better swing decisions.", year: "2019" },
  { hole: 7, title: "AIME", description: "After my 3rd AIME, I learned that I wanted to use computation for more ambitious projects.", year: "2020" },
  { hole: 8, title: "DECA", description: "I also joined DECA to build my business acumen, though I faced many pitfalls due to lack of commitment.", year: "2020" },
  { hole: 9, title: "Wyze Internship", description: "Summer after sophomore year: I finally got real life experience while interning at Wyze Labs.", year: "2020" },
  { hole: 10, title: "Networking", description: "I was invited to several networking at this time with the help of gracious mentors who valued my passion.", year: "2021" },
  { hole: 11, title: "Economics Olympiad", description: "I took a shot with the Economics Olympiad, and ended up being one of 50 to qualify to the national round.", year: "2021" },
  { hole: 12, title: "Venture with Jerry", description: "I started reaching out to venture capital investors/operators, then built the blog you're on right now.", year: "2021" },
  { hole: 13, title: "PitchFork", description: "Drawing from my interviews and other experiences at tech events, I found a new problem to tackle that had amazing potential to scale.", year: "2022" },
  { hole: 14, title: "Taper", description: "I joined the Taper team as well, a matchmaking platform for student barbers and college students.", year: "2022" },
  { hole: 15, title: "Director of Sales", description: "After junior year, I was elected by my peers to lead the Junior Advisory Board as the Director of Sales. With this agency, I could now address many of the problems I had observed.", year: "2022" },
  { hole: 16, title: "The Golden Ratio", description: "I was recruited for an internship by one of my interviewees because he respected my tenacity. I helped with growth, co-hosted events, and even rebuilt the entire web platform for the new year.", year: "2023" },
  { hole: 17, title: "Senior Season", description: "My final golf season didn't go expected, but it was the most fun I've had playng golf. I'm glad I could share my experiences with my teammates and the memories will carry on for every swing I make in the future.", year: "2023" },
  { hole: 18, title: "The Journey Continues", description: "Golf, startups, I'm not sure what's next. I do know that I wont be sitting still, there's too much to uncover.", year: "2024" },
];

// Complete journey order: clubhouse -> holes 1-9 -> halfway house -> holes 10-18 -> back to clubhouse
const journeyOrder: (HoleData)[] = [
  clubhouseData,
  ...journeyData.slice(0, 9), // Holes 1-9
  halfwayHouseData,
  ...journeyData.slice(9), // Holes 10-18
];

// Course layout positions - precise coordinates as % of image grid
const holePositions = [
  { x: 26.75, y: 36.25 },    // Hole 1
  { x: 48.75, y: 23.25 },    // Hole 2
  { x: 61.5, y: 30.5 },    // Hole 3
  { x: 74.25, y: 76 },    // Hole 4
  { x: 67.75, y: 58.5 },    // Hole 5
  { x: 56, y: 51.25 },    // Hole 6
  { x: 54.5, y: 72.5 },    // Hole 7
  { x: 31.25, y: 90 },    // Hole 8
  { x: 6, y: 74 },     // Hole 9
  { x: 34.25, y: 44.5 },    // Hole 10
  { x: 52.25, y: 39.5 },    // Hole 11
  { x: 89.5, y: 43 },    // Hole 12
  { x: 94.75, y: 83 },    // Hole 13
  { x: 87.5, y: 68 },    // Hole 14
  { x: 78, y: 31.5 },    // Hole 15
  { x: 54.25, y: 18 },    // Hole 16
  { x: 30.25, y: 11 },    // Hole 17
  { x: 20.25, y: 33.25 },    // Hole 18
];

// Animation phases: idle -> zooming -> expanded -> transitioning (zoom out then zoom in)
type AnimationPhase = 'idle' | 'zooming' | 'expanded' | 'transitioning';

// Calculate clamped translation to avoid empty space at edges
const getClampedTranslation = (x: number, y: number, scale: number) => {
  const maxTranslate = ((scale - 1) / scale) * 50;
  const targetX = (50 - x) * 0.5;
  const targetY = (50 - y) * 0.5;
  const clampedX = Math.max(-maxTranslate, Math.min(maxTranslate, targetX));
  const clampedY = Math.max(-maxTranslate, Math.min(maxTranslate, targetY));
  return { x: clampedX, y: clampedY };
};

// Get user's photo for popup content
const getHolePhoto = (hole: number | 'clubhouse' | 'halfway') => {
  switch (hole) {
    case 'clubhouse': return clubhousePhoto;
    case 2: return hole2Photo;
    case 3: return hole3Photo;
    case 4: return hole4Photo;
    case 5: return hole5Photo;
    case 6: return hole6Photo;
    case 7: return hole7Photo;
    case 8: return hole8Photo;
    case 9: return hole9Photo;
    case 10: return hole10Photo;
    case 11: return hole11Photo;
    case 12: return hole12Photo;
    case 13: return hole13Photo;
    default: return null;
  }
};

// Get Chambers Bay background for each hole
const getHoleBackground = (hole: number | 'clubhouse' | 'halfway') => {
  switch (hole) {
    case 'clubhouse': return chambersBayClubhouse;
    case 'halfway': return chambersBayHalfway;
    case 1: return chambersBayHole1;
    case 2: return chambersBayHole2;
    case 3: return chambersBayHole3;
    case 4: return chambersBayHole4;
    case 5: return chambersBayHole5;
    case 6: return chambersBayHole6;
    case 7: return chambersBayHole7;
    case 8: return chambersBayHole8;
    case 9: return chambersBayHole9;
    case 10: return chambersBayHole10;
    case 11: return chambersBayHole11;
    case 12: return chambersBayHole12;
    case 13: return chambersBayHole13;
    case 14: return chambersBayHole14;
    case 15: return chambersBayHole15;
    case 16: return chambersBayHole16;
    case 17: return chambersBayHole17;
    case 18: return chambersBayHole18;
    default: return chambersBayHole1;
  }
};

const GolfCourseMap = () => {
  const [selectedHole, setSelectedHole] = useState<HoleData | null>(null);
  const [hoveredHole, setHoveredHole] = useState<number | 'clubhouse' | 'halfway' | null>(null);
  const [animationPhase, setAnimationPhase] = useState<AnimationPhase>('idle');
  const [zoomTarget, setZoomTarget] = useState<HoleData | null>(null);
  const [markerRect, setMarkerRect] = useState<{ x: number; y: number } | null>(null);
  const [currentJourneyIndex, setCurrentJourneyIndex] = useState<number>(0);
  const [isPresentationMode, setIsPresentationMode] = useState(false);
  const [autoProgressTimer, setAutoProgressTimer] = useState<NodeJS.Timeout | null>(null);

  // Get position for a hole
  const getHolePosition = useCallback((hole: HoleData) => {
    if (hole.hole === 'clubhouse') return clubhousePosition;
    if (hole.hole === 'halfway') return halfwayHousePosition;
    return holePositions[(hole.hole as number) - 1];
  }, []);

  // Navigate to a specific hole with animation
  const navigateToHole = useCallback((hole: HoleData, index: number) => {
    const pos = getHolePosition(hole);
    setMarkerRect({ x: pos.x, y: pos.y });
    setZoomTarget(hole);
    setCurrentJourneyIndex(index);
    setAnimationPhase('zooming');
  }, [getHolePosition]);

  // Go to next hole
  const goToNext = useCallback(() => {
    if (currentJourneyIndex < journeyOrder.length - 1) {
      // First zoom out
      setAnimationPhase('transitioning');
      setTimeout(() => {
        const nextIndex = currentJourneyIndex + 1;
        const nextHole = journeyOrder[nextIndex];
        navigateToHole(nextHole, nextIndex);
      }, 400);
    } else {
      // End of journey - close
      handleClose();
    }
  }, [currentJourneyIndex, navigateToHole]);

  // Go to previous hole
  const goToPrev = useCallback(() => {
    if (currentJourneyIndex > 0) {
      setAnimationPhase('transitioning');
      setTimeout(() => {
        const prevIndex = currentJourneyIndex - 1;
        const prevHole = journeyOrder[prevIndex];
        navigateToHole(prevHole, prevIndex);
      }, 400);
    }
  }, [currentJourneyIndex, navigateToHole]);

  const handleHoleClick = (hole: HoleData, isSelected: boolean, event: React.MouseEvent) => {
    if (isSelected || animationPhase !== 'idle') {
      handleClose();
      return;
    }

    // Find index in journey order
    const index = journeyOrder.findIndex(h => h.hole === hole.hole);
    
    // If clicking clubhouse, start presentation mode
    if (hole.hole === 'clubhouse') {
      setIsPresentationMode(true);
    }

    // Get marker position
    const button = event.currentTarget as HTMLElement;
    const container = button.closest('.aspect-\\[1140\\/760\\]') as HTMLElement;
    if (container) {
      const containerRect = container.getBoundingClientRect();
      const buttonRect = button.getBoundingClientRect();
      setMarkerRect({
        x: ((buttonRect.left + buttonRect.width / 2) - containerRect.left) / containerRect.width * 100,
        y: ((buttonRect.top + buttonRect.height / 2) - containerRect.top) / containerRect.height * 100,
      });
    }
    
    setZoomTarget(hole);
    setCurrentJourneyIndex(index >= 0 ? index : 0);
    setAnimationPhase('zooming');
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

  // Auto-progress in presentation mode
  useEffect(() => {
    if (isPresentationMode && animationPhase === 'expanded') {
      const timer = setTimeout(() => {
        goToNext();
      }, 5000); // 5 seconds per hole
      setAutoProgressTimer(timer);
      return () => clearTimeout(timer);
    }
  }, [isPresentationMode, animationPhase, goToNext]);

  const handleClose = () => {
    if (autoProgressTimer) {
      clearTimeout(autoProgressTimer);
    }
    setAnimationPhase('idle');
    setSelectedHole(null);
    setZoomTarget(null);
    setMarkerRect(null);
    setIsPresentationMode(false);
    setCurrentJourneyIndex(0);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (animationPhase !== 'expanded') return;
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        goToNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goToPrev();
      } else if (e.key === 'Escape') {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [animationPhase, goToNext, goToPrev]);

  const isZoomed = animationPhase === 'zooming' || animationPhase === 'expanded';
  const currentZoomHole = zoomTarget || selectedHole;
  
  // Calculate transform with clamped translation
  const getZoomTransform = () => {
    if (animationPhase === 'transitioning') return 'scale(1) translate(0%, 0%)';
    if (!isZoomed || !currentZoomHole) return 'scale(1) translate(0%, 0%)';
    const pos = getHolePosition(currentZoomHole);
    const scale = 1.3;
    const { x, y } = getClampedTranslation(pos.x, pos.y, scale);
    return `scale(${scale}) translate(${x}%, ${y}%)`;
  };

  const holeBackground = zoomTarget ? getHoleBackground(zoomTarget.hole) : null;
  const holePhoto = zoomTarget ? getHolePhoto(zoomTarget.hole) : null;

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Course Map Container */}
      <div className="relative w-full aspect-[1140/760] rounded-2xl overflow-hidden border border-white/20 shadow-2xl">
        {/* Content wrapper with zoom animation */}
        <div 
          className="absolute inset-0 transition-transform duration-500 ease-out origin-center"
          style={{ transform: getZoomTransform() }}
        >
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
            const isSelected = selectedHole?.hole === hole.hole;
            
            return (
              <button
                key={hole.hole}
                className={`absolute transform -translate-x-1/2 transition-all duration-300 group z-10`}
                style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                onClick={(e) => handleHoleClick(hole, isSelected, e)}
                onMouseEnter={() => animationPhase === 'idle' && setHoveredHole(hole.hole)}
                onMouseLeave={() => setHoveredHole(null)}
              >
                {/* Elegant pin marker */}
                <div className="relative flex flex-col items-center">
                  {/* Pin head with number */}
                  <div 
                    className={`rounded-full flex items-center justify-center font-courier font-bold shadow-lg transition-all duration-200 ${
                      isSelected
                        ? 'w-9 h-9 bg-amber-400 text-amber-950 ring-2 ring-white/60'
                        : isHovered 
                          ? 'w-9 h-9 bg-amber-500 text-amber-950 scale-110' 
                          : 'w-8 h-8 bg-amber-600/90 text-white'
                    }`}
                    style={{
                      boxShadow: isSelected || isHovered 
                        ? '0 4px 12px rgba(0,0,0,0.3), 0 0 20px rgba(251,191,36,0.4)' 
                        : '0 2px 8px rgba(0,0,0,0.3)',
                    }}
                  >
                    <span className="text-sm">{hole.hole}</span>
                  </div>
                  {/* Pin point */}
                  <div 
                    className={`w-0 h-0 transition-all duration-200 ${
                      isSelected ? 'border-l-[6px] border-r-[6px] border-t-[10px]' 
                      : isHovered ? 'border-l-[6px] border-r-[6px] border-t-[10px]' 
                      : 'border-l-[5px] border-r-[5px] border-t-[8px]'
                    }`}
                    style={{
                      borderLeftColor: 'transparent',
                      borderRightColor: 'transparent',
                      borderTopColor: isSelected ? '#fbbf24' : isHovered ? '#f59e0b' : 'rgba(217, 119, 6, 0.9)',
                      marginTop: '-1px',
                    }}
                  />
                </div>

                {isHovered && animationPhase === 'idle' && (
                  <div className="absolute left-1/2 top-full mt-1 -translate-x-1/2 bg-white/95 backdrop-blur-sm text-green-900 px-3 py-1.5 rounded-lg text-sm font-courier whitespace-nowrap shadow-xl z-30">
                    {hole.title}
                  </div>
                )}
              </button>
            );
          })}

          {/* Halfway House marker */}
          {(() => {
            const isHovered = hoveredHole === 'halfway';
            const isSelected = selectedHole?.hole === 'halfway';
            
            return (
              <button
                className="absolute transform -translate-x-1/2 transition-all duration-300 group z-10"
                style={{ left: `${halfwayHousePosition.x}%`, top: `${halfwayHousePosition.y}%` }}
                onClick={(e) => handleHoleClick(halfwayHouseData, isSelected, e)}
                onMouseEnter={() => animationPhase === 'idle' && setHoveredHole('halfway')}
                onMouseLeave={() => setHoveredHole(null)}
              >
                <div className="relative flex flex-col items-center">
                  <div 
                    className={`rounded-full flex items-center justify-center shadow-lg transition-all duration-200 ${
                      isSelected
                        ? 'w-10 h-10 bg-amber-400 text-amber-950 ring-2 ring-white/60'
                        : isHovered 
                          ? 'w-10 h-10 bg-amber-500 text-amber-950 scale-110' 
                          : 'w-9 h-9 bg-amber-600/90 text-white'
                    }`}
                    style={{
                      boxShadow: isSelected || isHovered 
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
                      isSelected || isHovered ? 'border-l-[6px] border-r-[6px] border-t-[10px]' 
                      : 'border-l-[5px] border-r-[5px] border-t-[8px]'
                    }`}
                    style={{
                      borderLeftColor: 'transparent',
                      borderRightColor: 'transparent',
                      borderTopColor: isSelected ? '#fbbf24' : isHovered ? '#f59e0b' : 'rgba(217, 119, 6, 0.9)',
                      marginTop: '-1px',
                    }}
                  />
                </div>

                {isHovered && animationPhase === 'idle' && (
                  <div className="absolute left-1/2 top-full mt-1 -translate-x-1/2 bg-white/95 backdrop-blur-sm text-green-900 px-3 py-1.5 rounded-lg text-sm font-courier whitespace-nowrap shadow-xl z-30">
                    Halfway House
                  </div>
                )}
              </button>
            );
          })()}

          {/* Clubhouse marker */}
          {(() => {
            const isHovered = hoveredHole === 'clubhouse';
            const isSelected = selectedHole?.hole === 'clubhouse';
            
            return (
              <button
                className="absolute transform -translate-x-1/2 transition-all duration-300 group z-10"
                style={{ left: `${clubhousePosition.x}%`, top: `${clubhousePosition.y}%` }}
                onClick={(e) => handleHoleClick(clubhouseData, isSelected, e)}
                onMouseEnter={() => animationPhase === 'idle' && setHoveredHole('clubhouse')}
                onMouseLeave={() => setHoveredHole(null)}
              >
                <div className="relative flex flex-col items-center">
                  <div 
                    className={`rounded-full flex items-center justify-center shadow-lg transition-all duration-200 relative ${
                      isSelected
                        ? 'w-12 h-12 bg-amber-400 text-amber-950 ring-2 ring-white/60'
                        : isHovered 
                          ? 'w-12 h-12 bg-amber-500 text-amber-950 scale-110' 
                          : 'w-11 h-11 bg-amber-500/90 text-white clubhouse-pulse'
                    }`}
                    style={{
                      boxShadow: isSelected || isHovered 
                        ? '0 4px 16px rgba(0,0,0,0.3), 0 0 24px rgba(251,191,36,0.5)' 
                        : '0 2px 10px rgba(0,0,0,0.3), 0 0 16px rgba(251,191,36,0.3)',
                    }}
                  >
                    {/* Pulsing ring - only when not hovered and not selected */}
                    {!isHovered && !isSelected && (
                      <span className="absolute inset-0 rounded-full clubhouse-ring" />
                    )}
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 relative z-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                      <polyline points="9 22 9 12 15 12 15 22"></polyline>
                    </svg>
                  </div>
                  <div 
                    className={`w-0 h-0 transition-all duration-200 ${
                      isSelected || isHovered ? 'border-l-[8px] border-r-[8px] border-t-[12px]' 
                      : 'border-l-[7px] border-r-[7px] border-t-[10px]'
                    }`}
                    style={{
                      borderLeftColor: 'transparent',
                      borderRightColor: 'transparent',
                      borderTopColor: isSelected ? '#fbbf24' : isHovered ? '#f59e0b' : 'rgba(245, 158, 11, 0.9)',
                      marginTop: '-1px',
                    }}
                  />
                </div>

                {isHovered && animationPhase === 'idle' && (
                  <div className="absolute left-1/2 top-full mt-1 -translate-x-1/2 bg-white/95 backdrop-blur-sm text-green-900 px-3 py-1.5 rounded-lg text-sm font-courier whitespace-nowrap shadow-xl z-30">
                    Start Journey Here
                  </div>
                )}
              </button>
            );
          })()}
        </div>

        {/* Morphing popup from marker to full content */}
        {(animationPhase !== 'idle') && zoomTarget && markerRect && (
          <div 
            className="absolute inset-0 z-50 flex items-center justify-center"
          >
            {/* Popup container with background image */}
            <div 
              className="relative flex items-center overflow-hidden transition-all duration-500 ease-out"
              style={{
                width: animationPhase === 'zooming' ? '32px' : '90%',
                height: animationPhase === 'zooming' ? '32px' : '85%',
                maxWidth: animationPhase === 'zooming' ? '32px' : '1200px',
                maxHeight: animationPhase === 'zooming' ? '32px' : '700px',
                opacity: animationPhase === 'transitioning' ? 0 : 1,
                transform: animationPhase === 'zooming' 
                  ? `translate(${(markerRect.x - 50) * 2}%, ${(markerRect.y - 50) * 2}%)`
                  : 'translate(0, 0)',
                borderRadius: animationPhase === 'zooming' ? '50%' : '16px',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Background image with Ken Burns effect */}
              {holeBackground && (
                <div 
                  className={`absolute bg-cover bg-center transition-opacity duration-500 ${animationPhase === 'expanded' ? 'ken-burns' : ''}`}
                  style={{ 
                    backgroundImage: `url(${holeBackground})`,
                    opacity: animationPhase === 'expanded' ? 1 : 0,
                    top: '-10%',
                    left: '-10%',
                    width: '120%',
                    height: '120%'
                  }}
                />
              )}
              
              {/* Dark overlay for readability */}
              <div className="absolute inset-0 bg-black/60" />
              
              {/* Content fades in after expansion */}
              <div 
                className="relative flex gap-8 transition-opacity duration-300 h-full w-full p-8"
                style={{ opacity: animationPhase === 'expanded' ? 1 : 0 }}
              >
                {/* Navigation arrow - Previous */}
                <button
                  onClick={goToPrev}
                  disabled={currentJourneyIndex === 0}
                  className={`flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
                    currentJourneyIndex === 0 
                      ? 'opacity-20 cursor-not-allowed' 
                      : 'opacity-60 hover:opacity-100 hover:scale-110'
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="15 18 9 12 15 6"></polyline>
                  </svg>
                </button>

                {/* Icon column */}
                <div className="flex items-center justify-center flex-shrink-0">
                  <div className={`w-20 h-20 ${zoomTarget.hole === 'clubhouse' || zoomTarget.hole === 'halfway' ? 'rounded-xl' : 'rounded-full'} ${zoomTarget.hole === 'clubhouse' ? 'bg-amber-700' : zoomTarget.hole === 'halfway' ? 'bg-orange-700' : 'bg-sky-500'} border-4 border-white/40 flex items-center justify-center`}>
                    {zoomTarget.hole === 'clubhouse' ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                        <polyline points="9 22 9 12 15 12 15 22"></polyline>
                      </svg>
                    ) : zoomTarget.hole === 'halfway' ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17 8h1a4 4 0 1 1 0 8h-1"></path>
                        <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"></path>
                        <line x1="6" x2="6" y1="2" y2="4"></line>
                        <line x1="10" x2="10" y1="2" y2="4"></line>
                        <line x1="14" x2="14" y1="2" y2="4"></line>
                      </svg>
                    ) : (
                      <span className="text-3xl font-sans font-bold text-white">{zoomTarget.hole}</span>
                    )}
                  </div>
                </div>

                {/* Content column */}
                <div className="flex flex-col gap-4 flex-grow min-w-0 justify-center overflow-hidden">
                  {/* Header with title, progress, and close button */}
                  <div className="flex items-start justify-between">
                    <div className="flex-grow">
                      <div className="flex items-center gap-4 mb-2">
                        <h3 className="text-3xl font-courier text-white drop-shadow-lg">{zoomTarget.title}</h3>
                        {zoomTarget.year && (
                          <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-lg text-lg font-courier text-white">
                            {zoomTarget.year}
                          </span>
                        )}
                      </div>
                      <p className="text-gray-100 font-courier text-xl leading-relaxed drop-shadow-md">{zoomTarget.description}</p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0 ml-4">
                      {/* Progress indicator */}
                      <span className="text-white/70 font-courier text-sm">
                        {currentJourneyIndex + 1} / {journeyOrder.length}
                      </span>
                      <button
                        onClick={handleClose}
                        className="text-white/60 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="18" y1="6" x2="6" y2="18"></line>
                          <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                      </button>
                    </div>
                  </div>
                  
                  {/* User's photo section */}
                  {holePhoto && (
                    <div className="flex-grow overflow-hidden rounded-xl">
                      <img 
                        src={holePhoto} 
                        alt={zoomTarget.title} 
                        className="w-full h-full object-contain rounded-xl"
                      />
                    </div>
                  )}
                </div>

                {/* Navigation arrow - Next */}
                <button
                  onClick={goToNext}
                  className="flex items-center justify-center flex-shrink-0 opacity-60 hover:opacity-100 hover:scale-110 transition-all duration-200"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </button>
              </div>

              {/* Progress bar for auto-advance */}
              {isPresentationMode && animationPhase === 'expanded' && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
                  <div 
                    className="h-full bg-amber-500 transition-all duration-100"
                    style={{
                      animation: 'progress-bar 5s linear forwards',
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        )}

        {/* Click overlay to close */}
        {animationPhase === 'expanded' && (
          <div className="absolute inset-0 z-40" onClick={handleClose} />
        )}
      </div>

      {/* Add keyframes for progress bar */}
      <style>{`
        @keyframes progress-bar {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </div>
  );
};

export default GolfCourseMap;
