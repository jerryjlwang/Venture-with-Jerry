
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import analytics from '@/utils/analytics';

export const useAnalytics = () => {
  const location = useLocation();

  useEffect(() => {
    // Track page view when route changes
    analytics.trackPageView(location.pathname);
  }, [location.pathname]);

  return analytics;
};
