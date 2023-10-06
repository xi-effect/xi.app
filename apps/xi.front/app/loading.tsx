'use client';

import { SkeletonMainLayout } from 'pkg.navigation.skeleton';
import React from 'react';

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="h-full w-full">
      <SkeletonMainLayout />
    </div>
  );
}
