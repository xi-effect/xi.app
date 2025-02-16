'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { Layer, Shape } from 'react-konva';
import { StagePositionT } from '../types';

type BackgroundLayerPropsT = {
  stagePos: StagePositionT;
  scaleValue: number;
};

export const BackgroundLayer = ({ stagePos, scaleValue }: BackgroundLayerPropsT) => {
  const gridStep = 40;
  const [viewport, setViewport] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateSize = () => {
      setViewport({ width: window.innerWidth, height: window.innerHeight });
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const dots = useMemo(() => {
    const visibleWidth = viewport.width / scaleValue;
    const visibleHeight = viewport.height / scaleValue;

    const buffer = Math.max(visibleWidth, visibleHeight) * 2;

    const startX = Math.floor((-stagePos.x / scaleValue - buffer) / gridStep) * gridStep;
    const endX =
      Math.ceil((-stagePos.x / scaleValue + visibleWidth + buffer) / gridStep) * gridStep;
    const startY = Math.floor((-stagePos.y / scaleValue - buffer) / gridStep) * gridStep;
    const endY =
      Math.ceil((-stagePos.y / scaleValue + visibleHeight + buffer) / gridStep) * gridStep;

    return (
      <Shape
        sceneFunc={(context) => {
          context.fillStyle = '#e8e8e8';
          for (let x = startX; x <= endX; x += gridStep) {
            for (let y = startY; y <= endY; y += gridStep) {
              context.beginPath();
              context.arc(x, y, 4 / scaleValue, 0, Math.PI * 2);
              context.fill();
            }
          }
        }}
      />
    );
  }, [viewport.width, viewport.height, scaleValue, stagePos.x, stagePos.y]);

  return <Layer listening={false}>{dots}</Layer>;
};
