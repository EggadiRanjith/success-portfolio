'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SkeletonLoaderProps {
  width?: string;
  height?: string;
  className?: string;
  count?: number;
}

export function SkeletonLoader({
  width = 'w-full',
  height = 'h-4',
  className = '',
  count = 1,
}: SkeletonLoaderProps) {
  return (
    <div className="space-y-2">
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          className={cn(
            width,
            height,
            "bg-fg-primary/10 dark:bg-fg-primary/20 rounded",
            className
          )}
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

