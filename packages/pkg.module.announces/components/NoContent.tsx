import React from 'react';
import { Announce } from '@xipkg/icons';

const NoContent = () => (
  <div className="flex h-full flex-col items-center justify-center">
    <div className="bg-brand-0 flex h-24 w-24 items-center justify-center rounded-full p-4 sm:h-32 sm:w-32">
      <Announce className="fill-brand-80 h-12 w-12 sm:h-20 sm:w-20" />
    </div>
    <h2 className="mt-4 text-[28px] font-semibold leading-[36px] sm:text-4xl sm:leading-[44px]">
      Объявлений пока нет
    </h2>
  </div>
);

export default NoContent;
