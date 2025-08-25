import { useEffect, useId } from 'react';
import { scrollOptimizer } from '@/utils/scrollOptimizer';

interface UseOptimizedScrollOptions {
  isActive?: boolean;
  dependencies?: any[];
}

export const useOptimizedScroll = (
  callback: () => void,
  { isActive = true, dependencies = [] }: UseOptimizedScrollOptions = {}
) => {
  const id = useId();

  useEffect(() => {
    scrollOptimizer.addListener(id, callback, isActive);
    
    return () => {
      scrollOptimizer.removeListener(id);
    };
  }, [id, callback, ...dependencies]);

  useEffect(() => {
    scrollOptimizer.updateListener(id, isActive);
  }, [id, isActive]);
};