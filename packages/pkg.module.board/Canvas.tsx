// components/Whiteboard.tsx
import { Stage } from 'react-konva';
import { useKeyPress } from 'pkg.utils.client';
import { useBoardStore } from './store';
import { useCanvasHandlers, useZoom } from './hooks';
import { useStage } from './providers';
import { BackgroundLayer, SelectedElementToolbar, Navbar, ZoomMenu } from './components';
import { CanvasLayer } from './CanvasLayer';

export const Canvas = () => {
  const { stageRef } = useStage();
  const { selectedTool, removeElement, selectedElementId, selectElement } = useBoardStore();
  const { handleOnWheel, handleMouseUp, handleMouseDown, handleMouseMove, handleDragEnd } =
    useCanvasHandlers();

  const { handleResetZoom, handleZoomIn, handleZoomOut } = useZoom(stageRef);

  const boardWidth = window.innerWidth;
  const boardHeight = window.innerHeight;

  useKeyPress('Backspace', () => {
    if (selectedElementId) {
      removeElement(selectedElementId);
      selectElement(null);
    }
  });

  return (
    <div className="flex h-full w-full flex-col">
      <div className="relative flex-1 overflow-hidden">
        <ZoomMenu zoomIn={handleZoomIn} zoomOut={handleZoomOut} resetZoom={handleResetZoom} />
        <Navbar />
        <SelectedElementToolbar />
        <Stage
          width={boardWidth}
          height={boardHeight}
          ref={stageRef}
          className="bg-gray-0"
          onWheel={handleOnWheel}
          onDragEnd={handleDragEnd}
          draggable={selectedTool === 'hand'}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        >
          <BackgroundLayer />
          <CanvasLayer />
        </Stage>
      </div>
    </div>
  );
};
