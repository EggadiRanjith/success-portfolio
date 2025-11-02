"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function usePageTransition(containerRef: React.RefObject<HTMLElement | null>) {
  const pathname = usePathname();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Skip on reduced motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    // Add fade-in class on route change
    container.classList.remove("page-fade");
    // Force reflow
    void container.offsetWidth;
    container.classList.add("page-fade");
  }, [pathname, containerRef]);
}

