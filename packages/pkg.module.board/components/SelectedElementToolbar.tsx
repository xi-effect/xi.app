import { Button } from '@xipkg/button';
import { Trash, Copy, MoreVert } from '@xipkg/icons';
import { useBoardStore } from '../store';
import { useIsStageScaling } from '../hooks';

export const SelectedElementToolbar = () => {
  const { selectToolbarPosition, selectedTool, selectedElementId, removeElement, selectElement } =
    useBoardStore();

  const { isScaling } = useIsStageScaling();

  if (!selectedElementId || selectedTool !== 'select') {
    return null;
  }

  return (
    <div
      className="border-gray-10 bg-gray-0 z-400 absolute z-50 flex gap-2 rounded-xl border p-1"
      style={{
        left: selectToolbarPosition.x,
        top: selectToolbarPosition.y,
        transform: 'translate(0, -100%)',
        opacity: isScaling ? 0 : 1,
        visibility: isScaling ? 'hidden' : 'visible',
      }}
    >
      <Button
        variant="ghost"
        size="s"
        className="p-1"
        onClick={() => {
          removeElement(selectedElementId!);
          selectElement(null);
        }}
      >
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
