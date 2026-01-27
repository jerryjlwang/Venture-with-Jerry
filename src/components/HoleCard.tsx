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

// Unique organic green shapes for each hole using CSS clip-path
// These create smooth blob-like shapes with concave and convex curves
const greenClipPaths: Record<number, string> = {
  1: "polygon(5% 15%, 15% 3%, 35% 0%, 55% 2%, 75% 0%, 90% 5%, 97% 20%, 100% 40%, 98% 60%, 100% 80%, 95% 92%, 80% 98%, 60% 100%, 40% 98%, 20% 100%, 8% 95%, 2% 80%, 0% 60%, 3% 40%, 0% 20%)",
  2: "polygon(8% 10%, 25% 2%, 45% 0%, 65% 3%, 85% 0%, 95% 12%, 100% 30%, 98% 50%, 100% 70%, 95% 88%, 82% 97%, 60% 100%, 38% 98%, 18% 100%, 5% 90%, 0% 70%, 2% 50%, 0% 30%, 5% 15%)",
  3: "polygon(3% 18%, 18% 5%, 40% 0%, 60% 2%, 80% 0%, 95% 10%, 100% 28%, 97% 48%, 100% 68%, 95% 85%, 78% 97%, 55% 100%, 35% 97%, 15% 100%, 3% 88%, 0% 68%, 3% 48%, 0% 28%, 5% 12%)",
  4: "polygon(6% 12%, 22% 3%, 42% 0%, 62% 4%, 82% 0%, 96% 15%, 100% 35%, 96% 55%, 100% 75%, 93% 92%, 75% 100%, 52% 97%, 30% 100%, 12% 95%, 2% 78%, 0% 55%, 4% 35%, 0% 18%)",
  5: "polygon(4% 20%, 20% 5%, 42% 0%, 65% 3%, 85% 0%, 97% 18%, 100% 38%, 95% 58%, 100% 78%, 92% 95%, 70% 100%, 48% 95%, 25% 100%, 8% 90%, 0% 70%, 5% 48%, 0% 28%)",
  6: "polygon(7% 15%, 24% 2%, 48% 0%, 70% 5%, 88% 0%, 98% 20%, 100% 42%, 94% 62%, 100% 82%, 90% 97%, 68% 100%, 42% 95%, 20% 100%, 5% 85%, 0% 62%, 6% 40%, 0% 22%)",
  7: "polygon(5% 18%, 20% 4%, 45% 0%, 68% 4%, 87% 0%, 97% 15%, 100% 38%, 95% 58%, 100% 78%, 92% 95%, 72% 100%, 45% 96%, 22% 100%, 6% 88%, 0% 65%, 5% 42%, 0% 22%)",
  8: "polygon(8% 12%, 26% 2%, 50% 0%, 72% 5%, 90% 0%, 100% 18%, 97% 40%, 100% 60%, 95% 82%, 78% 98%, 55% 100%, 32% 95%, 12% 100%, 2% 82%, 0% 58%, 5% 38%, 0% 18%)",
  9: "polygon(4% 15%, 22% 3%, 46% 0%, 68% 4%, 88% 0%, 98% 18%, 100% 40%, 96% 62%, 100% 82%, 88% 97%, 65% 100%, 40% 96%, 18% 100%, 4% 85%, 0% 62%, 4% 40%, 0% 20%)",
  10: "polygon(6% 18%, 24% 4%, 48% 0%, 72% 5%, 90% 0%, 100% 22%, 96% 45%, 100% 68%, 92% 90%, 72% 100%, 48% 95%, 24% 100%, 6% 88%, 0% 65%, 5% 42%, 0% 22%)",
  11: "polygon(5% 14%, 22% 2%, 46% 0%, 70% 4%, 88% 0%, 98% 16%, 100% 38%, 95% 60%, 100% 82%, 88% 98%, 62% 100%, 38% 96%, 15% 100%, 3% 84%, 0% 60%, 5% 38%, 0% 18%)",
  12: "polygon(7% 16%, 25% 3%, 50% 0%, 74% 5%, 92% 0%, 100% 20%, 96% 44%, 100% 68%, 90% 92%, 68% 100%, 44% 95%, 20% 100%, 5% 86%, 0% 62%, 6% 38%, 0% 18%)",
  13: "polygon(4% 12%, 20% 2%, 44% 0%, 68% 4%, 86% 0%, 98% 15%, 100% 38%, 94% 60%, 100% 82%, 86% 97%, 62% 100%, 38% 95%, 14% 100%, 2% 82%, 0% 58%, 6% 35%, 0% 15%)",
  14: "polygon(6% 18%, 23% 4%, 48% 0%, 72% 5%, 90% 0%, 100% 20%, 95% 45%, 100% 70%, 90% 92%, 68% 100%, 42% 95%, 18% 100%, 4% 85%, 0% 60%, 5% 38%, 0% 18%)",
  15: "polygon(5% 15%, 22% 3%, 48% 0%, 72% 4%, 90% 0%, 98% 18%, 100% 42%, 94% 65%, 100% 85%, 85% 98%, 60% 100%, 35% 95%, 12% 100%, 2% 82%, 0% 58%, 6% 35%, 0% 15%)",
  16: "polygon(8% 14%, 26% 2%, 52% 0%, 76% 5%, 92% 0%, 100% 18%, 95% 42%, 100% 68%, 88% 92%, 64% 100%, 38% 94%, 15% 100%, 3% 82%, 0% 56%, 6% 32%, 0% 14%)",
  17: "polygon(10% 12%, 28% 2%, 52% 0%, 76% 4%, 92% 0%, 100% 16%, 94% 40%, 100% 65%, 88% 90%, 62% 100%, 36% 94%, 12% 100%, 2% 80%, 0% 54%, 8% 30%, 0% 12%)",
  18: "polygon(6% 15%, 24% 3%, 50% 0%, 75% 5%, 92% 0%, 100% 18%, 95% 42%, 100% 68%, 88% 92%, 65% 100%, 40% 95%, 16% 100%, 3% 82%, 0% 58%, 6% 34%, 0% 15%)",
};

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
  const clipPath = greenClipPaths[hole.hole] || greenClipPaths[1];

  return (
    <div ref={cardRef} id={cardId} className="w-full max-w-4xl scroll-mt-8">
      {/* Card row with positioning */}
      <div className={`flex ${position === 'left' ? 'justify-start' : 'justify-end'}`}>
        {/* Card with organic green shape */}
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
            clipPath: clipPath,
            WebkitClipPath: clipPath,
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
          <div className="absolute inset-0 bg-gradient-to-br from-green-800/85 via-green-900/80 to-emerald-900/85" />
          
          {/* Subtle texture overlay */}
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: `radial-gradient(circle at 20% 30%, rgba(255,255,255,0.1) 1px, transparent 1px),
                              radial-gradient(circle at 80% 70%, rgba(255,255,255,0.08) 1px, transparent 1px)`,
            backgroundSize: '20px 20px, 15px 15px'
          }} />
          
          {/* Inner border glow */}
          <div className="absolute inset-0 shadow-[inset_0_0_30px_rgba(16,185,129,0.3)]" />
          
          {/* Content with extra padding to stay within clip bounds */}
          <div className="relative p-10 sm:p-12 pt-12 sm:pt-14 pb-12 sm:pb-14">
            {/* Header row */}
            <div className="flex items-start gap-4 mb-4">
              {/* Icon badge */}
              <div className="w-12 h-12 rounded-full bg-emerald-600/50 border-2 border-emerald-400 flex items-center justify-center flex-shrink-0 shadow-lg">
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
