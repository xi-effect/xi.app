import React from 'react';
import { Button } from '@xipkg/button';
import { Task, TaskFile } from '@xipkg/icons';

export const EmptyTasksList = () => (
  <div className="flex h-full flex-col items-center justify-center gap-8">
    <div className="flex flex-col gap-4 text-[44px]">
      <div className="flex justify-center">
        <div className="bg-brand-0 rounded-full p-6">
          <Task className="fill-brand-80 h-[80px] w-[80px]" width={80} height={80} />
        </div>
      </div>
      <span>Заданий пока нет</span>
    </div>
    <div className="flex gap-8">
      <Button size="m" className="flex gap-2 pl-3 pr-4 leading-5">
        <TaskFile className="fill-white" />
        Создать задание
      </Button>

      <Button variant="secondary" size="m" className="flex gap-2 pl-3 pr-4 leading-5">
        <Task />
        Создать тест
      </Button>
    </div>
  </div>
);
