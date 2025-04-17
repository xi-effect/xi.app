import { ToolType } from '../types';

// типы курсора можно задать через url, передав base64 строку

const cursorMap: Record<ToolType, string> = {
  pen: 'crosshair',
  sticker: 'crosshair',
  text: 'text',
  eraser: 'crosshair',
  rectangle: 'crosshair',
  image: 'default',
  select: 'default',
  hand: 'grab',
  arrow: 'crosshair',
  asset: 'default',
};

export const getCursorType = (tool: ToolType, isGrabbing: boolean): string => {
  if (tool === 'hand') {
    return isGrabbing ? 'grabbing' : 'grab';
  }

  return cursorMap[tool] ?? 'default';
};
