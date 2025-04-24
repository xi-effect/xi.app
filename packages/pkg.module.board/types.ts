// types/index.ts
export type ToolType =
  | 'pen'
  | 'sticker'
  | 'text'
  | 'eraser'
  | 'rectangle'
  | 'image'
  | 'select'
  | 'hand'
  | 'arrow'
  | 'asset';

export type ElementType =
  | 'line'
  | 'rectangle'
  | 'circle'
  | 'text'
  | 'sticker'
  | 'image'
  | 'toolbar';

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
  // Свойства масштабирования для всех элементов
  scaleX?: number;
  scaleY?: number;
  // Свойства для текста и стикера
  text?: string;
  fontSize?: number;
  fontFamily?: string;
  textColor?: string;
  backgroundColor?: string;
  // Свойства для изображения
  src?: string;
}

export interface Point {
  x: number;
  y: number;
}

export interface ZoomConfig {
  minScale: number;
  maxScale: number;
  scaleBy: number;
  animationDuration: number;
  baseScaleStep: number;
}

export interface ToolbarElement extends BoardElement {
  type: 'toolbar';
  elementId: string | null;
}
