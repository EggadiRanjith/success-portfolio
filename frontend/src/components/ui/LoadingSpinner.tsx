'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  className?: string;
}

export function LoadingSpinner({ size = 'md', text, className }: LoadingSpinnerProps) {
  const sizeMap = {
    sm: { container: 24, spinner: 16 },
    md: { container: 40, spinner: 28 },
    lg: { container: 56, spinner: 40 },
  };

  const { container, spinner } = sizeMap[size];

  return (
    <div className={cn("flex flex-col items-center justify-center gap-2", className)}>
      <motion.div
        style={{
          width: container,
          height: container,
          border: '3px solid rgba(59, 130, 246, 0.1)',
          borderTop: '3px solid rgb(59, 130, 246)',
          borderRadius: '50%',
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      />
      {text && (
        <p className="text-sm text-fg-secondary mt-2">
          {text}
        </p>
      )}
    </div>
  );
}

