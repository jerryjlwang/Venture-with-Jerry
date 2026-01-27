import { useRef, useEffect, useState, useMemo } from 'react';

interface HoleData {
  hole: number;
  title: string;
  description: string;
  year?: string;
}

interface HoleCardProps {
  hole: HoleData;
  index: number;
  isLast: boolean;
  photos: string[];
  background: string;
  position: 'left' | 'right';
}

// Unique smooth blob shapes using SVG paths with bezier curves
// These create organic, rounded shapes like real golf greens
const greenSvgPaths: Record<number, string> = {
  1: "M 50,2 C 75,0 95,15 98,40 C 100,65 90,90 65,98 C 40,102 15,90 5,65 C -2,40 10,5 50,2 Z",
  2: "M 55,3 C 82,0 98,20 97,50 C 98,78 80,98 50,97 C 22,98 3,75 5,45 C 3,18 28,3 55,3 Z",
  3: "M 48,2 C 78,0 100,25 95,55 C 92,85 68,100 40,97 C 12,95 0,70 5,40 C 8,12 22,2 48,2 Z",
  4: "M 52,5 C 80,2 97,22 95,52 C 95,82 75,98 45,97 C 18,98 2,78 5,48 C 5,20 25,5 52,5 Z",
  5: "M 45,3 C 75,0 98,18 97,48 C 98,78 78,100 48,98 C 18,100 0,75 3,45 C 2,18 18,3 45,3 Z",
  6: "M 50,5 C 78,2 95,25 97,52 C 100,80 80,97 50,98 C 22,100 5,78 3,50 C 0,22 22,5 50,5 Z",
  7: "M 55,2 C 85,0 100,28 95,55 C 92,82 70,100 42,97 C 15,97 0,72 5,45 C 8,18 28,2 55,2 Z",
  8: "M 48,5 C 75,2 97,20 98,48 C 100,78 82,98 52,97 C 22,98 3,80 5,50 C 5,22 22,5 48,5 Z",
  9: "M 52,3 C 80,0 98,25 95,52 C 95,80 75,98 48,98 C 20,100 2,78 5,50 C 5,22 25,3 52,3 Z",
  10: "M 50,2 C 80,0 100,22 97,52 C 97,82 77,100 48,97 C 18,97 0,77 5,48 C 8,18 22,2 50,2 Z",
  11: "M 45,5 C 72,2 95,20 97,48 C 100,77 82,97 52,98 C 23,100 5,80 3,52 C 0,23 20,5 45,5 Z",
  12: "M 55,3 C 83,0 100,25 95,55 C 92,85 70,100 42,98 C 15,98 0,75 5,47 C 8,18 28,3 55,3 Z",
  13: "M 48,2 C 77,0 97,22 98,50 C 100,80 80,100 50,98 C 20,98 2,78 3,48 C 2,20 22,2 48,2 Z",
  14: "M 52,5 C 82,2 100,25 95,55 C 92,85 72,100 45,97 C 18,97 0,75 5,47 C 8,18 25,5 52,5 Z",
  15: "M 50,3 C 78,0 97,22 98,52 C 100,82 80,100 50,97 C 20,97 2,77 5,48 C 5,18 22,3 50,3 Z",
  16: "M 55,5 C 85,2 100,28 95,58 C 90,88 68,100 40,95 C 12,92 0,68 5,40 C 10,12 28,5 55,5 Z",
  17: "M 48,2 C 80,0 100,25 95,55 C 90,88 65,102 38,95 C 10,90 0,65 8,38 C 15,10 22,2 48,2 Z",
  18: "M 50,3 C 82,0 100,28 95,58 C 88,90 62,102 35,95 C 8,88 0,62 8,35 C 18,8 22,3 50,3 Z",
};

