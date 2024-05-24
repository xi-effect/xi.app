'use client';

import React from 'react';
import { Excalidraw, MainMenu } from '@excalidraw/excalidraw';

import './index.css';

export const WhiteBoard: React.FC = () => {
  console.log();

  return (
    <div className="h-full w-full">
      <Excalidraw langCode="ru-RU">
        <MainMenu>
          <MainMenu.DefaultItems.Export />
          <MainMenu.DefaultItems.SaveAsImage />
          <MainMenu.DefaultItems.ToggleTheme />
          <MainMenu.DefaultItems.ChangeCanvasBackground />
        </MainMenu>
      </Excalidraw>
    </div>
  );
};
