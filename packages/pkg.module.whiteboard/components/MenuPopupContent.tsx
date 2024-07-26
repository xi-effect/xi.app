import React from 'react';
import { DefaultColorStyle, StyleProp, useEditor } from 'tldraw';

type TMenuPopupContent = {
  item: any;
  setIsTooltipOpen: (arg: boolean) => void;
};

export type TMenuPopupItem = {
  icon: React.ReactNode | null;
  action: string;
  color: string;
};

export const MenuPopupContent = ({ item, setIsTooltipOpen }: TMenuPopupContent) => {
  const editor = useEditor();
  return (
    <div className="flex gap-2">
      {item.menuPopupContent?.map((item: TMenuPopupItem) => (
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
  );
};
