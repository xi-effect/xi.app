import React from 'react';
import { Camera } from '@xipkg/icons';

export const Main = () => {
  return (
    <>
      <div className="border-gray-80 flex h-[120px] w-full rounded-2xl border p-6">
        <button className="bg-gray-5 flex h-[72px] w-[72px] place-items-center justify-center rounded-[36px]">
          <Camera size="l" className="fill-gray-60" />
        </button>
        <div className="ml-4 flex flex-col justify-center gap-0.5">
          <span className="text-2xl font-semibold leading-[32px]">Анна Иванова</span>
          <span className="text-gray-80 text-[16px] leading-[22px]">ivanova.a</span>
        </div>
      </div>
    </>
  );
};
