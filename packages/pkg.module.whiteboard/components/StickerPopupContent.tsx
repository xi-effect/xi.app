import React from 'react';
import { DefaultColorStyle, StyleProp, useEditor } from 'tldraw';
import { NavbarElementT } from '../utils/navBarElements';
import { Tooltip, TooltipProvider, TooltipTrigger } from '@xipkg/tooltip';

type StickerPopupContentT = {
  item: NavbarElementT;
};

export type StickerPopupItemT = {
  icon: React.ReactNode | null;
  action: string;
  color: string;
};

export const StickerPopupContent = ({ item }: StickerPopupContentT) => {
  const editor = useEditor();

  return (
    <div className="flex gap-2">
      {item.menuPopupContent?.map((item: StickerPopupItemT) => (
        <button
          type="button"
          className="bg-gray-0 pointer-events-auto flex h-[32px] w-[32px] items-center justify-center rounded-[8px]"
          onClick={() => {
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
  );
};
