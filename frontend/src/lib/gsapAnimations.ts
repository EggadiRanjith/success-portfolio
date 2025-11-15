/**
 * GSAP Premium Professional Animations
 * High-performance animations with reduced motion support
 */

import { gsap } from "gsap";

// Dynamically import ScrollTrigger (premium plugin)
let ScrollTrigger: typeof import("gsap/ScrollTrigger").ScrollTrigger | null = null;

if (typeof window !== "undefined") {
  import("gsap/ScrollTrigger").then((module) => {
    ScrollTrigger = module.ScrollTrigger;
    gsap.registerPlugin(ScrollTrigger);
  });
}

/**
 * Check if user prefers reduced motion
 */
export const prefersReducedMotion = (): boolean => {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

/**
 * Premium text reveal animation - Luxury professional split text effect
 */
export const animateTextReveal = (
  element: HTMLElement | null,
  options?: {
    delay?: number;
    duration?: number;
    stagger?: number;
  }
) => {
  if (!element || prefersReducedMotion()) {
    if (element) {
      gsap.set(element, { opacity: 1, y: 0, filter: "blur(0px)" });
    }
    return;
  }

  const { delay = 0, duration = 1.6, stagger = 0.08 } = options || {};

  gsap.fromTo(
    element,
    {
      opacity: 0,
      y: 80,
      filter: "blur(12px)",
      scale: 0.95,
    },
    {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      scale: 1,
      duration,
      delay,
      ease: "expo.out", // Premium easing
      stagger: {
        amount: stagger,
        from: "start",
      },
    }
  );
};

/**
 * Premium fade in up animation - Luxury professional timing
 */
export const animateFadeInUp = (
  element: HTMLElement | null,
  options?: {
    delay?: number;
    duration?: number;
    y?: number;
  }
) => {
  if (!element || prefersReducedMotion()) {
    if (element) {
      gsap.set(element, { opacity: 1, y: 0, filter: "blur(0px)" });
    }
    return;
  }

  const { delay = 0, duration = 1.4, y = 50 } = options || {};

  // Set initial state immediately to prevent hydration mismatch
  gsap.set(element, { 
    opacity: 0, 
    y: y + 10,
    filter: "blur(8px)",
    scale: 0.98
  });

  gsap.to(element, {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    scale: 1,
    duration,
    delay,
    ease: "expo.out", // Premium easing curve
  });
};

/**
 * Premium stagger animation for multiple elements - Luxury professional timing
 */
export const animateStagger = (
  elements: HTMLElement[] | null,
  options?: {
    delay?: number;
    duration?: number;
    stagger?: number;
    y?: number;
  }
) => {
  if (!elements || elements.length === 0 || prefersReducedMotion()) {
    if (elements) {
      gsap.set(elements, { opacity: 1, y: 0, scale: 1 });
    }
    return;
  }

  const { delay = 0, duration = 1.2, stagger = 0.18, y = 40 } = options || {};

  // Set initial state immediately to prevent hydration mismatch
  gsap.set(elements, { 
    opacity: 0, 
    y: y + 10,
    scale: 0.95,
    filter: "blur(6px)"
  });

  gsap.to(elements, {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    duration,
    delay,
    stagger,
    ease: "expo.out", // Premium easing curve
  });
};

/**
 * Premium scroll-triggered parallax animation
 */
export const animateParallax = (
  element: HTMLElement | null,
  options?: {
    speed?: number;
    start?: string;
    end?: string;
    scrub?: boolean;
  }
) => {
  if (!element || prefersReducedMotion() || !ScrollTrigger) {
    return () => {};
  }

  const { speed = 0.5, start = "top bottom", end = "bottom top", scrub = true } = options || {};

  const scrollTrigger = ScrollTrigger.create({
    trigger: element,
    start,
    end,
    scrub: scrub ? 1 : false,
    onUpdate: (self) => {
      if (scrub) {
        gsap.to(element, {
          y: self.progress * 100 * speed,
          ease: "none",
        });
      }
    },
  });

  return () => scrollTrigger.kill();
};

/**
 * Premium counter animation (for stats) - Luxury professional timing
 */
export const animateCounter = (
  element: HTMLElement | null,
  targetValue: string,
  options?: {
    duration?: number;
    delay?: number;
  }
) => {
  if (!element || prefersReducedMotion()) {
    if (element) {
      element.textContent = targetValue;
    }
    return;
  }

  const { duration = 2.2, delay = 0 } = options || {};
  const numericValue = parseInt(targetValue.replace(/\D/g, "")) || 0;
  const suffix = targetValue.replace(/\d/g, "");

  // Create a proper object reference for GSAP
  const counterObj = { value: 0 };

  // Add subtle scale animation during counting
  gsap.fromTo(
    element,
    { scale: 0.8, opacity: 0 },
    {
      scale: 1,
      opacity: 1,
      duration: duration * 0.3,
      delay,
      ease: "expo.out",
    }
  );

  gsap.to(counterObj, {
    value: numericValue,
    duration,
    delay,
    ease: "expo.out", // Premium easing for smooth counting
    onUpdate: function () {
      if (element) {
        element.textContent = Math.ceil(counterObj.value) + suffix;
      }
    },
  });
};

/**
 * Premium scale and fade animation
 */
export const animateScaleFade = (
  element: HTMLElement | null,
  options?: {
    delay?: number;
    duration?: number;
    scale?: number;
  }
) => {
  if (!element || prefersReducedMotion()) {
    if (element) {
      gsap.set(element, { opacity: 1, scale: 1 });
    }
    return;
  }

  const { delay = 0, duration = 0.8, scale = 0.9 } = options || {};

  gsap.fromTo(
    element,
    {
      opacity: 0,
      scale,
    },
    {
      opacity: 1,
      scale: 1,
      duration,
      delay,
      ease: "back.out(1.2)",
    }
  );
};

/**
 * Premium magnetic button effect - Luxury professional interaction
 */
export const animateMagneticButton = (element: HTMLElement | null) => {
  if (!element || prefersReducedMotion()) return;

  const handleMouseMove = (e: MouseEvent) => {
    const rect = element.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.25;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.25;

    gsap.to(element, {
      x,
      y,
      scale: 1.02,
      duration: 0.6,
      ease: "power1.out", // Smooth, premium feel
    });
  };

  const handleMouseLeave = () => {
    gsap.to(element, {
      x: 0,
      y: 0,
      scale: 1,
      duration: 0.8,
      ease: "expo.out", // Elegant return
    });
  };

  element.addEventListener("mousemove", handleMouseMove);
  element.addEventListener("mouseleave", handleMouseLeave);

  return () => {
    element.removeEventListener("mousemove", handleMouseMove);
    element.removeEventListener("mouseleave", handleMouseLeave);
  };
};

/**
 * Track which elements have been animated to prevent re-triggering
 */
const animatedElements = new WeakMap<HTMLElement, boolean>();

/**
 * Premium scroll-triggered fade in animation - Luxury professional timing
 */
export const animateScrollFadeIn = (
  element: HTMLElement | null,
  options?: {
    start?: string;
    end?: string;
    y?: number;
  }
) => {
  if (!element || prefersReducedMotion()) {
    if (element) {
      gsap.set(element, { opacity: 1, y: 0, scale: 1 });
    }
    return () => {};
  }

  // Check if this element has already been animated
  if (animatedElements.get(element)) {
    return () => {};
  }

  const { start = "top 80%", end = "top 20%", y = 60 } = options || {};

  // Use Intersection Observer as fallback if ScrollTrigger not available
  if (!ScrollTrigger) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement;
            // Mark as animated
            animatedElements.set(target, true);
            gsap.fromTo(
              target,
              {
                opacity: 0,
                y: y + 10,
                scale: 0.96,
                filter: "blur(8px)",
              },
              {
                opacity: 1,
                y: 0,
                scale: 1,
                filter: "blur(0px)",
                duration: 1.2,
                ease: "expo.out", // Premium easing
              }
            );
            observer.unobserve(target);
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }

  // Mark element as animated before creating trigger
  animatedElements.set(element, true);

  const scrollTrigger = ScrollTrigger.create({
    trigger: element,
    start,
    end,
    once: true, // Only trigger once
    onEnter: () => {
      gsap.fromTo(
        element,
        {
          opacity: 0,
          y: y + 10,
          scale: 0.96,
          filter: "blur(8px)",
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          duration: 1.2,
          ease: "expo.out", // Premium easing
        }
      );
    },
  });

  return () => scrollTrigger.kill();
};

/**
 * Cleanup function for all GSAP animations
 */
export const cleanupGSAP = (cleanupFunctions: Array<() => void>) => {
  cleanupFunctions.forEach((cleanup) => cleanup());
  if (ScrollTrigger) {
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  }
};

