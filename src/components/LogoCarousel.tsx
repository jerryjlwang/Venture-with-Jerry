
import React, { useEffect, useRef, useState } from 'react';

interface Logo {
  id: string;
  name: string;
  src: string;
}

const LogoCarousel = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollSpeed, setScrollSpeed] = useState(1);
  const [isUserScrolling, setIsUserScrolling] = useState(false);
  const animationRef = useRef<number>();
  const lastScrollTime = useRef<number>(Date.now());
  
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

  // Double the logos to create seamless loop
  const doubledLogos = [...logos, ...logos];

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const animate = () => {
      if (!isUserScrolling) {
        container.scrollTop += scrollSpeed;
        
        // Reset scroll position when we've scrolled through one complete set
        const logoHeight = 100; // 80px logo + 20px gap
        const totalHeight = logos.length * logoHeight;
        
        if (container.scrollTop >= totalHeight) {
          container.scrollTop = 0;
        }
      }
      
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [scrollSpeed, isUserScrolling, logos.length]);

  const handleScroll = () => {
    setIsUserScrolling(true);
    lastScrollTime.current = Date.now();
    
    // Resume auto-scroll after user stops scrolling
    setTimeout(() => {
      if (Date.now() - lastScrollTime.current >= 500) {
        setIsUserScrolling(false);
      }
    }, 500);
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const container = containerRef.current;
    if (!container) return;

    setIsUserScrolling(true);
    lastScrollTime.current = Date.now();
    
    container.scrollTop += e.deltaY * 0.5;
    
    // Reset position if needed
    const logoHeight = 100;
    const totalHeight = logos.length * logoHeight;
    
    if (container.scrollTop >= totalHeight) {
      container.scrollTop = 0;
    } else if (container.scrollTop < 0) {
      container.scrollTop = totalHeight - 1;
    }

    // Resume auto-scroll after user stops
    setTimeout(() => {
      if (Date.now() - lastScrollTime.current >= 500) {
        setIsUserScrolling(false);
      }
    }, 500);
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 to-black rounded-lg p-6 shadow-xl">
      <h2 className="text-xl font-bold text-white mb-4 text-center">Companies Interviewed</h2>
      <div 
        ref={containerRef}
        className="h-96 overflow-hidden cursor-grab active:cursor-grabbing"
        onScroll={handleScroll}
        onWheel={handleWheel}
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <div className="flex flex-col gap-5">
          {doubledLogos.map((logo, index) => (
            <div 
              key={`${logo.id}-${index}`}
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
