import { useEffect, useState, useRef } from 'react';

interface UseInViewportOptions {
  threshold?: number;
  rootMargin?: string;
}

export const useInViewport = (options: UseInViewportOptions = {}) => {
  const [isInViewport, setIsInViewport] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInViewport(entry.isIntersecting);
      },
      {
        threshold: options.threshold || 0,
        rootMargin: options.rootMargin || '0px',
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [options.threshold, options.rootMargin]);

  return { ref, isInViewport };
};