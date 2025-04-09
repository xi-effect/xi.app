import { useCallback, useRef, useMemo } from 'react';
import Konva from 'konva';
import { useBoardStore } from '../store';
import { BoardElement, ToolbarElement } from '../types';
import { useStage } from '../providers';

export const useElementHandlers = () => {
  const {
    selectElement,
    selectedTool,
    addElement,
    updateElement,
    selectedElementId,
    setIsElementTransforming,
    setSelectToolbarPosition,
    removeElement,
    boardElements,
  } = useBoardStore();
  const { transformerRef, layerRef } = useStage();

  const throttleUpdate = useRef<number | null>(null);

  const toolbarElement = useMemo<ToolbarElement>(
    () => ({
      id: 'toolbar',
      type: 'toolbar',
      x: 0,
      y: 0,
      elementId: selectedElementId,
    }),
    [selectedElementId],
  );

  const updateToolbarPosition = useCallback(
    (x: number, y: number) => {
      if (!selectedElementId) return;

      const updatedToolbar = { ...toolbarElement, x, y };
      const existingToolbar = boardElements.find((el) => el.id === 'toolbar');
      if (existingToolbar) {
        updateElement('toolbar', updatedToolbar);
      } else {
        addElement(updatedToolbar);
      }

      setSelectToolbarPosition({ x, y });
    },
    [
      selectedElementId,
      updateElement,
      addElement,
      toolbarElement,
      setSelectToolbarPosition,
      boardElements,
    ],
  );

  const onChangeTransformerPosition = useCallback(() => {
    if (throttleUpdate.current) {
      cancelAnimationFrame(throttleUpdate.current);
    }
    throttleUpdate.current = requestAnimationFrame(() => {
      if (transformerRef.current && selectedElementId) {
        const box = transformerRef.current.getClientRect();
        updateToolbarPosition(box.x, box.y);
      }
    });
  }, [selectedElementId, updateToolbarPosition, transformerRef]);

  const handleSelect = useCallback(
    (e: Konva.KonvaEventObject<MouseEvent>, id: string) => {
      e.cancelBubble = true;
      selectElement(null);
      if (selectedTool === 'select') {
        selectElement(id);
        if (transformerRef.current) {
          const box = transformerRef.current.getClientRect();
          updateToolbarPosition(box.x, box.y);
        }
      }
    },
    [selectElement, selectedTool, transformerRef, updateToolbarPosition],
  );

  const handleDragStart = useCallback(() => {
    setIsElementTransforming(true);
    setSelectToolbarPosition({ x: 0, y: 0 });
    removeElement('toolbar');
  }, [setIsElementTransforming, setSelectToolbarPosition, removeElement]);

  const handleDragEnd = useCallback(
    (e: Konva.KonvaEventObject<DragEvent>, element: BoardElement) => {
      if (!transformerRef.current || !selectedElementId) return;

      // проверяем появился ли в сторе элемент
      const currentElement = boardElements.find((el) => el.id === element.id);
      if (currentElement && JSON.stringify(currentElement) !== JSON.stringify(element)) {
        updateElement(element.id, currentElement);
        return;
      }

      const box = transformerRef.current.getClientRect();
      updateToolbarPosition(box.x, box.y);
      setIsElementTransforming(false);

      updateElement(element.id, {
        x: e.target.x(),
        y: e.target.y(),
        width: e.target.width(),
        height: e.target.height(),
      });
    },
    [
      transformerRef,
      selectedElementId,
      updateToolbarPosition,
      setIsElementTransforming,
      updateElement,
      boardElements,
    ],
  );

  const handleTransformEnd = useCallback(() => {
    if (!transformerRef.current || !selectedElementId || !layerRef.current) return;

    const selectedNode = layerRef.current.findOne(`#${selectedElementId}`);
    if (!selectedNode) return;

    const x = selectedNode.x();
    const y = selectedNode.y();
    const scaleX = selectedNode.scaleX();
    const scaleY = selectedNode.scaleY();

    updateElement(selectedElementId, {
      x,
      y,
      scaleX,
      scaleY,
    });

    const box = transformerRef.current.getClientRect();
    updateToolbarPosition(box.x, box.y);
    setIsElementTransforming(false);
  }, [
    transformerRef,
    selectedElementId,
    layerRef,
    updateToolbarPosition,
    setIsElementTransforming,
    updateElement,
  ]);

  return {
    handleSelect,
    handleDragEnd,
    handleTransformEnd,
    handleDragStart,
    onChangeTransformerPosition,
  };
};
