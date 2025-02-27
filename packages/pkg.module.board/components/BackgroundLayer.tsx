'use client';

import React, { useEffect, useMemo } from 'react';
import { Layer, Shape } from 'react-konva';
import { useUIStore } from '../store';
import { boardBackgroundDotSize, boardGridStep } from '../const';

export const BackgroundLayer = () => {
  const { viewport, setViewport, stagePosition, scale } = useUIStore();

  useEffect(() => {
    const updateSize = () => {
      setViewport({ width: window.innerWidth, height: window.innerHeight });
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, [setViewport]);

  const dots = useMemo(() => {
    const visibleWidth = viewport.width / scale;
    const visibleHeight = viewport.height / scale;

    const buffer = Math.max(visibleWidth, visibleHeight) * 2;

    const startX = Math.floor((-stagePosition.x / scale - buffer) / boardGridStep) * boardGridStep;
    const endX =
      Math.ceil((-stagePosition.x / scale + visibleWidth + buffer) / boardGridStep) * boardGridStep;
    const startY = Math.floor((-stagePosition.y / scale - buffer) / boardGridStep) * boardGridStep;
    const endY =
      Math.ceil((-stagePosition.y / scale + visibleHeight + buffer) / boardGridStep) *
      boardGridStep;

    return (
      <Shape
        sceneFunc={(context) => {
          context.fillStyle = '#e8e8e8';
          for (let x = startX; x <= endX; x += boardGridStep) {
            for (let y = startY; y <= endY; y += boardGridStep) {
              context.beginPath();
              context.arc(x, y, boardBackgroundDotSize / scale, 0, Math.PI * 2);
              context.fill();
            }
          }
        }}
      />
    );
  }, [viewport.width, viewport.height, scale, stagePosition]);

  return <Layer listening={false}>{dots}</Layer>;
};
