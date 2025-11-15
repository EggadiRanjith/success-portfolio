'use client';

import { useEffect } from 'react';

/**
 * Analytics Component
 * Handles analytics initialization and tracking
 * Supports Vercel Analytics and Plausible (privacy-first)
 */
export function Analytics() {
  useEffect(() => {
    // Initialize Vercel Analytics (if using Vercel)
    const initVercelAnalytics = async () => {
      try {
        const { inject } = await import('@vercel/analytics');
        inject();
      } catch (error) {
        // Vercel Analytics not installed or not on Vercel
      }
    };

    // Initialize Plausible Analytics (privacy-first alternative)
    const initPlausible = () => {
      // Only initialize if domain is configured
      const domain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
      
      if (!domain) {
        return;
      }

      if (!(window as any).plausible) {
        (window as any).plausible = function() {
          ((window as any).plausible.q = (window as any).plausible.q || []).push(arguments);
        };
      }
      
      const script = document.createElement('script');
      script.async = true;
      script.defer = true;
      script.src = 'https://plausible.io/js/script.js';
      script.setAttribute('data-domain', domain);
      document.head.appendChild(script);
    };

    // Initialize analytics
    initVercelAnalytics();
    initPlausible();

    // Track page views
    const handleRouteChange = () => {
      if ((window as any).plausible) {
        (window as any).plausible('pageview');
      }
    };

    // Listen for route changes (Next.js App Router)
    window.addEventListener('popstate', handleRouteChange);

    return () => {
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, []);

  return null;
}

/**
 * Track custom events
 * Usage: trackEvent('button_click', { button_name: 'subscribe' })
 */
export function trackEvent(eventName: string, properties?: Record<string, any>) {
  if ((window as any).plausible) {
    (window as any).plausible(eventName, { props: properties });
  }
  
  // Add other analytics providers here
  // Example: Google Analytics
  if ((window as any).gtag) {
    (window as any).gtag('event', eventName, properties);
  }
}

/**
 * Track page views manually
 * Useful for SPA route changes
 */
export function trackPageView(url?: string) {
  const page = url || window.location.pathname + window.location.search;
  
  if ((window as any).plausible) {
    (window as any).plausible('pageview', { url: page });
  }
  
  if ((window as any).gtag) {
    (window as any).gtag('config', process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID, {
      page_path: page,
    });
  }
}

