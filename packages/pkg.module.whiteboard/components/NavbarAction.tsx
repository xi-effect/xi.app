import { useCanRedo, useCanUndo, useEditor } from 'tldraw';

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
    <div className="flex gap-2 p-1">
      <button
        className="pointer-events-auto h-[32px] w-[32px] items-center rounded-[8px] bg-white"
        onClick={handleUndo}
        disabled={!canUndo}
      >
        Undo
      </button>
      <button
        className="pointer-events-auto h-[32px] w-[32px] items-center rounded-[8px] bg-white"
        onClick={handleRedo}
        disabled={!canRedo}
      >
        Redo
      </button>
    </div>
  );
}
