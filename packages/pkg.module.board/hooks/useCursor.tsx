import { useState } from 'react';
import { ToolType } from '../types';
import { getCursorType } from '../utils';

export const useCursor = (tool: ToolType) => {
  const [isDragging, setIsDragging] = useState(false);
  const cursor = getCursorType(tool, isDragging);

  const mouseHandlers = {
    onMouseDown: () => {
      if (tool === 'hand') {
        setIsDragging(true);
      }
    },
    onMouseUp: () => setIsDragging(false),
    onMouseLeave: () => setIsDragging(false),
  };

  return { cursor, mouseHandlers };
};
