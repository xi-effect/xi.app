import { useState } from 'react';

import HeaderCreateTask from './components/HeaderCreateTask';
import { FormBlock } from './components/Form';

export const TasksCreate = () => {
  const [timer, setTimer] = useState(true);

  return (
    <div className="flex h-full flex-col md:h-[100dvh] lg:p-0">
      <HeaderCreateTask {...{ timer, setTimer }} />
      <div className="flex flex-col justify-between px-4 lg:flex-row lg:px-8">
        <div className="border-gray-30 flex h-[776px] w-full flex-col rounded-xl border pl-14 pt-14 lg:h-full lg:w-[966px] lg:flex-auto 2xl:border-none 2xl:pl-0 2xl:pt-0">
          <p className="text-h3 text-gray-30">Введите название</p>
          <p className="text-l-base text-gray-30 mt-4">Нажмите Tab для выбора инструмента</p>
        </div>
        <div className="mt-8 w-full lg:ml-8 lg:mt-0 lg:w-[508px] lg:flex-auto">
          <FormBlock {...{ timer }} />
        </div>
      </div>
    </div>
  );
};
