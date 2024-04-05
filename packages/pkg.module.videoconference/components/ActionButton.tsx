import { ReactNode } from 'react';

export interface IActionButton {
    icon : ReactNode,
    enable? : boolean,
    withBorder? : boolean
}

export function ActionButton({ icon, enable, withBorder = true }: IActionButton) {
    return (
      <div
        className={`border-4 ${enable && withBorder ? 'border-green-60' : 'border-red-60'} ${!withBorder ? 'border-none' : null} cursor-pointer ml-0.5 flex h-12 w-12 flex-row items-center justify-center rounded-[24px] bg-gray-100`}
      >
        {icon}
      </div>
    );
}
