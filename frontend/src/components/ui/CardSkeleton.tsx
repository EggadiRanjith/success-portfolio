'use client';

import { SkeletonLoader } from './SkeletonLoader';

export function CardSkeleton() {
  return (
    <div className="p-6 rounded-2xl bg-primary border border-border-primary/40">
      {/* Image skeleton */}
      <SkeletonLoader height="h-48" className="mb-4 rounded-lg" />
      
      {/* Title skeleton */}
      <SkeletonLoader height="h-6" width="w-3/4" className="mb-3" />
      
      {/* Description skeleton */}
      <SkeletonLoader height="h-4" className="mb-2" count={3} />
      
      {/* Tag skeleton */}
      <div className="flex gap-2 mt-4">
        <SkeletonLoader height="h-6" width="w-16" className="rounded-full" />
        <SkeletonLoader height="h-6" width="w-20" className="rounded-full" />
      </div>
    </div>
  );
}

