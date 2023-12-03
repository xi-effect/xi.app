import React from 'react';
import { Camera } from '@xipkg/icons';

export const Main = () => {
  return (
    <div className="h-[120px] w-full p-6 border border-gray-80 rounded-2xl flex">
      <button className="h-[72px] w-[72px] rounded-[36px] bg-gray-5 flex justify-center place-items-center">
        <Camera size="l" className="fill-gray-60" />
      </button>
      <div className="flex flex-col justify-center gap-0.5 ml-4">
        <span className="text-2xl font-semibold leading-[32px]">Анна Иванова</span>
        <span className="text-[16px] leading-[22px] text-gray-80">ivanova.a</span>
      </div>
    </div>
  );
};
