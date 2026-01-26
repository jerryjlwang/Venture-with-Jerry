import { useRef, useEffect, useState } from 'react';

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

  return (
    <div ref={cardRef} id={cardId} className="w-full max-w-4xl scroll-mt-8">
      {/* Card row with positioning */}
      <div className={`flex ${position === 'left' ? 'justify-start' : 'justify-end'}`}>
        {/* Card */}
        <div 
          className={`relative w-full max-w-xl rounded-2xl overflow-hidden border border-white/20 shadow-2xl transition-all duration-700 ${
            isVisible 
              ? 'opacity-100 translate-x-0' 
              : position === 'left' 
                ? 'opacity-0 -translate-x-8' 
                : 'opacity-0 translate-x-8'
          }`}
          style={{ transitionDelay: `${index * 50}ms` }}
        >
          {/* Background */}
          {isVisible && (
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ 
                backgroundImage: `url(${background})`,
              }}
            />
          )}
          
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/60" />
          
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
              <div className="relative rounded-xl overflow-hidden bg-black/30">
                {/* Slideshow container */}
                <div className="relative">
                  {photos.map((photo, idx) => (
                    <div
                      key={idx}
                      className={`transition-opacity duration-500 ${
                        idx === currentPhotoIndex ? 'opacity-100' : 'opacity-0 absolute inset-0'
                      }`}
                    >
                      {!imagesLoaded[idx] && idx === currentPhotoIndex && (
                        <div className="w-full h-48 animate-pulse bg-white/10 rounded-xl" />
                      )}
                      <img 
                        src={photo} 
                        alt={`${hole.title} - Photo ${idx + 1}`}
                        loading="lazy"
                        onLoad={() => handleImageLoad(idx)}
                        className={`w-full h-auto max-h-64 object-contain rounded-xl transition-opacity duration-300 ${
                          imagesLoaded[idx] ? 'opacity-100' : 'opacity-0 absolute inset-0'
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
