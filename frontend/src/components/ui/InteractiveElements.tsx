'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import React, { useEffect, useState, useRef } from 'react';
import { cn } from '@/lib/utils';

/**
 * Animated Counter
 * Counts up from 0 to target value with smooth animation
 */
interface AnimatedCounterProps {
  value: number;
  duration?: number;
  suffix?: string;
  className?: string;
}

export function AnimatedCounter({ 
  value, 
  duration = 2, 
  suffix = '', 
  className 
}: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = useState(value);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    // Cancel any ongoing animation
    if (animationFrameRef.current !== null) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    
    // Always set to final value immediately (no animation)
    setDisplayValue(value);
  }, [value]);

  return (
    <motion.span
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={className}
    >
      {displayValue}{suffix}
    </motion.span>
  );
}

/**
 * GlowOnHover Component
 * Adds a glow effect on hover with customizable color and intensity
 */
interface GlowOnHoverProps {
  children: React.ReactNode;
  color?: 'blue' | 'purple' | 'cyan' | 'gold' | 'pink' | 'green';
  intensity?: 'low' | 'medium' | 'high';
  className?: string;
}

export function GlowOnHover({ 
  children, 
  color = 'blue', 
  intensity = 'medium',
  className 
}: GlowOnHoverProps) {
  const glowColors = {
    blue: 'rgba(59, 130, 246,',
    purple: 'rgba(139, 92, 246,',
    cyan: 'rgba(6, 182, 212,',
    gold: 'rgba(234, 179, 8,',
    pink: 'rgba(236, 72, 153,',
    green: 'rgba(34, 197, 94,',
  };

  const intensityValues = {
    low: { shadow: '0.15', blur: '0.1' },
    medium: { shadow: '0.3', blur: '0.2' },
    high: { shadow: '0.5', blur: '0.3' },
  };

  const colorValue = glowColors[color];
  const intensityValue = intensityValues[intensity];

  return (
    <motion.div
      className={cn('relative', className)}
      whileHover={{
        boxShadow: `0 0 40px ${colorValue}${intensityValue.shadow}), 0 0 80px ${colorValue}${intensityValue.blur})`,
      }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      style={{
        transition: 'box-shadow 0.3s ease-out',
      }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Placeholder exports for other interactive elements
 * These can be implemented as needed
 */
export function AnimatedUnderline({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}

export function MagneticButton({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}

export function RippleEffect({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}

export function TiltCard({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}

export function PulseOnHover({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}
