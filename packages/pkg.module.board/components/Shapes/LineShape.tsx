import { memo } from 'react';
import { Line } from 'react-konva';
import { useBoardStore } from '../../store';
import { BoardElement } from '../../types';
import { useElementHandlers } from '../../hooks';

export const LineShape = memo(({ element }: { element: BoardElement }) => {
  const { selectedElementId } = useBoardStore();
  const { handleSelect, handleDragEnd } = useElementHandlers();

  return (
    <Line
      hitStrokeWidth={20}
      id={element.id}
      tension={0.5}
      points={element.points}
      stroke={element.stroke}
      strokeWidth={element.strokeWidth}
      lineJoin="round"
      lineCap="round"
      onClick={(e) => handleSelect(e, element.id)}
      draggable={selectedElementId === element.id}
      onDragEnd={(e) => handleDragEnd(e, element)}
    />
  );
});

LineShape.displayName = 'LineShape';
