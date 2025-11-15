'use client';

import React, { useRef } from 'react';
import { useRevealOnScroll } from '@/hooks/useRevealOnScroll';
import { usePageTransition } from '@/hooks/usePageTransition';

export function AnimationProvider({ children }: { children: React.ReactNode }) {
  useRevealOnScroll();
  const containerRef = useRef<HTMLDivElement>(null);
  usePageTransition(containerRef);

  return (
    <div ref={containerRef} className="page-fade">
      {children}
    </div>
  );
}
