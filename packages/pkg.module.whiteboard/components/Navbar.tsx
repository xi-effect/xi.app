import { track, useEditor } from 'tldraw';
import { NavbarAction } from './NavbarAction';
import { Arrow, Cursor, Eraser, Figures, Hand, Image, Pen, Sticker, TText } from '@xipkg/icons';

type TNavbarElement = {
  action: string;
  title: string;
  icon: JSX.Element | null;
};

export const Navbar = track(() => {
  const editor = useEditor();

  const navBarElements: TNavbarElement[] = [
    { action: 'select', title: 'Select', icon: <Cursor /> },
    { action: 'hand', title: 'Hand', icon: <Hand /> },
    { action: 'draw', title: 'Draw', icon: <Pen /> },
    { action: 'note', title: 'Sticker', icon: <Sticker /> },
    { action: 'text', title: 'Text', icon: <TText /> },
    { action: 'rectangle', title: 'Shapes', icon: <Figures /> },
    { action: 'arrow', title: 'Arrow', icon: <Arrow /> },
    { action: 'image', title: 'Image', icon: <Image /> },
    { action: 'eraser', title: 'Eraser', icon: <Eraser /> },
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
              {navBarElements.map((item: TNavbarElement) => (
                <button
                  key={item.action}
                  className={`pointer-events-auto flex h-[32px] w-[32px] items-center justify-center rounded-[8px] ${editor.getCurrentToolId() == item.action ? 'bg-brand-0' : 'bg-white'}`}
                  data-isactive={editor.getCurrentToolId() === item.action}
                  onClick={() => editor.setCurrentTool(item.action)}
                >
                  {item.icon ? item.icon : item.title}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
