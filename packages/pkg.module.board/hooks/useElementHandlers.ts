import { useCallback, useRef } from 'react';
import Konva from 'konva';
import { useBoardStore } from '../store/useBoardStore';
import { BoardElement } from '../types';
import { useStage } from '../providers';

export const useElementHandlers = () => {
  const {
    selectElement,
    selectedTool,
    updateElement,
    setSelectToolbarPosition,
    selectedElementId,
  } = useBoardStore();
  const { transformerRef } = useStage();

  const throttleUpdate = useRef<number | null>(null);

  const handleSelect = (e: Konva.KonvaEventObject<MouseEvent>, id: string) => {
    e.cancelBubble = true;
    if (selectedTool === 'select') {
      selectElement(id);
    }
  };

  const handleDragEnd = (e: Konva.KonvaEventObject<DragEvent>, element: BoardElement) => {
    updateElement(element.id, { x: e.target.x(), y: e.target.y() });
  };

  const onChangeTransformerPosition = useCallback(() => {
    if (throttleUpdate.current) {
      cancelAnimationFrame(throttleUpdate.current);
    }
    throttleUpdate.current = requestAnimationFrame(() => {
      if (transformerRef.current && selectedElementId) {
        const box = transformerRef.current.getClientRect();
        setSelectToolbarPosition({ x: box.x, y: box.y });
      }
    });
  }, [selectedElementId, setSelectToolbarPosition, transformerRef]);

  return {
    handleSelect,
    handleDragEnd,
    onChangeTransformerPosition,
  };
};
