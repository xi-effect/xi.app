import React from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@xipkg/tooltip';
import { NavbarElementT } from '../utils/navBarElements';
import { StyleMenu } from './StyleMenu';

export type StylePopupItemT = {
  icon: React.ReactNode | null;
  action: string;
  color: string;
};

type StylePopupContentT = {
  item: NavbarElementT;
};

export const StylePopupContent = ({ item }: StylePopupContentT) => {
  const [isTooltipOpen, setIsTooltipOpen] = React.useState(false);
  return (
    <TooltipProvider>
      <Tooltip open={isTooltipOpen}>
        <div className="pointer-events-auto flex gap-2">
          <TooltipTrigger>
            {item.menuPopupContent?.map((item: StylePopupItemT) => (
              <button
                type="button"
                className="bg-gray-0 flex h-8 w-8 items-center justify-center"
                onClick={() => setIsTooltipOpen(true)}
              >
                <div className="text-s-base fill-gray-100">
                  {item.icon ? item.icon : item.action}
                </div>
              </button>
            ))}
          </TooltipTrigger>
          <TooltipContent
            align="start"
            className="border-gray-10 bg-gray-0 mb-1 flex h-64 w-72 rounded-xl border p-0 shadow-none"
          >
            <StyleMenu />
          </TooltipContent>
        </div>
      </Tooltip>
    </TooltipProvider>
  );
};
