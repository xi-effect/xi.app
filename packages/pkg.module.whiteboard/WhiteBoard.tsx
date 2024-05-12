'use client';

import React from 'react';
import { Excalidraw } from '@excalidraw/excalidraw';

// import '@excalidraw/excalidraw/index.css';

export const WhiteBoard: React.FC = () => {
  console.log();

  return (
    <div className="h-full w-full">
      <Excalidraw />
    </div>
  );
};