const HoleCard = ({ hole, index, isLast, photos, background, position }: HoleCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState<boolean[]>([]);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  
  // Generate unique clip-path ID
  const clipId = useMemo(() => `green-clip-${hole.hole}`, [hole.hole]);
  const svgPath = greenSvgPaths[hole.hole] || greenSvgPaths[1];

  // Lazy loading with IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '100px',
        threshold: 0.1,
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Initialize loaded state for each photo - check if already cached
  useEffect(() => {
    const loadedStates = photos.map((photo) => {
      const img = new Image();
      img.src = photo;
      return img.complete;
    });
    setImagesLoaded(loadedStates);
  }, [photos]);

  // Auto-rotate slideshow every 3 seconds
  useEffect(() => {
    if (photos.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentPhotoIndex((prev) => (prev + 1) % photos.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [photos.length]);

  const handleImageLoad = (idx: number) => {
    setImagesLoaded((prev) => {
      const updated = [...prev];
      updated[idx] = true;
      return updated;
    });
  };

  const cardId = `hole-card-${hole.hole}`;

  return (
    <div ref={cardRef} id={cardId} className="w-full max-w-4xl scroll-mt-8">
      {/* Hidden SVG for clip-path definition */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <clipPath id={clipId} clipPathUnits="objectBoundingBox" transform="scale(0.01)">
            <path d={svgPath} />
          </clipPath>
        </defs>
      </svg>

      {/* Card row with positioning */}
      <div className={`flex ${position === 'left' ? 'justify-start' : 'justify-end'}`}>
        {/* Card with smooth organic green shape */}
        <div 
          className={`relative w-full max-w-xl transition-all duration-700 ${
            isVisible 
              ? 'opacity-100 translate-x-0' 
              : position === 'left' 
                ? 'opacity-0 -translate-x-8' 
                : 'opacity-0 translate-x-8'
          }`}
          style={{ 
            transitionDelay: `${index * 50}ms`,
            clipPath: `url(#${clipId})`,
            WebkitClipPath: `url(#${clipId})`,
          }}
        >
          {/* Background */}
          {isVisible && (
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${background})` }}
            />
          )}
          
          {/* Green grass-like overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-green-700/90 via-green-800/85 to-emerald-800/90" />
          
          {/* Subtle texture overlay */}
          <div className="absolute inset-0 opacity-15" style={{
            backgroundImage: `radial-gradient(circle at 25% 35%, rgba(255,255,255,0.15) 1px, transparent 1px),
                              radial-gradient(circle at 75% 65%, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '18px 18px, 14px 14px'
          }} />
          
          {/* Content with extra padding to stay within curved bounds */}
          <div className="relative p-12 sm:p-14 pt-14 sm:pt-16 pb-14 sm:pb-16">
            {/* Header row */}
            <div className="flex items-start gap-4 mb-4">
              {/* Icon badge */}
              <div className="w-12 h-12 rounded-full bg-emerald-600/50 border-2 border-emerald-300 flex items-center justify-center flex-shrink-0 shadow-lg">
                <span className="text-lg font-bold text-white font-courier">{hole.hole}</span>
              </div>
              
              {/* Title and year */}
              <div className="flex-grow">
                <div className="flex items-center gap-3 flex-wrap">
                  <h3 className="text-xl sm:text-2xl font-courier text-white drop-shadow-lg">{hole.title}</h3>
                  {hole.year && (
                    <span className="px-2 py-0.5 bg-white/20 backdrop-blur-sm rounded-lg text-sm font-courier text-white">
                      {hole.year}
                    </span>
                  )}
                </div>
              </div>
            </div>
            
            {/* Description */}
            <p className="text-gray-100 font-courier text-base sm:text-lg leading-relaxed drop-shadow-md mb-4">
              {hole.description}
            </p>
            
            {/* Photo slideshow */}
            {isVisible && photos.length > 0 && (
              <div className="relative rounded-xl overflow-hidden bg-black/30 h-48 sm:h-56 shadow-lg">
                {/* Slideshow container */}
                <div className="relative h-full">
                  {photos.map((photo, idx) => (
                    <div
                      key={idx}
                      className={`absolute inset-0 transition-opacity duration-500 ${
                        idx === currentPhotoIndex ? 'opacity-100' : 'opacity-0'
                      }`}
                    >
                      {!imagesLoaded[idx] && idx === currentPhotoIndex && (
                        <div className="w-full h-full animate-pulse bg-white/10 rounded-xl" />
                      )}
                      <img 
                        src={photo} 
                        alt={`${hole.title} - Photo ${idx + 1}`}
                        loading="lazy"
                        onLoad={() => handleImageLoad(idx)}
                        className={`w-full h-full object-contain rounded-xl transition-opacity duration-300 ${
                          imagesLoaded[idx] ? 'opacity-100' : 'opacity-0'
                        }`}
                      />
                    </div>
                  ))}
                </div>
                
                {/* Slideshow indicators */}
                {photos.length > 1 && (
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                    {photos.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentPhotoIndex(idx)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          idx === currentPhotoIndex 
                            ? 'bg-amber-400 w-4' 
                            : 'bg-white/50 hover:bg-white/80'
                        }`}
                        aria-label={`Go to photo ${idx + 1}`}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Snaking dotted connector to next card */}
      {!isLast && (
        <div 
          className={`flex items-center py-4 ${
            position === 'left' ? 'justify-start pl-[50%]' : 'justify-end pr-[50%]'
          }`}
        >
          <svg 
            viewBox="0 0 200 80" 
            className={`w-full max-w-xs h-20 transition-all duration-700 ${
              isVisible ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ transitionDelay: `${index * 50 + 200}ms` }}
            preserveAspectRatio="none"
          >
            <path
              d={position === 'left' 
                ? "M 0 0 Q 100 0, 100 40 Q 100 80, 200 80" 
                : "M 200 0 Q 100 0, 100 40 Q 100 80, 0 80"
              }
              fill="none"
              stroke="rgba(251, 191, 36, 0.8)"
              strokeWidth="3"
              strokeDasharray="8 6"
              strokeLinecap="round"
            />
            {/* End dot */}
            <circle
              cx={position === 'left' ? 200 : 0}
              cy="80"
              r="6"
              fill="rgba(251, 191, 36, 0.8)"
            />
          </svg>
        </div>
      )}
    </div>
  );
};

export default HoleCard;
