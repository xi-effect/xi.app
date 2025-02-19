'use client';

import React, { useEffect, useMemo } from 'react';
import { Layer, Shape } from 'react-konva';
import { useUIStore } from '../store';
import { boardGridStep } from '../const';

type BackgroundLayerPropsT = {
  scaleValue: number;
};

export const BackgroundLayer = ({ scaleValue }: BackgroundLayerPropsT) => {
  const { viewport, setViewport, stagePosition } = useUIStore();

  useEffect(() => {
    const updateSize = () => {
      setViewport({ width: window.innerWidth, height: window.innerHeight });
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, [setViewport]);

  const dots = useMemo(() => {
    const visibleWidth = viewport.width / scaleValue;
    const visibleHeight = viewport.height / scaleValue;

    const buffer = Math.max(visibleWidth, visibleHeight) * 2;

    const startX =
      Math.floor((-stagePosition.x / scaleValue - buffer) / boardGridStep) * boardGridStep;
    const endX =
      Math.ceil((-stagePosition.x / scaleValue + visibleWidth + buffer) / boardGridStep) *
      boardGridStep;
    const startY =
      Math.floor((-stagePosition.y / scaleValue - buffer) / boardGridStep) * boardGridStep;
    const endY =
      Math.ceil((-stagePosition.y / scaleValue + visibleHeight + buffer) / boardGridStep) *
      boardGridStep;

    return (
      <Shape
        sceneFunc={(context) => {
          context.fillStyle = '#e8e8e8';
          for (let x = startX; x <= endX; x += boardGridStep) {
            for (let y = startY; y <= endY; y += boardGridStep) {
              context.beginPath();
              context.arc(x, y, 4 / scaleValue, 0, Math.PI * 2);
              context.fill();
            }
          }
        }}
      />
    );
  }, [viewport.width, viewport.height, scaleValue, stagePosition]);

  return <Layer listening={false}>{dots}</Layer>;
};
