/* eslint-disable @typescript-eslint/no-explicit-any */
// components/Whiteboard.tsx
import React, { useState, useRef, useEffect } from 'react';
import { Layer, Rect, Stage } from 'react-konva';
import Konva from 'konva';
import CanvasLayer from './CanvasLayer';
import { ToolType } from './types';
import { useBoardStore, useUIStore } from './store';
import { useZoom } from './hooks';
import { BackgroundLayer } from './components';
import { ZoomMenu } from './components/ZoomMenu';

export const Board: React.FC = () => {
  // Выбранный инструмент
  const [selectedTool, setSelectedTool] = useState<ToolType>('pen');

  const { boardElements } = useBoardStore();
  const stageRef = useRef<Konva.Stage>(null);

  // Получаем scale, setScale, zoomIn и zoomOut из UI‑стора
  const { setStagePosition } = useUIStore();

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

  const { handleWheel, handleZoomIn, handleZoomOut, handleResetZoom } = useZoom(stageRef);

  const handleOnWheel = (e: Konva.KonvaEventObject<WheelEvent>) => {
    setStagePosition(e.currentTarget.position());
    handleWheel(e);
  };

  // Получаем размеры доски (для примера используем window.innerWidth и window.innerHeight - 50)
  const boardWidth = window.innerWidth;
  const boardHeight = window.innerHeight;

  return (
    <div className="flex h-full w-full flex-col">
      <div className="relative flex-1 overflow-hidden">
        <ZoomMenu zoomIn={handleZoomIn} zoomOut={handleZoomOut} resetZoom={handleResetZoom} />
        <Stage
          width={boardWidth}
          height={boardHeight}
          ref={stageRef}
          className="bg-gray-0"
          onWheel={handleOnWheel}
          onDragEnd={(e) => {
            setStagePosition(e.currentTarget.position());
          }}
          draggable
        >
          <BackgroundLayer />
          <Layer>
            <Rect x={50} y={50} width={100} height={100} strokeWidth={2} fill="#000" />
          </Layer>
          <CanvasLayer boardElements={boardElements} selectedTool={selectedTool} />
        </Stage>
      </div>
    </div>
  );
};
