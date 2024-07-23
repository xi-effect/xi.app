import { useCanRedo, useCanUndo, useEditor } from 'tldraw';
import { Undo, Redo } from '@xipkg/icons';

export function NavbarAction() {
  const editor = useEditor();
  const canRedo = useCanRedo();
  const canUndo = useCanUndo();

  return (
    <div className="pointer-events-auto flex items-center justify-center gap-5">
      <button aria-label="Undo" type="button" className="bg-gray-0 items-center rounded-[8px]" onClick={() => editor.undo()}>
        <Undo className={`${canUndo ? null : 'fill-gray-40'}`} />
      </button>
      <button aria-label="Redo" type="button" className="bg-gray-0 items-center rounded-[8px]" onClick={() => editor.redo()}>
        <Redo className={`${canRedo ? null : 'fill-gray-40'}`} />
      </button>
    </div>
  );
}
