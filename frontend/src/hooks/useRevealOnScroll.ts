"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "./useReducedMotion";

/**
 * Hook for scroll-triggered reveal animations using IntersectionObserver
 * Replaces GSAP ScrollTrigger with native browser API + Framer Motion
 */
export function useRevealOnScroll() {
  const reduced = useReducedMotion();
  const [visibleElements, setVisibleElements] = useState<Set<Element>>(new Set());

  useEffect(() => {
    if (reduced || typeof window === "undefined") return;

    const elements = document.querySelectorAll(".reveal-on-scroll");
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleElements((prev) => new Set(prev).add(entry.target));
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -20% 0px", // Trigger when element is 20% from bottom
      }
    );

    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, [reduced]);

  return visibleElements;
}
