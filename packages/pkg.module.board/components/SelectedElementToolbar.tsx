import { useEffect, useMemo } from 'react';
import { Button } from '@xipkg/button';
import { Trash, Copy, MoreVert } from '@xipkg/icons';
import { useBoardStore } from '../store';
import { useIsStageScaling } from '../hooks';
import { ToolbarElement } from '../types';

export const SelectedElementToolbar = () => {
  const {
    selectedTool,
    selectedElementId,
    removeElement,
    selectElement,
    boardElements,
    isElementTransforming,
    selectToolbarPosition,
  } = useBoardStore();

  const { isScaling } = useIsStageScaling();

  useEffect(() => {
    if (!selectedElementId) {
      removeElement('toolbar');
    }
  }, [removeElement, selectedElementId]);

  const position = useMemo(() => {
    if (selectToolbarPosition && (selectToolbarPosition.x !== 0 || selectToolbarPosition.y !== 0)) {
      return selectToolbarPosition;
    }

    const toolbarElement = boardElements.find(
      (el) => el.id === 'toolbar' && el.type === 'toolbar',
    ) as ToolbarElement;

    return toolbarElement ? { x: toolbarElement.x || 0, y: toolbarElement.y || 0 } : { x: 0, y: 0 };
  }, [selectToolbarPosition, boardElements]);

  const handleDelete = useMemo(
    () => () => {
      if (selectedElementId) {
        removeElement(selectedElementId);
        selectElement(null);
      }
    },
    [selectedElementId, removeElement, selectElement],
  );

  if (!selectedElementId || selectedTool !== 'select' || isElementTransforming) {
    return null;
  }

  return (
    <div
      className="border-gray-10 bg-gray-0 z-400 absolute z-50 flex gap-2 rounded-xl border p-1"
      style={{
        left: position.x,
        top: position.y,
        transform: 'translate(0, -100%)',
        opacity: isScaling ? 0 : 1,
        visibility: isScaling ? 'hidden' : 'visible',
      }}
    >
      <Button variant="ghost" size="s" className="p-1" onClick={handleDelete}>
        <Trash />
      </Button>
      <Button variant="ghost" size="s" className="p-1">
        <Copy />
      </Button>
      <Button variant="ghost" size="s" className="p-1">
        <MoreVert />
      </Button>
    </div>
  );
};
