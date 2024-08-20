import React from 'react';
import { NavbarElementT } from '../utils/navBarElements';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@xipkg/tooltip';
import { StyleMenu } from './StyleMenu';

type StylePopupContentT = {
  item: NavbarElementT;
};

export type StylePopupItemT = {
  icon: React.ReactNode | null;
  action: string;
  color: string;
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
                className="bg-gray-0 flex h-[32px] w-[32px] items-center justify-center"
                onClick={() => setIsTooltipOpen(true)}
              >
                <div className={`text-s-base fill-black-100`}>
                  {item.icon ? item.icon : item.action}
                </div>
              </button>
            ))}
          </TooltipTrigger>
          <TooltipContent align="start" className="mb-1 flex h-60 w-72 rounded-xl p-0 shadow-none">
            <StyleMenu />
          </TooltipContent>
        </div>
      </Tooltip>
    </TooltipProvider>
  );
};
