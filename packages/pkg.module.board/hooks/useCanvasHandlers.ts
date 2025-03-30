import { useRef } from 'react';
import Konva from 'konva';
import { useDebouncedFunction } from '@xipkg/utils';
import { useBoardStore, useUIStore } from '../store';
import { useStage } from '../providers';
import { useZoom } from './useWheelZoom';
import { BoardElement } from '../types';

export const useCanvasHandlers = () => {
  const { stageRef, layerRef, getRelativePointerPosition } = useStage();
  const { addElement, selectedTool, selectElement, updateElement } = useBoardStore();
  const { setStagePosition } = useUIStore();

  const currentLineId = useRef<string>('');
  const currentElementRef = useRef<BoardElement | null>(null);
  const isDrawing = useRef(false);

  const { handleWheel } = useZoom(stageRef);

  const debouncedElementUpdate = useDebouncedFunction(updateElement, 300);

  const handleOnWheel = (e: Konva.KonvaEventObject<WheelEvent>) => {
    setStagePosition(e.currentTarget.position());
    handleWheel(e);
  };

  const handleMouseDown = (e: Konva.KonvaEventObject<MouseEvent>) => {
    if (selectedTool === 'pen') {
      isDrawing.current = true;
      const pos = getRelativePointerPosition();
      if (!pos) return;

      const newLineId = `line-${Date.now()}`;
      currentLineId.current = newLineId;

      const newLine = {
        type: 'line',
        id: newLineId,
        points: [pos.x, pos.y],
        stroke: 'black',
      } as BoardElement;

      addElement(newLine);
      currentElementRef.current = newLine;
      return;
    }

    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty || selectedTool !== 'select') {
      selectElement(null);
    }
  };

  const handleMouseMove = (e: Konva.KonvaEventObject<MouseEvent>) => {
    if (!isDrawing.current || selectedTool !== 'pen') return;

    const stage = e.target.getStage();
    const pos = stage?.getRelativePointerPosition();
    if (!pos) return;

    const layer = layerRef.current;

    if (!layer) return;

    const line = layer.findOne(`#${currentLineId.current}`) as Konva.Line | null;

    if (!line) return;

    const newPoints = [...line.points(), pos.x, pos.y];
    line.points(newPoints);
    layer.batchDraw();

    debouncedElementUpdate(currentLineId.current, { points: newPoints });
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
  };

  const handleDragEnd = (e: Konva.KonvaEventObject<DragEvent>) => {
    setStagePosition(e.currentTarget.position());
  };

  return { handleOnWheel, handleMouseDown, handleMouseMove, handleMouseUp, handleDragEnd };
};
