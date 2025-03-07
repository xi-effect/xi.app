import { Stage } from 'konva/lib/Stage';
import { Point, ZoomConfig } from '../types';

export const calculateZoom = (
  stageRef: React.RefObject<Stage | null>,
  newScale: number,
  pointer: Point | null,
  config: ZoomConfig,
): { newScale: number; newPos: Point } | null => {
  const stage = stageRef?.current;
  if (!stage) return null;

  const { minScale, maxScale } = config;

  if (newScale > maxScale || newScale < minScale) return null;

  const oldScale = stage.scaleX();

  const center = { x: stage.width() / 2, y: stage.height() / 2 };
  const zoomPointer = pointer || center;

  const mousePointTo = {
    x: zoomPointer.x / oldScale - stage.x() / oldScale,
    y: zoomPointer.y / oldScale - stage.y() / oldScale,
  };

  const newPos = {
    x: zoomPointer.x - mousePointTo.x * newScale,
    y: zoomPointer.y - mousePointTo.y * newScale,
  };

  newPos.x = Math.round(newPos.x * 100) / 100;
  newPos.y = Math.round(newPos.y * 100) / 100;

  return { newScale, newPos };
};
