'use client';

import { SkeletonMainLayout } from 'pkg.navigation.skeleton';
import React from 'react';
import { useMainSt } from 'store';

export default function Main() {
  const isLogin = useMainSt((state) => state.isLogin);

  if (isLogin === null) return <SkeletonMainLayout />;

  return (
    <div className="p-8 h-full w-full">
      <h1 className="text-3xl font-bold underline">Main page</h1>
    </div>
  );
}
