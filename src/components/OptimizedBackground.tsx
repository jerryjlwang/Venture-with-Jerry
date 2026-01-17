import { useState, useEffect } from 'react';

interface OptimizedBackgroundProps {
  src: string;
  alt?: string;
  className?: string;
  overlayClassName?: string;
  children?: React.ReactNode;
}

// Preload critical images on app start
const preloadedImages = new Set<string>();

export const preloadImage = (src: string): Promise<void> => {
  if (preloadedImages.has(src)) return Promise.resolve();
  
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      preloadedImages.add(src);
      resolve();
    };
    img.onerror = () => resolve();
    img.src = src;
  });
};

const OptimizedBackground = ({ 
  src, 
  alt = "Background", 
  className = "",
  overlayClassName = "",
  children 
}: OptimizedBackgroundProps) => {
  const [isLoaded, setIsLoaded] = useState(preloadedImages.has(src));

  useEffect(() => {
    if (!isLoaded) {
      preloadImage(src).then(() => setIsLoaded(true));
    }
  }, [src, isLoaded]);

  return (
    <div className={`relative ${className}`}>
      {/* Blur placeholder - shows immediately */}
      <div 
        className={`absolute inset-0 bg-slate-800 transition-opacity duration-500 ${
          isLoaded ? 'opacity-0' : 'opacity-100'
        }`}
        style={{
          background: 'linear-gradient(135deg, #1e3a5f 0%, #0f172a 50%, #1e293b 100%)'
        }}
      />
      
      {/* Actual image */}
      <img
        src={src}
        alt={alt}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        onLoad={() => setIsLoaded(true)}
      />
      
      {/* Overlay */}
      {overlayClassName && (
        <div className={`absolute inset-0 ${overlayClassName}`} />
      )}
      
      {/* Content */}
      {children}
    </div>
  );
};

export default OptimizedBackground;
