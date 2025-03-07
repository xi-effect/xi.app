import { ZoomConfig } from '../types';

export const defaultZoomConfig: ZoomConfig = {
  minScale: 0.005,
  maxScale: 3,
  scaleBy: 0.05,
  animationDuration: 250,
};

export const roundScale = (scale: number) => Math.round(scale * 1000) / 1000;

export const zoomLevels = [
  3, 2.5, 2, 1.5, 1, 0.75, 0.5, 0.33, 0.2, 0.15, 0.1, 0.05, 0.03, 0.02, 0.01,
];
