'use client';
import React from 'react';
import { Tldraw } from 'tldraw';
import { Navbar } from './Navbar';
import './index.css';
import { ZoomMenu } from './ZoomMenu';
import { Header } from './Header';

export const WhiteBoard: React.FC = () => {
  return (
    <Tldraw
      onMount={(editor) => {
        editor.updateInstanceState({ isGridMode: true });
      }}
      hideUi
    >
      <Header />
      <Navbar />
      <ZoomMenu />
    </Tldraw>
  );
};
