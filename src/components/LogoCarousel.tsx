import React, { useEffect, useRef, useState } from 'react';

interface Logo {
  id: string;
  name: string;
  src: string;
  url: string;
}

const LogoCarousel = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isUserInteracting, setIsUserInteracting] = useState(false);
  const animationRef = useRef<number>();
  const lastInteractionTime = useRef<number>(Date.now());
  
  // Company logos with actual image sources
  const logos: Logo[] = [
    { 
      id: '1', 
      name: 'Onesixone Ventures', 
      src: 'https://images.squarespace-cdn.com/content/v1/62c76bc98f086645bc40162f/33627f65-3967-4877-b6bd-b8c5706e5389/Untitled+design.png',
      url: 'https://www.onesixone.ventures'
    },
    { 
      id: '2', 
      name: 'West River Group', 
      src: 'https://images.squarespace-cdn.com/content/v1/6337b0e52a797969996c3b4c/a6d9c2c8-4211-4db9-baf5-d668f9b066da/WRG+Transparent.png',
      url: 'https://www.wrg.vc'
    },
    { 
      id: '3', 
      name: 'Tola Capital', 
      src: 'https://tolacapital.com/wp-content/uploads/2022/11/TC-portrait-logo-1600x800-1.png',
      url: 'https://tolacapital.com'
    },
    { 
      id: '4', 
      name: 'Ascend VC', 
      src: 'https://images.squarespace-cdn.com/content/v1/5d6ed158d1024700012397dc/1574804203738-JYY4WYCNRJVQM2YK8SLO/ascend_logo_color_novc.png?format=1000w',
      url: 'https://www.ascend.vc'
    },
    { 
      id: '5', 
      name: 'Madrona', 
      src: 'https://www.madrona.com/wp-content/uploads/2022/10/Madrona_LockupV_MADGRN_RGB_1000W-300x200.png',
      url: 'https://www.madrona.com'
    },
    { 
      id: '6', 
      name: 'Founders\' Co-op', 
      src: 'https://www.washingtontechnology.org/wp-content/uploads/2018/08/founders-coop.png',
      url: 'https://www.founderscoop.com'
    },
  ];
  const [translateY, setTranslateY] = useState(() => logos.length * 100);

  // Triple the logos for smoother infinite scroll
  const tripleLogos = [...logos, ...logos, ...logos];

  useEffect(() => {
    const logoHeight = 100; // 80px logo + 20px gap
    const singleSetHeight = logos.length * logoHeight;
    
    const animate = () => {
      if (!isUserInteracting) {
        setTranslateY(prev => {
          let newY = prev + 0.8; // Smooth consistent speed
          
          // Use modulo for seamless infinite scroll
          // When we've scrolled through one complete set, seamlessly continue
          if (newY >= singleSetHeight * 2) {
            newY -= singleSetHeight;
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
        
        // Keep position within bounds using modulo for seamless wrapping
        if (newY < singleSetHeight) {
          newY += singleSetHeight;
        } else if (newY >= singleSetHeight * 2) {
          newY -= singleSetHeight;
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
  }, [logos.length]);

  const handleMouseEnter = () => {
    setIsUserInteracting(true);
  };

  const handleMouseLeave = () => {
    // No need to normalize position anymore since we're using modulo
    setTimeout(() => {
      setIsUserInteracting(false);
    }, 50);
  };

  const LogoItem = ({ logo, index }: { logo: Logo; index: number }) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageError, setImageError] = useState(false);

    return (
      <a 
        href={logo.url}
        target="_blank"
        rel="noopener noreferrer"
        key={`${logo.id}-${Math.floor(index / logos.length)}-${index % logos.length}`}
        className="h-20 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 p-3 flex items-center justify-center cursor-pointer"
      >
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
              <div className="w-full h-full bg-gray-200 animate-pulse rounded" />
            )}
          </>
        ) : (
          <div className="w-full h-full bg-gray-100 rounded flex items-center justify-center text-gray-600 text-xs font-semibold text-center p-1">
            {logo.name}
          </div>
        )}
      </a>
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
          className="flex flex-col gap-5"
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
