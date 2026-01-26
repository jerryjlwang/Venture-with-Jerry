import { useRef, useEffect, useState } from 'react';

interface HoleData {
  hole: number | 'clubhouse' | 'halfway';
  title: string;
  description: string;
  year?: string;
}

interface HoleCardProps {
  hole: HoleData;
  index: number;
  isLast: boolean;
  photo: string | null;
  background: string;
  position: 'left' | 'right';
}

const HoleCard = ({ hole, index, isLast, photo, background, position }: HoleCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

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

  const getIcon = () => {
    if (hole.hole === 'clubhouse') {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
          <polyline points="9 22 9 12 15 12 15 22"></polyline>
        </svg>
      );
    }
    if (hole.hole === 'halfway') {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 8h1a4 4 0 1 1 0 8h-1"></path>
          <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"></path>
          <line x1="6" x2="6" y1="2" y2="4"></line>
          <line x1="10" x2="10" y1="2" y2="4"></line>
          <line x1="14" x2="14" y1="2" y2="4"></line>
        </svg>
      );
    }
    return <span className="text-lg font-bold text-white font-courier">{hole.hole}</span>;
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
                {getIcon()}
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
            
            {/* User's photo if available */}
            {isVisible && photo && (
              <div className="relative rounded-xl overflow-hidden bg-black/30">
                {!imageLoaded && (
                  <div className="w-full h-48 animate-pulse bg-white/10 rounded-xl" />
                )}
                <img 
                  src={photo} 
                  alt={hole.title}
                  loading="lazy"
                  onLoad={() => setImageLoaded(true)}
                  className={`w-full h-auto max-h-64 object-contain rounded-xl transition-opacity duration-300 ${
                    imageLoaded ? 'opacity-100' : 'opacity-0 absolute inset-0'
                  }`}
                />
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
