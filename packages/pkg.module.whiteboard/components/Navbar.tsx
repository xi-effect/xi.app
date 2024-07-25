import { DefaultColorStyle, StyleProp, track, useEditor } from 'tldraw';
import { Arrow, Cursor, Eraser, Figures, Hand, Image, Pen, Sticker, TText } from '@xipkg/icons';
import React from 'react';
import { NavbarAction } from './NavbarAction';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@xipkg/tooltip';

type TNavbarElement = {
  action: string;
  title: string;
  icon: React.ReactNode | null;
  hasAToolTip?: boolean;
  menuPopupContent?: TMenuPopupItem[];
};

type TMenuPopupItem = {
  icon: React.ReactNode | null;
  action: string;
  color: string;
};

const navBarElements: TNavbarElement[] = [
  { action: 'select', title: 'Select', icon: <Cursor />, hasAToolTip: true },
  { action: 'hand', title: 'Hand', icon: <Hand /> },
  { action: 'draw', title: 'Draw', icon: <Pen />, hasAToolTip: true },
  {
    action: 'note',
    title: 'Sticker',
    icon: <Sticker />,
    hasAToolTip: true,
    menuPopupContent: [
      {
        icon: <Sticker className="fill-gray-60" />,
        action: 'set-style',
        color: 'grey',
      },
      {
        icon: <Sticker className="fill-brand-100" />,
        action: 'set-style',
        color: 'blue',
      },
      {
        icon: <Sticker className="fill-red-100" />,
        action: 'set-style',
        color: 'red',
      },
      {
        icon: <Sticker className="fill-green-100" />,
        action: 'set-style',
        color: 'green',
      },
      {
        icon: <Sticker className="fill-orange-100" />,
        action: 'set-style',
        color: 'light-red',
      },
      {
        icon: <Sticker className="fill-yellow-100" />,
        action: 'set-style',
        color: 'yellow',
      },
      {
        icon: <Sticker className="fill-violet-100" />,
        action: 'set-style',
        color: 'violet',
      },
      {
        icon: <Sticker className="fill-pink-100" />,
        action: 'set-style',
        color: 'light-violet',
      },
      {
        icon: <Sticker className="fill-cyan-100" />,
        action: 'set-style',
        color: 'light-blue',
      },
    ],
  },
  { action: 'text', title: 'Text', icon: <TText />, hasAToolTip: true },
  { action: 'rectangle', title: 'Shapes', icon: <Figures />, hasAToolTip: true },
  { action: 'arrow', title: 'Arrow', icon: <Arrow />, hasAToolTip: true },
  { action: 'image', title: 'Image', icon: <Image />, hasAToolTip: true },
  { action: 'eraser', title: 'Eraser', icon: <Eraser /> },
];

export const Navbar = track(() => {
  const [isTooltipOpen, setIsTooltipOpen] = React.useState(false);
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
                <TooltipProvider>
                  <Tooltip
                    open={
                      editor.getCurrentToolId() === item.action &&
                      item?.hasAToolTip &&
                      isTooltipOpen
                    }
                  >
                    <TooltipTrigger className="rounded-[8px]">
                      <button
                        type="button"
                        key={item.action}
                        className={`pointer-events-auto flex h-[32px] w-[32px] items-center justify-center rounded-[8px] ${editor.getCurrentToolId() === item.action ? 'bg-brand-0' : 'bg-gray-0'}`}
                        data-isactive={editor.getCurrentToolId() === item.action}
                        onClick={() => {
                          setIsTooltipOpen(true);
                          editor.setCurrentTool(item.action);
                        }}
                      >
                        {item.icon ? item.icon : item.title}
                      </button>
                    </TooltipTrigger>
                    <TooltipContent className="border-gray-10 bg-gray-0 mb-2 flex gap-10 rounded-[12px] border p-1">
                      <div className="flex gap-2">
                        {item.menuPopupContent?.map((item) => (
                          <button
                            type="button"
                            className={
                              'bg-gray-0 pointer-events-auto flex h-[32px] w-[32px] items-center justify-center rounded-[8px]'
                            }
                            onClick={() => {
                              setIsTooltipOpen(false);
                              editor.setStyleForNextShapes(
                                DefaultColorStyle as unknown as StyleProp<string>,
                                item.color,
                              );
                            }}
                          >
                            <div className="text-s-base">{item.icon ? item.icon : item.action}</div>
                          </button>
                        ))}
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
