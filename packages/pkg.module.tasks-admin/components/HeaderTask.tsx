import React from 'react';

import {
  DoubleBottomArrows,
  DoubleUpArrows,
  ArrowUp,
  ArrowBottom,
  SimpleAnswertTest,
  DetailedAnswerTest,
  OptionSelectionTest,
  MenuDots,
  Trash,
} from '@xipkg/icons';
import { Button } from '@xipkg/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from '@xipkg/dropdown';

import { useTaskSt } from '../store/tasksStore';

type HeaderTaskT = {
  type: 'simple' | 'detailed' | 'multiple';
  index: number;
  taskId: number;
};

const iconType = {
  simple: <SimpleAnswertTest className="fill-brand-80" />,
  detailed: <DetailedAnswerTest className="fill-brand-80" />,
  multiple: <OptionSelectionTest className="fill-brand-80" />,
};

const headerType = {
  simple: 'Простой ответ',
  detailed: 'Развёрнутый ответ',
  multiple: 'Выбор варианта',
};

export const HeaderTask = ({ type, index, taskId }: HeaderTaskT) => {
  const { moveTaskUp, moveTaskDown, moveTaskToStart, moveTaskToEnd, deleteTask, tasks } =
    useTaskSt();

  const isFirst = index === 0;
  const isLast = index === tasks.length - 1;

  return (
    <div className="flex justify-between">
      <div className="flex items-center">
        <div className="bg-brand-0 rounded-full p-2">{iconType[type] || iconType.simple}</div>
        <p className="text-m-base pl-4 font-medium">{headerType[type] || headerType.simple}</p>
      </div>

      <div>
        <Button
          variant="ghost"
          className="p-2 sm:inline-block"
          onClick={() => moveTaskUp(taskId)}
          disabled={isFirst}
        >
          <ArrowUp />
        </Button>
        <Button
          variant="ghost"
          className="p-2 sm:inline-block"
          onClick={() => moveTaskDown(taskId)}
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
          <DropdownMenuContent className="w-[350px] flex-col px-3 py-4 drop-shadow">
            <DropdownMenuLabel>
              <p className="text-m-base mt-1 pl-1 font-medium text-gray-100">
                Вопрос № {index + 1}
              </p>
            </DropdownMenuLabel>
            <DropdownMenuItem
              className="mt-4"
              onSelect={() => moveTaskToStart(taskId)}
              disabled={isFirst}
              asChild
            >
              <Button variant="ghost" className="h-[40px] w-full justify-start pl-2">
                <DoubleUpArrows className="fill-gray-80 h-6 w-6" />
                <span className="text-m-base text-gray-80 ml-2 font-medium">
                  Переместить в начало
                </span>
              </Button>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="mt-5"
              onSelect={() => moveTaskToEnd(taskId)}
              disabled={isLast}
              asChild
            >
              <Button variant="ghost" className="h-[40px] w-full justify-start pl-2">
                <DoubleBottomArrows className="fill-gray-80 h-6 w-6" />
                <span className="text-m-base text-gray-80 ml-2 font-medium">
                  Переместить в конец
                </span>
              </Button>
            </DropdownMenuItem>
            <DropdownMenuItem className="mt-5" onSelect={() => deleteTask(taskId)} asChild>
              <Button variant="ghost" className="h-[40px] w-full justify-start pl-2">
                <Trash className="fill-gray-80 h-6 w-6" />
                <span className="text-m-base text-gray-80 ml-2 font-medium">Удалить</span>
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
