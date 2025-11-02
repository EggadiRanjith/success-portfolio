"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { ReactNode, useRef, useEffect } from "react";

interface PageTransitionProps {
  children: ReactNode;
}

// Narrative-driven transition configurations
const TRANSITION_MAP: Record<string, {
  initial: Record<string, any>;
  animate: Record<string, any>;
  exit: Record<string, any>;
  transition: Record<string, any>;
}> = {
  // Home → Projects: "Diving into details" (swipe up with motion blur)
  "/:projects": {
    initial: { opacity: 0, y: 100, filter: "blur(20px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)" },
    exit: { opacity: 0, y: -50, filter: "blur(10px)" },
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
  
  // Projects → About: "Revealing the human" (grayscale → color fade)
  "projects:about": {
    initial: { opacity: 0, scale: 1.05, filter: "grayscale(100%) blur(8px)" },
    animate: { opacity: 1, scale: 1, filter: "grayscale(0%) blur(0px)" },
    exit: { opacity: 0, scale: 0.95, filter: "grayscale(80%) blur(8px)" },
    transition: { duration: 0.7, ease: [0.33, 1, 0.68, 1] },
  },
  
  // About → Contact: "Ready for connection" (slide-in with glow)
  "about:contact": {
    initial: { opacity: 0, x: 60, scale: 0.97, filter: "brightness(0.7) blur(10px)" },
    animate: { opacity: 1, x: 0, scale: 1, filter: "brightness(1) blur(0px)" },
    exit: { opacity: 0, x: -30, scale: 0.98, filter: "brightness(0.8) blur(8px)" },
    transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] },
  },
  
  // Contact → Home: "Return to origin" (fade with scale)
  "contact:/": {
    initial: { opacity: 0, scale: 1.08, filter: "blur(15px)" },
    animate: { opacity: 1, scale: 1, filter: "blur(0px)" },
    exit: { opacity: 0, scale: 0.92, filter: "blur(15px)" },
    transition: { duration: 0.5, ease: [0.33, 1, 0.68, 1] },
  },
  
  // Default: Elegant fade with subtle scale
  default: {
    initial: { opacity: 0, scale: 0.98, filter: "blur(10px)" },
    animate: { opacity: 1, scale: 1, filter: "blur(0px)" },
    exit: { opacity: 0, scale: 0.98, filter: "blur(10px)" },
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

// Normalize route for lookup (remove leading/trailing slashes, params)
const normalizeRoute = (path: string): string => {
  return path.replace(/^\/|\/$/g, "").split("/")[0] || "/";
};

// Get transition config based on route navigation
const getTransitionConfig = (from: string, to: string) => {
  const fromRoute = normalizeRoute(from);
  const toRoute = normalizeRoute(to);
  
  // Check for specific transition mapping
  const key = `${fromRoute}:${toRoute}`;
  if (TRANSITION_MAP[key]) return TRANSITION_MAP[key];
  
  // Check for wildcard (any page to specific)
  const wildcardKey = `:${toRoute}`;
  if (TRANSITION_MAP[wildcardKey]) return TRANSITION_MAP[wildcardKey];
  
  // Fall back to default
  return TRANSITION_MAP.default;
};

export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const previousPathname = useRef(pathname);

  useEffect(() => {
    // Update previous pathname after transition
    const timer = setTimeout(() => {
      previousPathname.current = pathname;
    }, 100);
    return () => clearTimeout(timer);
  }, [pathname]);

  // Get narrative-driven transition config
  const transitionConfig = getTransitionConfig(previousPathname.current, pathname);

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={transitionConfig.initial}
        animate={transitionConfig.animate}
        exit={transitionConfig.exit}
        transition={transitionConfig.transition}
        style={{
          willChange: "transform, opacity, filter",
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

export default PageTransition;

