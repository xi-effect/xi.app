import React from 'react';

import { SimpleAnswer, LongAnswer } from '@xipkg/icons';
import { Button } from '@xipkg/button';
import { TaskType } from '../typesTask';

type FooterCreateTaskPropsT = {
  onAddTask: (taskType: TaskType) => void;
};

export const FooterCreateTask = ({ onAddTask }: FooterCreateTaskPropsT) => (
  <div className="mt-16 flex self-center max-[1000px]:flex-col">
    Добавить вопрос:
    <div className="ml-8 flex gap-2 max-[1000px]:ml-0 max-[1000px]:flex-col max-[1000px]:items-start">
      <Button
        size="s"
        variant="ghost"
        className="p-1.5 max-[1000px]:mt-1 max-[1000px]:pl-0"
        onClick={() => onAddTask('simple')}
      >
        <SimpleAnswer className="fill-gray-100" />
        <span className="ml-2 max-[1000px]:ml-0">Простой ответ</span>
      </Button>
      <Button size="s" variant="ghost" className="p-1.5 max-[1000px]:pl-0">
        <LongAnswer className="fill-gray-100" />
        <span className="ml-2 max-[1000px]:ml-0">Развёрнутый ответ</span>
      </Button>
      <Button size="s" variant="ghost" className="p-1.5 max-[1000px]:pl-0">
        <LongAnswer className="fill-gray-100" />
        <span className="ml-2 max-[1000px]:ml-0">Выбор варианта</span>
      </Button>
    </div>
  </div>
);
