import React from 'react';

import { Breadcrumbs } from '@xipkg/breadcrumbs';
import Timer from './Timer';

type HeaderPropsT = {
  timer: boolean;
  setTimer: React.Dispatch<React.SetStateAction<boolean>>;
};

const breadcrumbs = [
  { name: 'Моё пространство', link: '/home' },
  { name: 'Задания', link: '/tasks' },
];

const Header = ({ timer, setTimer }: HeaderPropsT) => (
  <div className="flex flex-col gap-4 p-4 lg:p-8">
    <div>
      <Breadcrumbs breadcrumbs={breadcrumbs} size="s" />
    </div>
    <div className="flex justify-between gap-4 lg:flex-row lg:items-center">
      <h1 className="text-h5 max-[520px]:text-xl-base sm:text-xl-base w-[966px] flex-auto font-semibold sm:inline-block">
        Создание задания
      </h1>
      {timer && (
        <Timer
          durationSecs={60}
          getTitle={(t) => `При сохранении  возникла проблема. Повторное сохранение через ${t}`}
          onTimerEnd={() => setTimer(false)}
        />
      )}
    </div>
  </div>
);

export default Header;
