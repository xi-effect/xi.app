'use client';
import React from 'react';
import { TLComponents, Tldraw } from 'tldraw';
import { Navbar } from './Navbar';
import { CustomBackground } from './CustomBackground';
import './index.css';
import { CustomZoomMenu } from './CustomZoomMenu';

export const WhiteBoard: React.FC = () => {
  return (
    <Tldraw hideUi>
      <Navbar />
      <CustomBackground />
      <CustomZoomMenu />
    </Tldraw>
  );
};
