import { useCanRedo, useCanUndo, useEditor } from 'tldraw';
import { Undo, Redo } from '@xipkg/icons';

export function NavbarAction() {
  const editor = useEditor();
  const canRedo = useCanRedo();
  const canUndo = useCanUndo();

  const handleUndo = () => {
    editor.undo();
  };
  const handleRedo = () => {
    editor.redo();
  };

  return (
    <div className="pointer-events-auto flex items-center justify-center gap-5">
      <button className="items-center rounded-[8px] bg-white" onClick={handleUndo}>
        <Undo className={`${canUndo ? null : 'fill-gray-40'}`} />
      </button>
      <button className="items-center rounded-[8px] bg-white" onClick={handleRedo}>
        <Redo className={`${canRedo ? null : 'fill-gray-40'}`} />
      </button>
    </div>
  );
}
