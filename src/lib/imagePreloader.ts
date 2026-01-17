// Critical background images to preload on app start
const CRITICAL_IMAGES = [
  'https://te-cdn-marketing-site.storage.googleapis.com/littleamerica/America/parnter/stay/places/usa-washington-state-seattle-skyline.jpg'
];

let preloadStarted = false;

export const preloadCriticalImages = () => {
  if (preloadStarted) return;
  preloadStarted = true;

  // Use requestIdleCallback for non-blocking preload, fallback to setTimeout
  const schedulePreload = window.requestIdleCallback || ((cb: () => void) => setTimeout(cb, 1));
  
  schedulePreload(() => {
    CRITICAL_IMAGES.forEach(src => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      document.head.appendChild(link);
    });
  });
};

// Also create Image objects for browser caching
export const warmImageCache = () => {
  CRITICAL_IMAGES.forEach(src => {
    const img = new Image();
    img.src = src;
  });
};
