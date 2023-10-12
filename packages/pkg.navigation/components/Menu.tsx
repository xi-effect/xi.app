import { UserProfile } from '@xipkg/userprofile';
import { toast } from 'sonner';
import { Notification } from '@xipkg/icons';
import React from 'react';

import { CommunityItems, CommunityMenu } from './';

import Image from 'next/image';

export const Menu = () => {
  return (
    <>
      <div className="flex flex-wrap w-fit h-8 p-2">
        <Image src="/assets/brand/navigationlogo.svg" alt="xieffect logo" width={134} height={16} />
      </div>
      <CommunityMenu />
      <CommunityItems />
      <div className="fixed bottom-0 pb-6 flex flex-col bg-gray-0">
        <div
          onClick={() => toast('Открыть настойки пользователя')}
          className="w-full h-[48px] p-2 rounded-lg hover:cursor-pointer hover:bg-gray-5"
        >
          <UserProfile src="/test/avatar.png" text="Ivan Kovylyaev" label="@ikovylyaev" size="m" />
        </div>
        <div
          onClick={() => toast(`Уведомления пока в разработке`)}
          className="group h-[40px] w-full p-2 mx-1 mt-2 flex flex-row items-center rounded-lg text-gray-90 transition-colors ease-in hover:bg-brand-0 hover:text-brand-80 hover:cursor-pointer"
        >
          <Notification className="transition-colors ease-in group-hover:fill-brand-80" />
          <span className="text-[14px] font-normal pl-2">Уведомления</span>
        </div>
      </div>
    </>
  );
};
