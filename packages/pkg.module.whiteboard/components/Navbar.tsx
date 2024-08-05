import React, { ChangeEvent, useRef } from 'react';
import { track, useEditor } from 'tldraw';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@xipkg/tooltip';
import { NavbarAction } from './NavbarAction';
import { MenuPopupContent } from './MenuPopupContent';
import { navBarElements, NavbarElementT } from '../navBarElements';
import { toast } from 'sonner';

export const Navbar = track(() => {
  const [isTooltipOpen, setIsTooltipOpen] = React.useState(false);
  const editor = useEditor();
  const [inputKey, setInputKey] = React.useState(1);
  const [file, setFile] = React.useState<any>();

  const handleMenuEditClick = () => {
    inputRef.current?.click();
  };

  const readFile = (file: File) =>
    new Promise((resolve) => {
      const reader = new FileReader();
      reader.addEventListener('load', () => resolve(reader.result), false);
      reader.readAsDataURL(file);
    });
  const handleInput = async (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) {
      return;
    }

    if (event.target.files[0].size > 5 * 1024 * 1024) {
      toast('Файл слишком большой');
      return;
    }

    const imageDataUrl = await readFile(event.target.files[0]);
    setFile(imageDataUrl);
    setInputKey(Math.random());
  };

  const inputRef = useRef<HTMLInputElement | null>(null);

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
                            if (item.action === 'image') {
                              handleMenuEditClick();
                            } else {
                              setIsTooltipOpen(true);
                              editor.setCurrentTool(item.action);
                            }
                          }}
                        >
                          {item.icon ? item.icon : item.title}
                        </button>
                        <input
                          className="hidden"
                          ref={inputRef}
                          onChange={handleInput}
                          type="file"
                          key={inputKey}
                        />
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
