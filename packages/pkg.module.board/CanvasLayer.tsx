/* eslint-disable @typescript-eslint/no-explicit-any */
// components/CanvasLayer.tsx
import React, { useState } from 'react';
import { Layer, Line, Rect, Text, Image, Circle } from 'react-konva';
import useImage from 'use-image';
import { BoardElement, ToolType } from './types';
import { useBoardStore } from './store';

interface CanvasLayerProps {
  boardElements: BoardElement[];
  selectedTool: ToolType;
}

const CanvasLayer: React.FC<CanvasLayerProps> = ({ boardElements, selectedTool }) => {
  // Для инструмента "ручка" будем сохранять текущую линию до завершения рисования
  const [newLine, setNewLine] = useState<number[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const { addElement, updateElement } = useBoardStore();

  const handleMouseDown = (e: any) => {
    if (selectedTool === 'pen') {
      setIsDrawing(true);
      const pos = e.target.getStage().getPointerPosition();
      setNewLine([pos.x, pos.y]);
    }
    // TODO: обработка других инструментов (например, создание стикера, текста и пр.)
  };

  const handleMouseMove = (e: any) => {
    if (!isDrawing || selectedTool !== 'pen') return;
    const pos = e.target.getStage().getPointerPosition();
    setNewLine((prev) => [...prev, pos.x, pos.y]);
  };

  const handleMouseUp = () => {
    if (selectedTool === 'pen' && isDrawing) {
      // Добавляем новый элемент линии
      const id = new Date().getTime().toString();
      addElement({
        id,
        type: 'line',
        points: newLine,
        stroke: '#000000', // можно добавить выбор цвета
        strokeWidth: 2,
        opacity: 1,
      });
      setNewLine([]);
      setIsDrawing(false);
    }
  };

  return (
    <Layer onMouseDown={handleMouseDown} onMousemove={handleMouseMove} onMouseup={handleMouseUp}>
      {/* Отрисовка сохранённых элементов доски */}
      {boardElements.map((el) => {
        switch (el.type) {
          case 'line':
            return (
              <Line
                key={el.id}
                points={el.points!}
                stroke={el.stroke}
                strokeWidth={el.strokeWidth}
                opacity={el.opacity}
                lineCap="round"
                lineJoin="round"
                draggable
                onDragEnd={() => {
                  // Можно обновлять положение линии, если требуется
                  // updateElement(el.id, { ... });
                }}
              />
            );
          case 'rectangle':
            return (
              <Rect
                key={el.id}
                x={el.x}
                y={el.y}
                width={el.width}
                height={el.height}
                stroke={el.stroke}
                fill={el.fill}
                draggable
                onDragEnd={(e) => {
                  updateElement(el.id, { x: e.target.x(), y: e.target.y() });
                }}
              />
            );
          case 'circle':
            return (
              <Circle
                key={el.id}
                x={el.x}
                y={el.y}
                radius={el.radius}
                stroke={el.stroke}
                fill={el.fill}
                draggable
                onDragEnd={(e) => {
                  updateElement(el.id, { x: e.target.x(), y: e.target.y() });
                }}
              />
            );
          case 'text':
            return (
              <Text
                key={el.id}
                x={el.x}
                y={el.y}
                text={el.text}
                fontSize={el.fontSize}
                fontFamily={el.fontFamily}
                fill={el.fill}
                draggable
                onDragEnd={(e) => {
                  updateElement(el.id, { x: e.target.x(), y: e.target.y() });
                }}
              />
            );
          case 'sticker':
            return (
              <React.Fragment key={el.id}>
                <Rect
                  x={el.x}
                  y={el.y}
                  width={el.width}
                  height={el.height}
                  fill={el.backgroundColor}
                  stroke="black"
                  draggable
                  onDragEnd={(e) => {
                    updateElement(el.id, { x: e.target.x(), y: e.target.y() });
                  }}
                />
                <Text
                  x={el.x! + 10}
                  y={el.y! + 10}
                  text={el.text}
                  fontSize={el.fontSize}
                  fontFamily={el.fontFamily}
                  fill={el.textColor}
                  draggable
                />
              </React.Fragment>
            );
          case 'image':
            return <BoardImage key={el.id} el={el} updateElement={updateElement} />;
          default:
            return null;
        }
      })}

      {/* Отрисовка временной линии при рисовании */}
      {isDrawing && selectedTool === 'pen' && (
        <Line points={newLine} stroke="#000000" strokeWidth={2} lineCap="round" lineJoin="round" />
      )}
    </Layer>
  );
};

export default CanvasLayer;

// Вспомогательный компонент для отрисовки изображений
interface BoardImageProps {
  el: BoardElement;
  updateElement: (id: string, updates: Partial<BoardElement>) => void;
}

const BoardImage: React.FC<BoardImageProps> = ({ el, updateElement }) => {
  const [image] = useImage(el.src!);
  return (
    <Image
      image={image}
      x={el.x}
      y={el.y}
      width={el.width}
      height={el.height}
      draggable
      onDragEnd={(e) => {
        updateElement(el.id, { x: e.target.x(), y: e.target.y() });
      }}
    />
  );
};
