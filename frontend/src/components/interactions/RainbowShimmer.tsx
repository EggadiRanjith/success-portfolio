'use client';

import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import React from 'react';

interface RainbowShimmerProps {
  children: React.ReactNode;
  className?: string;
}

export function RainbowShimmer({ children, className = '' }: RainbowShimmerProps) {
  const { theme } = useTheme();

  return (
    <motion.div
      className={`relative overflow-hidden group ${className}`}
      whileHover="hover"
      initial="initial"
    >
      {children}

      {/* Shimmer overlay */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none"
        style={{
          background: theme === 'dark'
            ? 'linear-gradient(90deg, transparent, rgba(96,165,250,0.2), transparent)'
            : 'linear-gradient(90deg, transparent, rgba(59,130,246,0.2), transparent)',
        }}
        animate={{
          x: ['-100%', '100%'],
        }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          repeatType: 'loop',
        }}
      />
    </motion.div>
  );
}

