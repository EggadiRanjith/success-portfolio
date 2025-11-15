'use client';

import { useScroll, useTransform, MotionValue } from 'framer-motion';
import { useRef } from 'react';

/**
 * Advanced Parallax Hook
 * Creates true parallax effects with depth layers
 * 
 * @param factor - Parallax intensity (0.3 = slow, 0.8 = fast)
 * @param min - Minimum Y translation
 * @param max - Maximum Y translation
 * @returns Motion values for parallax animation
 */
export function useAdvancedParallax(
  factor = 0.5,
  min = -100,
  max = 100
): {
  y: MotionValue<number>;
  ref: React.RefObject<HTMLDivElement>;
} {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  
  const y = useTransform(
    scrollY,
    [0, 1000],
    [0, 1000 * factor],
    { clamp: false }
  );

  return { y, ref };
}

/**
 * Advanced Parallax with Container Tracking
 * Tracks scroll progress within a specific container
 * 
 * @param factor - Parallax intensity
 * @returns Motion values and ref for the container
 */
export function useContainerParallax(factor = 0.5) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-100 * factor, 100 * factor]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return { y, opacity, ref };
}

/**
 * Multi-Layer Parallax
 * Creates multiple depth layers with different speeds
 * 
 * @returns Array of motion values for layered parallax
 */
export function useMultiLayerParallax() {
  const { scrollY } = useScroll();

  // Background layer (slowest)
  const backgroundY = useTransform(scrollY, [0, 1000], [0, 300]);
  
  // Middle layer (medium speed)
  const middleY = useTransform(scrollY, [0, 1000], [0, 500]);
  
  // Foreground layer (fastest)
  const foregroundY = useTransform(scrollY, [0, 1000], [0, 800]);

  return {
    background: backgroundY,
    middle: middleY,
    foreground: foregroundY,
  };
}

/**
 * Horizontal Parallax
 * Creates horizontal movement on scroll
 * 
 * @param factor - Parallax intensity
 * @returns Motion value for X translation
 */
export function useHorizontalParallax(factor = 0.5) {
  const { scrollY } = useScroll();
  
  const x = useTransform(scrollY, [0, 1000], [0, 1000 * factor]);

  return { x };
}

