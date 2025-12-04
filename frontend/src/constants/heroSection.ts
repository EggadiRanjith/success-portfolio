/**
 * Hero Section Constants
 * Centralized configuration for easy maintenance and updates
 */

// Hero section statistics
export const HERO_STATS = [
  {
    label: "Production APIs",
    value: "10+",
  },
  {
    label: "Years Experience",
    value: "3+",
  },
  {
    label: "Cloud Deployments",
    value: "5+",
  },
] as const;

// Social media links
export const HERO_SOCIAL_LINKS = [
  {
    href: "https://github.com/EggadiRanjith",
    label: "GitHub",
  },
  {
    href: "https://linkedin.com/in/ranjitheggadi",
    label: "LinkedIn",
  },
  {
    href: "https://leetcode.com/ranjitheggadi",
    label: "LeetCode",
  },
] as const;

// Animation configuration
export const HERO_ANIMATION_CONFIG = {
  staggerDelay: 0.1,
  fadeInDuration: 0.6,
  blurFadeDuration: 0.8,
  entryDelay: 0.2,
  reducedMotionDuration: 0,
} as const;

// CTA button configuration
export const HERO_CTA_BUTTONS = [
  {
    text: "View My Work",
    href: "/projects",
    variant: "primary" as const,
  },
  {
    text: "Contact Me",
    href: "/contact",
    variant: "secondary" as const,
  },
] as const;

// Hero content text
export const HERO_CONTENT = {
  title: {
    line1: "Backend & Full-Stack",
    line2: {
      prefix: "Developer ",
      highlight: "Building Scalable Systems",
    },
  },
  description:
    "Computer Science graduate specializing in backend and full-stack development. Experienced in Java, Python, JavaScript, Microservices, REST APIs, and AWS. Building scalable, secure, and performance-optimized applications.",
} as const;

