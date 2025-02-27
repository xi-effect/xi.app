import { ZoomConfig } from '../types';

export const defaultZoomConfig: ZoomConfig = {
  minScale: 0.01,
  maxScale: 3,
  scaleBy: 0.1,
  animationDuration: 250,
};

export const roundScale = (scale: number) => Math.round(scale * 1000) / 1000;
