'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface FrostedCardProps extends React.HTMLAttributes<HTMLDivElement> {
  intensity?: 'light' | 'medium' | 'heavy';
  glow?: boolean;
  shimmer?: boolean;
}

export const FrostedCard = React.forwardRef<HTMLDivElement, FrostedCardProps>(
  ({ 
    intensity = 'medium', 
    glow = true, 
    shimmer = true,
    className,
    children,
    ...props 
  }, ref) => {
    const intensityMap = {
      light: 'backdrop-blur-[20px]',
      medium: 'backdrop-blur-[40px]',
      heavy: 'backdrop-blur-[60px]',
    };

    return (
      <motion.div
        ref={ref}
        className={cn(
          'relative overflow-hidden rounded-2xl',
          'bg-white/30 dark:bg-white/10',
          'border border-white/40 dark:border-white/20',
          'backdrop-blur-2xl backdrop-saturate-[180%]',
          intensityMap[intensity],
          glow && 'shadow-glass-lg',
          className
        )}
        whileHover={{
          boxShadow: glow ? '0 20px 60px rgba(0, 0, 0, 0.15)' : 'none',
          scale: 1.01,
        }}
        transition={{ duration: 0.3 }}
        {...props}
      >
        {/* Noise texture overlay */}
        <div 
          className="absolute inset-0 opacity-[0.02] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' seed='2' /%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Shimmer effect on hover */}
        {shimmer && (
          <motion.div
            className="absolute inset-0 opacity-0 transition-opacity duration-500 pointer-events-none"
            style={{
              background: 'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)',
            }}
            whileHover={{
              opacity: 1,
            }}
          />
        )}

        {/* Content */}
        <div className="relative z-10">
          {children}
        </div>
      </motion.div>
    );
  }
);

FrostedCard.displayName = 'FrostedCard';

