import { track, useEditor } from 'tldraw';
import { NavbarAction } from './NavbarAction';
import { Arrow, Cursor, Eraser, Figures, Hand, Image, Pen, Sticker, TText } from '@xipkg/icons';
import React from 'react';

type TNavbarElement = {
  action: string;
  title: string;
  icon: React.ReactNode | null;
};

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

export const Navbar = track(() => {
  const editor = useEditor();
  return (
    <div className="pointer-events-none absolute inset-0">
      <div className="absolute bottom-3 left-0 right-0 z-[300] flex w-full items-center justify-center">
        <div className="z-[300] flex gap-7">
          <div className="border-gray-10 bg-gray-0 z-[300] rounded-[12px] border p-2">
            <NavbarAction />
          </div>
          <div className="border-gray-10 bg-gray-0 flex gap-10 rounded-[12px] border">
            <div className="flex gap-2 p-1">
              {navBarElements.map((item: TNavbarElement) => (
                <button
                  key={item.action}
                  className={`pointer-events-auto flex h-[32px] w-[32px] items-center justify-center rounded-[8px] ${editor.getCurrentToolId() == item.action ? 'bg-brand-0' : 'bg-gray-0'}`}
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
