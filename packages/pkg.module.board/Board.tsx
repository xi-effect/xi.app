/* eslint-disable @typescript-eslint/no-explicit-any */
// components/Whiteboard.tsx
import React, { useState, useRef, useEffect } from 'react';
import { Stage } from 'react-konva';
import Konva from 'konva';
import CanvasLayer from './CanvasLayer';
import { StagePositionT, ToolType } from './types';
import { useBoardStore, useUIStore } from './store';
import { useWheelZoom, useDebounce } from './hooks';
import { BackgroundLayer } from './components';

export const Board: React.FC = () => {
  // Выбранный инструмент
  const [selectedTool, setSelectedTool] = useState<ToolType>('pen');
  const [stagePos, setStagePos] = useState<StagePositionT>({ x: 0, y: 0 });
  const { boardElements } = useBoardStore();
  const stageRef = useRef<Konva.Stage>(null);

  // Получаем scale, setScale, zoomIn и zoomOut из UI‑стора
  const { scale } = useUIStore();

  // Пример хоткеев: Escape – переключиться в режим выделения,
  // Delete – удалить выделенные элементы (реализовать логику выбора)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedTool('select');
      }
      if (e.key === 'Delete') {
        // TODO: удалить выбранные элементы (логика выделения реализуется дополнительно)
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleWheel = useWheelZoom(stageRef);

  const debouncedSetStagePos = useDebounce((x, y) => {
    setStagePos({ x, y });
  }, 100);

  const handleDragMove = (e: Konva.KonvaEventObject<DragEvent>) => {
    debouncedSetStagePos(e.target.x(), e.target.y());
  };

  const handleOnWheel = (e: Konva.KonvaEventObject<WheelEvent>) => {
    setStagePos({ x: e.target.x(), y: e.target.y() });
    handleWheel(e);
  };

  // Получаем размеры доски (для примера используем window.innerWidth и window.innerHeight - 50)
  const boardWidth = window.innerWidth;
  const boardHeight = window.innerHeight;

  return (
    <div className="flex h-full w-full flex-col">
      <div className="relative flex-1">
        <Stage
          width={boardWidth}
          height={boardHeight}
          ref={stageRef}
          className="bg-gray-0"
          onWheel={handleOnWheel}
          onDragMove={handleDragMove}
          draggable
        >
          <BackgroundLayer stagePos={stagePos ?? { x: 0, y: 0 }} scaleValue={scale} />
          <CanvasLayer boardElements={boardElements} selectedTool={selectedTool} />
        </Stage>
      </div>
    </div>
  );
};
