import { Undo, Redo } from '@xipkg/icons';

export const NavbarAction = () => {
  console.log('NavbarAction');

  const canUndo = false;
  const canRedo = false;
  return (
    <div className="pointer-events-auto flex items-center justify-center gap-1">
      <button
        aria-label="Undo"
        type="button"
        className="bg-gray-0 hover:bg-brand-0 flex size-6 items-center justify-center rounded-[8px] lg:size-8"
        onClick={() => {}}
      >
        <Undo className={`${canUndo ? null : 'fill-gray-40'} h-5 w-5 lg:h-6 lg:w-6`} />
      </button>
      <button
        aria-label="Redo"
        type="button"
        className="bg-gray-0 hover:bg-brand-0 flex size-6 items-center justify-center rounded-[8px] lg:size-8"
        onClick={() => {}}
      >
        <Redo className={`${canRedo ? null : 'fill-gray-40'} h-5 w-5 lg:h-6 lg:w-6`} />
      </button>
    </div>
  );
};
