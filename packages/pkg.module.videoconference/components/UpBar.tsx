

'use client';

import React from 'react';
import { Grid, Settings, External } from '@xipkg/icons';

export const UpBar = () => (
  <div className="flex w-full flex-row items-end p-4">
    <span className="text-gray-0 text-2xl font-semibold">B1.2</span>
    <span className="text-gray-40 ml-2">Upper-intermediate</span>

    <button
      type="button"
      className="ml-auto flex h-10 w-[95px] flex-row items-center justify-center gap-2 rounded-[20px] bg-gray-100"
    >
      <Grid className="fill-gray-0" />
      <span className="text-gray-0">Вид</span>
    </button>
    <button
      type="button"
      className="ml-2 flex h-10 w-10 flex-row items-center justify-center rounded-[20px] bg-gray-100"
    >
      <External className="fill-gray-0" />
    </button>
    <button
      type="button"
      className="ml-2 flex h-10 w-10 flex-row items-center justify-center rounded-[20px] bg-gray-100"
    >
      <Settings className="fill-gray-0" />
    </button>
  </div>
);
