import { memo } from 'react';
import { Line } from 'react-konva';
import { useBoardStore, useUIStore } from '../../store';
import { BoardElement } from '../../types';
import { useElementHandlers } from '../../hooks';

export const LineShape = memo(({ element }: { element: BoardElement }) => {
  const { selectedElementId } = useBoardStore();
  const { handleSelect, handleDragEnd } = useElementHandlers();
  const { scale } = useUIStore();

  const hitStrokeWidth = Math.max(20, Math.min(40, 20 / scale));

  return (
    <Line
      hitStrokeWidth={hitStrokeWidth}
      id={element.id}
      tension={0.5}
      points={element.points}
      stroke={element.stroke}
      strokeWidth={element.strokeWidth}
      x={element.x}
      y={element.y}
      scaleX={element.scaleX ?? 1}
      scaleY={element.scaleY ?? 1}
      lineJoin="round"
      lineCap="round"
      onClick={(e) => handleSelect(e, element.id)}
      draggable={selectedElementId === element.id}
      onDragEnd={(e) => handleDragEnd(e, element)}
    />
  );
});

LineShape.displayName = 'LineShape';
