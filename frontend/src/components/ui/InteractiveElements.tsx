'use client';

import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';

/**
 * Animated Counter
 * Counts up from 0 to target value with smooth animation
 */
interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  className?: string;
}

export function AnimatedCounter({ value, suffix = '', className }: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    setDisplayValue(value);
  }, [value]);

  return (
    <motion.span
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={className}
    >
      {displayValue}
      {suffix}
    </motion.span>
  );
}
