'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const BoardProvider = dynamic(() => import('pkg.module.board').then((mod) => mod.BoardProvider), {
  ssr: false,
});

export default function BoardPage() {
  return (
    <div
      id="whiteboard-container"
      className="w-full md:w-[calc(100vw-350px)] md:min-h-screen md:h-screen md:overflow-auto bg-gray-0"
    >
      <BoardProvider />
    </div>
  );
}
