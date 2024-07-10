'use client';
import React from 'react';
import { Tldraw } from 'tldraw';
import { Navbar } from './Navbar';
import './index.css';

export const WhiteBoard: React.FC = () => {
  console.log();
  return (
    <Tldraw hideUi>
      <Navbar />
    </Tldraw>
  );
};
