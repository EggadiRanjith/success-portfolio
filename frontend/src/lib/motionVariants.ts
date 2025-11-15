// All animations defined per consensus debate
// Dr. Performance: 60fps guaranteed
// Luna Luxe: Memorable interactions
// Alex Accessible: prefers-reduced-motion respected
// Dev Practical: Realistic implementation

import { Variants } from 'framer-motion';

export const heroVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

export const heroTextVariants: Variants = {
  hidden: { opacity: 0, y: 60, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

export const heroHeadlineVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: [0.34, 1.56, 0.64, 1], // Spring ease
    },
  },
};

export const ctaButtonVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delay: 0.4,
      duration: 0.6,
      ease: [0.34, 1.56, 0.64, 1],
    },
  },
};

export const hoverLiftVariants: Variants = {
  rest: { y: 0, scale: 1 },
  hover: { 
    y: -8, 
    scale: 1.02,
    transition: { type: 'spring', stiffness: 400, damping: 17 },
  },
};

export const hoverScaleVariants: Variants = {
  rest: { scale: 1 },
  hover: { 
    scale: 1.05,
    transition: { duration: 0.2 },
  },
};

export const scrollRevealVariants: Variants = {
  hidden: { opacity: 0, y: 100 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

// Fade in up variant (commonly used)
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

// Blur fade in variant (for hero headlines)
export const blurFadeIn: Variants = {
  hidden: { opacity: 0, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

// Fade in right variant (for side-by-side layouts)
export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

// Fade in left variant (for side-by-side layouts)
export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

// Stagger container variant
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0,
    },
  },
};

export const staggerItemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

// Reduced motion variants (accessibility)
export const MOTION_REDUCED: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.1 } },
};

