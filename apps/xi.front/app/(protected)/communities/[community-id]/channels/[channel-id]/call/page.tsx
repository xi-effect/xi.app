'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const Call = dynamic(() => import('pkg.module.call').then((mod) => mod.Call));

export default function CallInCommunity() {
  return (
    <div className="w-full md:w-[calc(100vw-350px)] md:min-h-screen md:h-screen md:overflow-auto">
      <Call />
    </div>
  );
}
