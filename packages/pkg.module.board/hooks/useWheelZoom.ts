/* eslint-disable @typescript-eslint/no-explicit-any */
// hooks/useWheelZoom.ts
import Konva from 'konva';
import { useCallback } from 'react';
import { useUIStore } from '../store';

/**
 * Хук для обработки масштабирования (зума) при помощи колесика мыши/тачпада.
 * Принимает ссылку на Stage и возвращает обработчик onWheel.
 */
export const useWheelZoom = (stageRef: React.RefObject<Konva.Stage | null>) => {
  const { setScale } = useUIStore();

  const handleWheel = useCallback(
    (e: any) => {
      e.evt.preventDefault();

      const stage = stageRef.current;
      if (!stage) return;

      const scaleBy = 1.1;
      const oldScale = stage.scaleX();
      const pointer = stage.getPointerPosition();
      if (!pointer) return;

      // Определяем координаты точки, на которую указывает курсор, относительно текущего масштаба
      const mousePointTo = {
        x: (pointer.x - stage.x()) / oldScale,
        y: (pointer.y - stage.y()) / oldScale,
      };

      // Если прокрутка вниз – уменьшаем масштаб, иначе – увеличиваем
      let newScale = e.evt.deltaY > 0 ? oldScale / scaleBy : oldScale * scaleBy;
      // Ограничиваем масштаб от 50% до 300%
      newScale = Math.max(0.5, Math.min(newScale, 3));
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

  return handleWheel;
};
