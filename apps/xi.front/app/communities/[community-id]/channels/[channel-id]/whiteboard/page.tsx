'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const WhiteBoard = dynamic(() => import('pkg.module.whiteboard').then((mod) => mod.WhiteBoard), {
  ssr: false,
});

export default function WhiteBoardPage({ params }: { params: { vid: string } }) {
  console.log('params', params);

  return (
    <div className="w-full md:w-[calc(100vw-350px)] md:min-h-screen md:h-screen md:overflow-auto bg-gray-0">
      <WhiteBoard />
    </div>
  );
}
