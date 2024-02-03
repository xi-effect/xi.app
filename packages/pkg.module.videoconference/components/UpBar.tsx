'use client';

import React from 'react';
import { Grid, Settings, External } from '@xipkg/icons';

export const UpBar = () => {
  return (
    <div className="p-4 w-full flex flex-row items-end">
      <span className="text-2xl font-semibold text-gray-0">B1.2</span>
      <span className="ml-2 text-gray-40">Upper-intermediate</span>

      <button className="h-10 w-[95px] rounded-[20px] bg-gray-100 flex flex-row items-center justify-center gap-2 ml-auto">
        <Grid className="fill-gray-0" />
        <span className="text-gray-0">Вид</span>
      </button>
      {/* <button className="h-10 w-10 rounded-[20px] bg-gray-100 flex flex-row items-center justify-center ml-auto">
          <Maximaze className="fill-gray-0" />
        </button> */}
      <button className="h-10 w-10 rounded-[20px] bg-gray-100 flex flex-row items-center justify-center ml-2">
        <External className="fill-gray-0" />
      </button>
      <button className="h-10 w-10 rounded-[20px] bg-gray-100 flex flex-row items-center justify-center ml-2">
        <Settings className="fill-gray-0" />
      </button>
    </div>
  );
};
