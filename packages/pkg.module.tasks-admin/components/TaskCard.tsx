import React from 'react';
import { Edit, Eyeon, Task, TaskFile, Trash } from '@xipkg/icons';
import { Button } from '@xipkg/button';
import { TaskCardT, TaskCardActionsT } from '../types';

type TaskCardPropsT = TaskCardT & TaskCardActionsT;

export const TaskCard = ({
  type,
  id,
  name,
  creationDate,
  openingDate,
  closingDate,
  onDelete,
}: TaskCardPropsT) => (
  <div className="border-gray-10 flex items-center justify-end rounded-2xl border px-6 py-4">
    <div className="flex items-center gap-4">
      <div className="bg-brand-0 rounded-full p-2">
        {type === 'test' && <Task className="fill-brand-80" />}
        {type === 'task' && <TaskFile className="fill-brand-80" />}
      </div>
      <p className="max-w-48 overflow-hidden text-ellipsis whitespace-nowrap text-xl font-semibold">
        {name}
      </p>
    </div>
    <div className="ml-auto flex gap-8">
      <div className="text-gray-80 gap-8 text-center text-xs xl:flex [@media(max-width:1024px)]:hidden">
        <div className="flex flex-col">
          <div className="text-xl font-medium">
            {creationDate.toLocaleDateString('ru-RU', {
              day: '2-digit',
              month: '2-digit',
              year: '2-digit',
            })}
          </div>
          <span>Дата создания</span>
        </div>
        <div className="flex flex-col">
          <div className="text-xl font-medium">
            {openingDate.toLocaleDateString('ru-RU', {
              day: '2-digit',
              month: '2-digit',
              year: '2-digit',
            })}
          </div>
          <span>Дата открытия</span>
        </div>
        <div className="flex flex-col">
          <div className="text-xl font-medium">
            {closingDate.toLocaleDateString('ru-RU', {
              day: '2-digit',
              month: '2-digit',
              year: '2-digit',
            })}
          </div>
          <span>Дата закрытия</span>
        </div>
      </div>
      <div className="gap-10 text-center text-xs xl:flex [@media(max-width:1024px)]:hidden">
        <div className="flex flex-col">
          <div className="flex items-start justify-start gap-0.5 text-xl">
            10 <span className="text-gray-40 text-xs leading-5">69%</span>
          </div>
          <span>Ответов</span>
        </div>

        <div className="flex flex-col">
          <div className="flex items-start justify-start gap-0.5 text-xl">
            10 <span className="text-gray-40 text-xs leading-5">100%</span>
          </div>
          <span>Не проверено</span>
        </div>
      </div>
      <div className="flex items-center gap-1">
        <Button
          size="s"
          variant="ghost"
          className="p-1.5 sm:inline-block [@media(max-width:425px)]:hidden"
        >
          <Edit />
        </Button>
        <Button variant="ghost" className="p-1.5" size="s">
          <Eyeon />
        </Button>
        <Button
          size="s"
          variant="ghost"
          className="p-1.5 sm:inline-block [@media(max-width:425px)]:hidden"
          onClick={() => onDelete(id)}
        >
          <Trash />
        </Button>
      </div>
    </div>
  </div>
);
