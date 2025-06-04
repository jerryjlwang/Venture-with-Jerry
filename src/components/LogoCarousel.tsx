
import React, { useEffect, useRef, useState } from 'react';

interface Logo {
  id: string;
  name: string;
  src: string;
}

const LogoCarousel = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isUserInteracting, setIsUserInteracting] = useState(false);
  const [translateY, setTranslateY] = useState(0);
  const animationRef = useRef<number>();
  const lastInteractionTime = useRef<number>(Date.now());
  
  // Sample logos - you can replace these with actual company logos
  const logos: Logo[] = [
    { id: '1', name: 'Company A', src: '/api/placeholder/80/80' },
    { id: '2', name: 'Company B', src: '/api/placeholder/80/80' },
    { id: '3', name: 'Company C', src: '/api/placeholder/80/80' },
    { id: '4', name: 'Company D', src: '/api/placeholder/80/80' },
    { id: '5', name: 'Company E', src: '/api/placeholder/80/80' },
    { id: '6', name: 'Company F', src: '/api/placeholder/80/80' },
    { id: '7', name: 'Company G', src: '/api/placeholder/80/80' },
    { id: '8', name: 'Company H', src: '/api/placeholder/80/80' },
  ];

  // Triple the logos for smoother infinite scroll
  const tripleLogos = [...logos, ...logos, ...logos];

  useEffect(() => {
    const animate = () => {
      if (!isUserInteracting) {
        setTranslateY(prev => {
          const logoHeight = 100; // 80px logo + 20px gap
          const singleSetHeight = logos.length * logoHeight;
          let newY = prev + 0.8; // Smooth consistent speed
          
          // When we reach the end of the second set, smoothly reset to start of second set
          if (newY >= singleSetHeight * 2) {
            newY = singleSetHeight;
          }
          
          return newY;
        });
      }
      
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isUserInteracting, logos.length]);

  const handleWheel = (e: React.WheelEvent) => {
    // Prevent the wheel event from affecting the page, but allow manual scrolling
    e.stopPropagation();
    
    setIsUserInteracting(true);
    lastInteractionTime.current = Date.now();
    
    // Manual scroll with wheel
    setTranslateY(prev => {
      const logoHeight = 100;
      const singleSetHeight = logos.length * logoHeight;
      const delta = e.deltaY * 0.5;
      let newY = prev + delta;
      
      // Handle wrapping for manual scroll
      if (newY >= singleSetHeight * 2) {
        newY = singleSetHeight;
      } else if (newY < singleSetHeight) {
        newY = singleSetHeight * 2 - 1;
      }
      
      return newY;
    });

    // Resume auto-scroll after user stops
    setTimeout(() => {
      if (Date.now() - lastInteractionTime.current >= 800) {
        setIsUserInteracting(false);
      }
    }, 800);
  };

  const handleMouseEnter = () => {
    setIsUserInteracting(true);
  };

  const handleMouseLeave = () => {
    // Smooth transition back to auto-scroll by normalizing position first
    setTranslateY(prev => {
      const logoHeight = 100;
      const singleSetHeight = logos.length * logoHeight;
      
      // Ensure we're in the middle set for smooth continuation
      if (prev < singleSetHeight) {
        return prev + singleSetHeight;
      } else if (prev >= singleSetHeight * 2) {
        return prev - singleSetHeight;
      }
      return prev;
    });
    
    // Small delay to allow position normalization, then resume auto-scroll
    setTimeout(() => {
      setIsUserInteracting(false);
    }, 50);
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 to-black rounded-lg p-6 shadow-xl">
      <h2 className="text-xl font-bold text-white mb-4 text-center">Companies Interviewed</h2>
      <div 
        ref={containerRef}
        className="h-96 overflow-hidden cursor-grab active:cursor-grabbing relative"
        onWheel={handleWheel}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ 
          scrollbarWidth: 'none', 
          msOverflowStyle: 'none'
        }}
      >
        <div 
          ref={contentRef}
          className="flex flex-col gap-5 transition-transform duration-75 ease-linear"
          style={{ 
            transform: `translateY(-${translateY}px)`,
            willChange: 'transform'
          }}
        >
          {tripleLogos.map((logo, index) => (
            <div 
              key={`${logo.id}-${Math.floor(index / logos.length)}-${index % logos.length}`}
              className="flex items-center justify-center p-4 bg-white/10 rounded-lg backdrop-blur-sm hover:bg-white/20 transition-all duration-300"
            >
              <div className="w-20 h-20 bg-gray-300 rounded-lg flex items-center justify-center text-gray-600 text-xs font-semibold">
                {logo.name}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-400">Scroll to interact • Auto-scrolling resumes</p>
      </div>
    </div>
  );
};

export default LogoCarousel;
