import React from 'react';

import { SimpleAnswer, LongAnswer } from '@xipkg/icons';
import { Button } from '@xipkg/button';
import { TaskType } from '../typesTask';

type FooterCreateTaskPropsT = {
  onAddTask: (taskType: TaskType) => void;
};

export const FooterCreateTask = ({ onAddTask }: FooterCreateTaskPropsT) => (
  <div className="mt-16 flex self-center max-2xl:flex-col">
    Добавить вопрос:
    <div className="ml-8 flex gap-2 max-2xl:ml-0 max-2xl:flex-col max-2xl:items-start">
      <Button
        size="s"
        variant="ghost"
        className="p-1.5 max-2xl:mt-1 max-2xl:pl-0"
        onClick={() => onAddTask('simple')}
      >
        <SimpleAnswer className="fill-gray-100" />
        <span className="ml-2 max-2xl:ml-0">Простой ответ</span>
      </Button>
      <Button size="s" variant="ghost" className="p-1.5 max-2xl:pl-0">
        <LongAnswer className="fill-gray-100" />
        <span className="ml-2 max-2xl:ml-0">Развёрнутый ответ</span>
      </Button>
      <Button size="s" variant="ghost" className="p-1.5 max-2xl:pl-0">
        <LongAnswer className="fill-gray-100" />
        <span className="ml-2 max-2xl:ml-0">Выбор варианта</span>
      </Button>
    </div>
  </div>
);
