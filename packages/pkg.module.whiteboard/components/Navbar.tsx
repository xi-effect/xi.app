import React, { ChangeEvent, useRef } from 'react';
import { TLAssetId, TLImageAsset, track, useEditor } from 'tldraw';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@xipkg/tooltip';
import { NavbarAction } from './NavbarAction';
import { MenuPopupContent } from './MenuPopupContent';
import { post } from 'pkg.utils/fetch';
import { navBarElements, NavbarElementT } from '../utils/navBarElements';
import { useInsertMedia } from '../utils/useInsertMedia';
import { toast } from 'sonner';

type MediaResponseT = {
  creator_user_id: string;
  id: string;
  kind: string;
  name: string;
};

export const Navbar = track(() => {
  const [isTooltipOpen, setIsTooltipOpen] = React.useState(false);
  const editor = useEditor();
  const insertMedia = useInsertMedia();

  return (
    <div className="pointer-events-none absolute inset-0">
      <div className="absolute bottom-3 left-0 right-0 z-30 flex w-full items-center justify-center">
        <div className="z-30 flex gap-7">
          <div className="border-gray-10 bg-gray-0 z-30 rounded-[12px] border p-2">
            <NavbarAction />
          </div>
          <div className="border-gray-10 bg-gray-0 flex gap-10 rounded-[12px] border">
            <div className="flex gap-2 p-1">
              {navBarElements.map((item: NavbarElementT) => {
                const isActive = editor.getCurrentToolId() === item.action;
                return (
                  <TooltipProvider key={item.action}>
                    <Tooltip open={isActive && item?.hasAToolTip && isTooltipOpen}>
                      <TooltipTrigger className="rounded-[8px]">
                        <button
                          type="button"
                          className={`pointer-events-auto flex h-[32px] w-[32px] items-center justify-center rounded-[8px] ${isActive ? 'bg-brand-0' : 'bg-gray-0'}`}
                          data-isactive={isActive}
                          onClick={() => {
                            if (item.action !== 'asset') {
                              setIsTooltipOpen(true);
                              editor.setCurrentTool(item.action);
                            } else {
                              insertMedia();
                            }
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
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
