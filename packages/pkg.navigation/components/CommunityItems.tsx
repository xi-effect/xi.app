'use client';

import {
  CategoryAdd,
  ChannelAdd,
  ChevronSmallTop,
  Exit,
  PeopleInvite,
  Settings,
} from '@xipkg/icons';
import React from 'react';

const menuData = [
    {
        type: '',
        label: '',
    }
]

export const CommunityItems = ({
  setIsOpen,
  inDropdown = false,
}: {
  setIsOpen: any;
  inDropdown?: boolean;
}) => {
  return (
    <div
      onClick={() => setIsOpen((prev: boolean) => !prev)}
      className={`flex flex-wrap w-full h-12 p-2 ${
        inDropdown ? '' : 'mt-8'
      } items-center rounded-xl hover:cursor-pointer hover:bg-gray-5 transition-colors ease-in`}
    >
      {/* <Avatar /> */}
      <div className="ml-2 text-[16px] font-semibold self-center"> Мое пространство </div>
      <div className="ml-auto flex flex-col items-center justify-center w-4 h-4">
        <ChevronSmallTop
          size="s"
          className={`transition-transform ease-in ${inDropdown ? '' : 'rotate-180'}`}
        />
      </div>
    </div>
  );
};
