/**
 * AnimatedSection Component
 * Reusable wrapper for sections that need scroll-triggered animations
 * No GSAP - pure Framer Motion
 */

"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { useInView } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/motionVariants";

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  variant?: "fadeInUp" | "stagger" | "none";
  delay?: number;
  threshold?: number;
  once?: boolean;
}

const variantMap: Record<string, Variants> = {
  fadeInUp,
  stagger: staggerContainer,
  none: { hidden: {}, visible: {} },
};

/**
 * AnimatedSection - Handles scroll-triggered animations consistently
 * 
 * @example
 * <AnimatedSection variant="stagger">
 *   <motion.div variants={fadeInUp}>Content 1</motion.div>
 *   <motion.div variants={fadeInUp}>Content 2</motion.div>
 * </AnimatedSection>
 */
export function AnimatedSection({
  children,
  className = "",
  variant = "fadeInUp",
  delay = 0,
  threshold = 0.1,
  once = true,
}: AnimatedSectionProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { 
    once, 
    amount: threshold,
    margin: "-100px",
  });

  const selectedVariant = variantMap[variant];

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={selectedVariant}
      className={className}
      style={{
        transitionDelay: `${delay}s`,
      }}
    >
      {children}
    </motion.div>
  );
}

