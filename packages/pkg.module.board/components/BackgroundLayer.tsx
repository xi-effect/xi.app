// components/BackgroundLayer.tsx
import React, { useMemo } from 'react';
import { Layer, Rect } from 'react-konva';

interface BackgroundLayerProps {
  width: number;
  height: number;
  stageScale: number; // текущий масштаб доски (из UI-стора или компонента)
}

export const BackgroundLayer: React.FC<BackgroundLayerProps> = ({ width, height, stageScale }) => {
  // Создаем offscreen canvas для паттерна один раз при монтировании компонента
  const patternCanvas = useMemo(() => {
    const size = 20; // размер "тайла" паттерна (можно настроить)
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const context = canvas.getContext('2d');
    if (context) {
      // Заливаем фон тайла (например, светло-серым)
      context.fillStyle = '#f5f5f5';
      context.fillRect(0, 0, size, size);
      // Рисуем точку в центре (цвет можно изменить)
      context.fillStyle = '#d1d1d1';
      context.beginPath();
      context.arc(size / 2, size / 2, 2, 0, Math.PI * 2);
      context.fill();
    }
    return canvas;
  }, []);

  return (
    <Layer>
      <Rect
        x={0}
        y={0}
        width={width}
        height={height}
        // Приводим canvas к типу HTMLImageElement для TypeScript
        fillPatternImage={patternCanvas as unknown as HTMLImageElement}
        fillPatternRepeat="repeat"
        // Обратное масштабирование паттерна:
        // Если Stage масштабирован с коэффициентом stageScale,
        // то паттерн масштабируется в обратном направлении, чтобы сохранить свой размер на экране.
        fillPatternScale={{ x: 1 / stageScale, y: 1 / stageScale }}
      />
    </Layer>
  );
};
