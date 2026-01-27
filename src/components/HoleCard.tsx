import { useRef, useEffect, useState } from 'react';
import { getGreenSvgPath } from '@/utils/greenShapes';

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

const HoleCard = ({ hole, index, isLast, photos, background, position }: HoleCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState<boolean[]>([]);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

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
  const greenPath = getGreenSvgPath(hole.hole);

  return (
    <div ref={cardRef} id={cardId} className="w-full max-w-4xl scroll-mt-8">
      {/* Card row with positioning */}
      <div className={`flex ${position === 'left' ? 'justify-start' : 'justify-end'}`}>
        {/* Card wrapper with organic green border */}
        <div 
          className={`relative w-full max-w-xl transition-all duration-700 ${
            isVisible 
              ? 'opacity-100 translate-x-0' 
              : position === 'left' 
                ? 'opacity-0 -translate-x-8' 
                : 'opacity-0 translate-x-8'
          }`}
          style={{ transitionDelay: `${index * 50}ms` }}
        >
          {/* Organic green border frame - stretched to match card dimensions */}
          <svg 
            className="absolute -inset-4 w-[calc(100%+2rem)] h-[calc(100%+2rem)] pointer-events-none z-0"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            {/* Glow filter */}
            <defs>
              <filter id={`glow-${hole.hole}`} x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="2" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <linearGradient id={`grad-${hole.hole}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#34d399" stopOpacity="1" />
                <stop offset="50%" stopColor="#10b981" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#059669" stopOpacity="1" />
              </linearGradient>
            </defs>
            
            {/* Outer thick green border with glow */}
            <path
              d={greenPath}
              fill="none"
              stroke={`url(#grad-${hole.hole})`}
              strokeWidth="3"
              filter={`url(#glow-${hole.hole})`}
              vectorEffect="non-scaling-stroke"
            />
            
            {/* Inner fill for depth */}
            <path
              d={greenPath}
              fill="rgba(16, 185, 129, 0.15)"
              stroke="none"
            />
          </svg>

          {/* Main card content - rectangular with rounded corners */}
          <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border border-emerald-500/50">
            {/* Background */}
            {isVisible && (
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${background})` }}
              />
            )}
            
            {/* Dark overlay with green tint */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-950/80 via-black/70 to-green-900/60" />
            
            {/* Content */}
            <div className="relative p-6 sm:p-8">
              {/* Header row */}
              <div className="flex items-start gap-4 mb-4">
                {/* Icon badge */}
                <div className="w-12 h-12 rounded-full bg-transparent border-2 border-amber-500 flex items-center justify-center flex-shrink-0">
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
                <div className="relative rounded-xl overflow-hidden bg-black/30 h-48 sm:h-56">
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
