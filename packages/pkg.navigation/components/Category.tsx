'use client';

import React from 'react';
import { Channel } from './Channel';
import type { ChannelT } from './Channel';

type CategoryT = {
  channels: ChannelT[];
  title: string;
  subtitle: string;
};

export const Category = ({ channels, title, subtitle }: CategoryT) => {
  console.log('channel', channels);

  return (
    <>
      <div className="text-gray-90 group mt-8 flex w-full flex-col items-start rounded-lg p-2">
        <span className="text-[16px] font-semibold">{title}</span>
        <span className="text-[14px] font-normal">{subtitle}</span>
      </div>
      {channels.map((item) => {
        console.log('item', item);

        return <Channel key={item.elId} {...item} />;
      })}
    </>
  );
};
