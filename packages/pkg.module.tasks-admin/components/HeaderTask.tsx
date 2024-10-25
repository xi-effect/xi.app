import React from 'react';

import { SimpleAnswer, LongAnswer, ArrowBottom, ArrowUp, MenuDots, Trash } from '@xipkg/icons';
import { Button } from '@xipkg/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@xipkg/dropdown';

type HeaderTaskT = {
  icon: 'simple' | 'detailed' | 'multiple';
  index: number;
  onMoveUp: () => void;
  onMoveDown: () => void;
  isFirst: boolean;
  isLast: boolean;
  onMoveToStart?: () => void;
  onMoveToEnd?: () => void;
  onDelete?: () => void;
};

const iconType = {
  simple: <SimpleAnswer className="fill-brand-80" />,
  detailed: <LongAnswer className="fill-brand-80" />,
  multiple: <LongAnswer className="fill-brand-80" />,
};

export const HeaderTask = ({
  icon,
  index,
  onMoveUp,
  onMoveDown,
  isFirst,
  isLast,
  onMoveToStart,
  onMoveToEnd,
  onDelete,
}: HeaderTaskT) => (
  <div className="flex justify-between">
    <div className="flex items-center">
      <div className="bg-brand-0 rounded-full p-2">{iconType[icon] || iconType['simple']}</div>
      <p className="text-m-base pl-4 font-medium">Простой ответ</p>
    </div>

    <div>
      <Button
        variant="ghost"
        className="p-2 sm:inline-block"
        onClick={onMoveUp}
        disabled={isFirst}
      >
        <ArrowUp />
      </Button>
      <Button
        variant="ghost"
        className="p-2 sm:inline-block"
        onClick={onMoveDown}
        disabled={isLast}
      >
        <ArrowBottom />
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="p-2 sm:inline-block">
            <MenuDots />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[350px] flex-col p-4">
          <DropdownMenuItem>
            <p className="text-m-base font-medium text-gray-100">Вопрос № {index + 1}</p>
          </DropdownMenuItem>
          <DropdownMenuItem className="mt-4 flex" onSelect={onMoveToStart} disabled={isFirst}>
            <ArrowUp size="s" className="fill-gray-80" />
            <p className="text-m-base text-gray-80 ml-2 font-medium">Переместить в начало</p>
          </DropdownMenuItem>
          <DropdownMenuItem className="mt-4 flex" onSelect={onMoveToEnd} disabled={isLast}>
            <ArrowBottom size="s" className="fill-gray-80" />
            <p className="text-m-base text-gray-80 ml-2 font-medium">Переместить в конец</p>
          </DropdownMenuItem>
          <DropdownMenuItem className="mt-4 flex" onSelect={onDelete}>
            <Trash size="s" className="fill-gray-80" />
            <p className="text-m-base text-gray-80 ml-2 font-medium">Удалить</p>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  </div>
);
