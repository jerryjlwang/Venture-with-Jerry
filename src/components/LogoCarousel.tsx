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
  
  // Company logos with actual image sources
  const logos: Logo[] = [
    { 
      id: '1', 
      name: 'Onesixone Ventures', 
      src: 'https://images.squarespace-cdn.com/content/v1/62c76bc98f086645bc40162f/33627f65-3967-4877-b6bd-b8c5706e5389/Untitled+design.png' 
    },
    { 
      id: '2', 
      name: 'West River Group', 
      src: 'https://images.squarespace-cdn.com/content/v1/6337b0e52a797969996c3b4c/a6d9c2c8-4211-4db9-baf5-d668f9b066da/WRG+Transparent.png' 
    },
    { 
      id: '3', 
      name: 'Tola Capital', 
      src: 'https://tolacapital.com/wp-content/uploads/2022/11/TC-portrait-logo-1600x800-1.png' 
    },
    { 
      id: '4', 
      name: 'Ascend VC', 
      src: 'https://images.squarespace-cdn.com/content/v1/5d6ed158d1024700012397dc/1574804203738-JYY4WYCNRJVQM2YK8SLO/ascend_logo_color_novc.png?format=1000w' 
    },
    { 
      id: '5', 
      name: 'Madrona', 
      src: 'https://www.madrona.com/wp-content/uploads/2022/10/Madrona_LockupV_MADGRN_RGB_1000W-300x200.png' 
    },
    { 
      id: '6', 
      name: 'Bessemer Venture Partners', 
      src: 'https://www.bvp.com/sites/default/files/inline-images/BVP_Logo_Horizontal_Navy_RGB.png' 
    },
    { 
      id: '7', 
      name: 'Andreessen Horowitz', 
      src: 'https://a16z.com/wp-content/uploads/2021/07/a16z-logo.png' 
    },
    { 
      id: '8', 
      name: 'Sequoia Capital', 
      src: 'https://www.sequoiacap.com/wp-content/uploads/sites/6/2022/11/sequoia_logo_horizontal_black.svg' 
    },
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

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    const handleNativeWheel = (e: WheelEvent) => {
      // Prevent the wheel event from affecting the page, but allow manual scrolling
      e.stopPropagation();
      e.preventDefault();
  
      
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
    container.addEventListener('wheel', handleNativeWheel, { passive: false });

    return () => {
      container.removeEventListener('wheel', handleNativeWheel);
    };
  }, []);

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

  const LogoItem = ({ logo, index }: { logo: Logo; index: number }) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageError, setImageError] = useState(false);

    return (
      <div 
        key={`${logo.id}-${Math.floor(index / logos.length)}-${index % logos.length}`}
        className="flex items-center justify-center p-4 bg-white/10 rounded-lg backdrop-blur-sm hover:bg-white/20 transition-all duration-300"
      >
        <div className="w-20 h-20 flex items-center justify-center rounded-lg overflow-hidden bg-white/90 relative">
          {!imageError ? (
            <>
              <img 
                src={logo.src}
                alt={`${logo.name} logo`}
                className={`max-w-full max-h-full object-contain transition-opacity duration-300 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                onLoad={() => setImageLoaded(true)}
                onError={() => {
                  setImageError(true);
                  setImageLoaded(true);
                }}
                loading="lazy"
              />
              {!imageLoaded && (
                <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-lg" />
              )}
            </>
          ) : (
            <div className="w-full h-full bg-gray-300 rounded-lg flex items-center justify-center text-gray-600 text-xs font-semibold text-center p-1">
              {logo.name}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 to-black rounded-lg p-6 shadow-xl">
      <h2 className="text-xl font-bold text-white mb-4 text-center">Companies Interviewed</h2>
      <div 
        ref={containerRef}
        className="no-scrollbar h-96 overflow-hidden cursor-grab active:cursor-grabbing relative select-none"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ 
          overflow: 'hidden',
          scrollbarWidth: 'none', 
          msOverflowStyle: 'none',
          touchAction: 'none'
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
            <LogoItem key={`${logo.id}-${Math.floor(index / logos.length)}-${index % logos.length}`} logo={logo} index={index} />
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
