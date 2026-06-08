import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { initAnalytics, trackPageview } from '../utils/analytics';

/** Fires an anonymous pageview on every route change. Renders nothing. */
const Analytics = () => {
  const location = useLocation();

  useEffect(() => {
    initAnalytics();
  }, []);

  useEffect(() => {
    trackPageview(location.pathname);
  }, [location.pathname]);

  return null;
};

export default Analytics;
