import React from 'react';
import { track, useEditor } from 'tldraw';
import { NavbarAction } from './NavbarAction';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@xipkg/tooltip';
import { MenuPopupContent } from './MenuPopupContent';
import { navBarElements, TNavbarElement } from '../navBarElements';

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
                    <TooltipContent className="border-gray-10 bg-gray-0 mb-1 flex gap-10 rounded-[12px] border p-1 shadow-none">
                      <MenuPopupContent item={item} setIsTooltipOpen={setIsTooltipOpen} />
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
