import React from 'react';
import { DefaultColorStyle, DefaultSizeStyle, StyleProp, track, useEditor } from 'tldraw';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@xipkg/tooltip';
import { NavbarAction } from './NavbarAction';
import { StickerPopupContent } from './StickerPopupContent';
import { navBarElements, NavbarElementT } from '../utils/navBarElements';
import { useInsertMedia } from '../utils/useInsertMedia';
import { StylePopupContent } from './StylePopupContent';

export const Navbar = track(() => {
  const [isTooltipOpen, setIsTooltipOpen] = React.useState(false);
  const editor = useEditor();
  const insertMedia = useInsertMedia();

  const resetStyles = () => {
    editor.setStyleForNextShapes(DefaultColorStyle as unknown as StyleProp<string>, 'black');
    editor.setOpacityForNextShapes(1);
    editor.setStyleForNextShapes(DefaultSizeStyle as unknown as StyleProp<string>, 'm');
  };

  const hanleTool = (action: string) => {
    if (action !== 'asset') {
      setIsTooltipOpen(true);
      editor.setCurrentTool(action);
    } else {
      insertMedia();
    }
  };

  return (
    <div className="pointer-events-none absolute inset-0">
      <div className="absolute bottom-3 left-0 right-0 z-30 flex w-full items-center justify-center">
        <div className="z-30 flex gap-7">
          <div className="border-gray-10 bg-gray-0 z-30 rounded-xl border p-2">
            <NavbarAction />
          </div>
          <div className="border-gray-10 bg-gray-0 flex gap-10 rounded-xl border">
            <div className="flex gap-2 p-1">
              {navBarElements.map((item: NavbarElementT) => {
                const isActive = editor.getCurrentToolId() === item.action;
                return (
                  <TooltipProvider key={item.action}>
                    <Tooltip open={isActive && item?.hasAToolTip && isTooltipOpen}>
                      <div className="pointer-events-auto">
                        <TooltipTrigger className="rounded-lg">
                          <button
                            type="button"
                            className={`pointer-events-auto flex h-8 w-8 items-center justify-center rounded-lg ${isActive ? 'bg-brand-0' : 'bg-gray-0'}`}
                            data-isactive={isActive}
                            onClick={() => {
                              resetStyles();
                              hanleTool(item.action);
                            }}
                          >
                            {item.icon ? item.icon : item.title}
                          </button>
                        </TooltipTrigger>
                        <TooltipContent className="border-gray-10 bg-gray-0 mb-1 flex gap-10 rounded-xl border p-1 shadow-none">
                          {editor.getCurrentToolId() == 'sticker' && (
                            <StickerPopupContent item={item} />
                          )}
                          {editor.getCurrentToolId() === 'draw' && (
                            <StylePopupContent item={item} />
                          )}
                        </TooltipContent>
                      </div>
                    </Tooltip>
                  </TooltipProvider>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
