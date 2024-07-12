'use client';
import React from 'react';
import { Tldraw } from 'tldraw';
import { Navbar } from './Navbar';
import './index.css';
import { CustomZoomMenu } from './CustomZoomMenu';

export const WhiteBoard: React.FC = () => {
  return (
    <Tldraw
      onMount={(editor) => {
        editor.updateInstanceState({ isGridMode: true });
      }}
      hideUi
    >
      <Navbar />
      <CustomZoomMenu />
    </Tldraw>
  );
};
