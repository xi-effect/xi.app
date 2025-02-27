/* eslint-disable @typescript-eslint/no-explicit-any */
// hooks/useWheelZoom.ts
import Konva from 'konva';
import { useCallback } from 'react';
import { calculateZoom, defaultZoomConfig } from '../utils';
import { useUIStore } from '../store';
import { roundScale } from '../utils/zoomConfig';

/**
 * Хук для обработки масштабирования (зума) при помощи колесика мыши/тачпада.
 */
export const useZoom = (stageRef: React.RefObject<Konva.Stage | null>) => {
  const { setScale, setStagePosition } = useUIStore();

  const handleWheel = useCallback(
    (e: Konva.KonvaEventObject<WheelEvent>) => {
      e.evt.preventDefault();

      const stage = stageRef.current;
      if (!stage) return;

      const oldScale = stage.scaleX();
      const pointer = stage.getPointerPosition();
      if (!pointer) return;

      // Определяем координаты точки, на которую указывает курсор, относительно текущего масштаба
      const mousePointTo = {
        x: (pointer.x - stage.x()) / oldScale,
        y: (pointer.y - stage.y()) / oldScale,
      };

      const delta = e.evt.deltaY;
      const scaleStep = 0.02;
      const speedFactor = Math.abs(delta) > 50 ? 2 : 1;

      let newScale =
        delta > 0 ? oldScale - scaleStep * speedFactor : oldScale + scaleStep * speedFactor;

      // Ограничиваем масштаб от 50% до 300%
      newScale = Math.max(
        defaultZoomConfig.minScale,
        Math.min(newScale, defaultZoomConfig.maxScale),
      );

      newScale = roundScale(newScale);
      setScale(newScale);

      // Обновляем масштаб и позицию Stage, чтобы точка под курсором оставалась на месте
      stage.scale({ x: newScale, y: newScale });
      const newPos = {
        x: pointer.x - mousePointTo.x * newScale,
        y: pointer.y - mousePointTo.y * newScale,
      };
      stage.position(newPos);
      stage.batchDraw();
    },
    [stageRef, setScale],
  );

  const handleZoom = useCallback(
    (direction: 'in' | 'out') => {
      const stage = stageRef.current;
      if (!stage) {
        return;
      }

      const oldScale = stage.scaleX();
      let newScale = oldScale;

      if (direction === 'in') {
        newScale = oldScale >= 1 ? oldScale + 0.25 : oldScale * 1.1;
      } else {
        newScale = oldScale > 1 ? oldScale - 0.25 : oldScale * 0.9;
      }

      // Ограничиваем масштаб в рамках minScale и maxScale
      newScale = Math.max(
        defaultZoomConfig.minScale,
        Math.min(newScale, defaultZoomConfig.maxScale),
      );
      newScale = roundScale(newScale);

      const result = calculateZoom(stageRef, newScale, null, defaultZoomConfig);
      if (!result) {
        return;
      }

      const { newScale: finalScale, newPos } = result;

      stage.to({
        scaleX: finalScale,
        scaleY: finalScale,
        x: newPos.x,
        y: newPos.y,
        duration: defaultZoomConfig.animationDuration / 1000,
        easing: Konva.Easings.Linear,
      });

      setScale(finalScale);
      setStagePosition({ x: newPos.x, y: newPos.y });
      stage.batchDraw();
    },
    [setScale, stageRef, setStagePosition],
  );

  const handleZoomIn = useCallback(() => handleZoom('in'), [handleZoom]);
  const handleZoomOut = useCallback(() => handleZoom('out'), [handleZoom]);

  const handleResetZoom = useCallback(() => {
    const stage = stageRef.current;
    if (!stage) return;

    setScale(1);
    setStagePosition({ x: stage.x(), y: stage.y() });

    stage.to({
      scaleX: 1,
      scaleY: 1,
      x: stage.x(),
      y: stage.y(),
      duration: defaultZoomConfig.animationDuration / 1000,
      easing: Konva.Easings.Linear,
    });

    stage.batchDraw();
  }, [stageRef, setScale, setStagePosition]);

  return { handleWheel, handleZoomIn, handleZoomOut, handleResetZoom };
};
