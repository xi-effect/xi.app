// types/index.ts
export type ToolType = 'pen' | 'sticker' | 'text' | 'eraser' | 'shape' | 'image' | 'select';

export type ElementType = 'line' | 'rectangle' | 'circle' | 'text' | 'sticker' | 'image';

export interface BoardElement {
  id: string;
  type: ElementType;
  // Свойства для линии
  points?: number[];
  stroke?: string;
  strokeWidth?: number;
  opacity?: number;
  // Свойства для прямоугольника и круга
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  radius?: number;
  fill?: string;
  // Свойства для текста и стикера
  text?: string;
  fontSize?: number;
  fontFamily?: string;
  textColor?: string;
  backgroundColor?: string;
  // Свойства для изображения
  src?: string;
}
