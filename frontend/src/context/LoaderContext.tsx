"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

interface LoaderContextType {
  isLoading: boolean;
  isLoaderVisible: boolean;
  startLoading: () => void;
  stopLoading: () => void;
}

const LoaderContext = createContext<LoaderContextType | undefined>(undefined);

export function LoaderProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);
  const [isLoaderVisible, setIsLoaderVisible] = useState(true);
  const [isInitialMount, setIsInitialMount] = useState(true);
  
  // Refs to prevent duplicate executions
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const fadeOutTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const hasInitializedRef = useRef(false);
  const previousPathnameRef = useRef(pathname);
  const isProcessingRef = useRef(false);

  const startLoading = () => {
    if (isProcessingRef.current) return;
    setIsLoading(true);
    setIsLoaderVisible(true);
  };

  const stopLoading = () => {
    if (isProcessingRef.current) return;
    
    // Clear any existing timeouts
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (fadeOutTimeoutRef.current) {
      clearTimeout(fadeOutTimeoutRef.current);
      fadeOutTimeoutRef.current = null;
    }
    
    setIsLoading(false);
    // Wait for fade out animation before allowing content to show
    fadeOutTimeoutRef.current = setTimeout(() => {
      setIsLoaderVisible(false);
      isProcessingRef.current = false;
    }, 450);
  };

  // Handle initial page load (refresh) - only once
  useEffect(() => {
    if (!isInitialMount || hasInitializedRef.current) return;
    
    hasInitializedRef.current = true;
    isProcessingRef.current = true;

    const stopLoader = () => {
      // Prevent duplicate calls
      if (!isProcessingRef.current) return;
      
      // Clear any existing timeouts
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (fadeOutTimeoutRef.current) {
        clearTimeout(fadeOutTimeoutRef.current);
      }
      
      // Minimum display time for smooth animation
      timeoutRef.current = setTimeout(() => {
        setIsLoading(false);
        // Wait for fade out before showing content
        fadeOutTimeoutRef.current = setTimeout(() => {
          setIsLoaderVisible(false);
          setIsInitialMount(false);
          isProcessingRef.current = false;
        }, 450);
      }, 2000);
    };

    // Check if page is already loaded
    if (document.readyState === "complete" || document.readyState === "interactive") {
      stopLoader();
    } else {
      // Use only one event - 'load' is more reliable
      const handleReady = () => {
        stopLoader();
        // Remove listener after first call
        window.removeEventListener("load", handleReady);
      };
      window.addEventListener("load", handleReady, { once: true });
      
      return () => {
        window.removeEventListener("load", handleReady);
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
        if (fadeOutTimeoutRef.current) {
          clearTimeout(fadeOutTimeoutRef.current);
        }
      };
    }
  }, [isInitialMount]);

  // Handle route changes (page navigation) - only when pathname actually changes
  useEffect(() => {
    // Skip on initial mount (handled above)
    if (isInitialMount) {
      previousPathnameRef.current = pathname;
      return;
    }

    // Only trigger if pathname actually changed
    if (previousPathnameRef.current === pathname) {
      return;
    }

    // Prevent duplicate processing
    if (isProcessingRef.current) {
      previousPathnameRef.current = pathname;
      return;
    }

    isProcessingRef.current = true;
    previousPathnameRef.current = pathname;

    // Start loader on route change
    setIsLoading(true);
    setIsLoaderVisible(true);

    // Clear any existing timeouts
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (fadeOutTimeoutRef.current) {
      clearTimeout(fadeOutTimeoutRef.current);
      fadeOutTimeoutRef.current = null;
    }

    // Stop loader after page is ready
    const stopLoader = () => {
      if (!isProcessingRef.current) return;
      
      timeoutRef.current = setTimeout(() => {
        setIsLoading(false);
        fadeOutTimeoutRef.current = setTimeout(() => {
          setIsLoaderVisible(false);
          isProcessingRef.current = false;
        }, 450);
      }, 1200);
    };

    // Use requestAnimationFrame to ensure route change is processed
    const rafId = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (document.readyState === "complete" || document.readyState === "interactive") {
          stopLoader();
        } else {
          const handleReady = () => {
            stopLoader();
          };
          window.addEventListener("load", handleReady, { once: true });
        }
      });
    });

    return () => {
      cancelAnimationFrame(rafId);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (fadeOutTimeoutRef.current) {
        clearTimeout(fadeOutTimeoutRef.current);
      }
    };
  }, [pathname, isInitialMount]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (fadeOutTimeoutRef.current) {
        clearTimeout(fadeOutTimeoutRef.current);
      }
      isProcessingRef.current = false;
    };
  }, []);

  return (
    <LoaderContext.Provider
      value={{
        isLoading,
        isLoaderVisible,
        startLoading,
        stopLoading,
      }}
    >
      {children}
    </LoaderContext.Provider>
  );
}

export function useLoader() {
  const context = useContext(LoaderContext);
  if (context === undefined) {
    throw new Error("useLoader must be used within a LoaderProvider");
  }
  return context;
}
