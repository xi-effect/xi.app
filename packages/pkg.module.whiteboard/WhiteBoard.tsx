'use client';
import React from 'react';
import { Tldraw } from 'tldraw';
import { Navbar } from './Navbar';
import './index.css';
import { ZoomMenu } from './ZoomMenu';

export const WhiteBoard: React.FC = () => {
  return (
    <Tldraw
      onMount={(editor) => {
        editor.updateInstanceState({ isGridMode: true });
      }}
      hideUi
    >
      <Navbar />
      <ZoomMenu />
    </Tldraw>
  );
};
