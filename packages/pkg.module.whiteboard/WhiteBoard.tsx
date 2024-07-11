'use client';
import React from 'react';
import {
  DefaultBackground,
  DefaultGrid,
  DefaultMainMenu,
  Tldraw,
  TldrawOptions,
  ToggleGridItem,
} from 'tldraw';
import { Navbar } from './Navbar';
import { CustomBackground } from './CustomBackground';
import './index.css';
import { CustomZoomMenu } from './CustomZoomMenu';

export const WhiteBoard: React.FC = () => {
  return (
    <Tldraw hideUi>
      <Navbar />
      <div className="absolute z-[300]">
        <DefaultMainMenu />
      </div>
      <CustomBackground />
      <CustomZoomMenu />
    </Tldraw>
  );
};
