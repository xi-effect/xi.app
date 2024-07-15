import { track, useEditor } from 'tldraw';
import { NavbarAction } from './NavbarAction';

export const Navbar = track(() => {
  const editor = useEditor();

  const navBarElements = [
    { action: 'select', title: 'Select' },
    { action: 'hand', title: 'Hand' },
    { action: 'draw', title: 'Draw' },
    { action: 'note', title: 'Sticker' },
    { action: 'text', title: 'Text' },
    { action: 'rectangle', title: 'Shapes' },
    { action: 'arrow', title: 'Arrow' },
    { action: 'image', title: 'Image' },
    { action: 'eraser', title: 'Eraser' },
  ];

  return (
    <div className="pointer-events-none absolute inset-0">
      <div className="absolute bottom-3 left-0 right-0 flex w-full items-center justify-center">
        <div className="flex gap-7">
          <div className="border-gray-10 z-[300] flex gap-10 rounded-[12px] border bg-white">
            <NavbarAction />
          </div>
          <div className="border-gray-10 z-[300] flex gap-10 rounded-[12px] border bg-white">
            <div className="flex gap-2 p-1">
              {navBarElements.map((item) => (
                <button
                  key={item.action}
                  className={`pointer-events-auto h-[32px] w-[32px] items-center rounded-[8px] ${editor.getCurrentToolId() == item.action ? 'bg-brand-0' : 'bg-white'}`}
                  data-isactive={editor.getCurrentToolId() === item.action}
                  onClick={() => editor.setCurrentTool(item.action)}
                >
                  {item.title}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
