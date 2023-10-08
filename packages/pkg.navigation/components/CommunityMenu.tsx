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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@xipkg/dropdown';

const Avatar = () => {
  return (
    <div className="overflow-hidden bg-green-0 flex flex-col w-8 h-8 items-center justify-center rounded-[16px]">
      <div className="text-center text-[12px] font-semibold leading-[16px] text-green-100">МП</div>
    </div>
  );
};

const DropdownHeader = ({
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
      <Avatar />
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

export const CommunityMenu = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <DropdownMenu open={isOpen}>
      <DropdownMenuTrigger asChild>
        <div>
          <DropdownHeader setIsOpen={setIsOpen} />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        onInteractOutside={() => setIsOpen(false)}
        className="w-[314px] relative top-[-58px]"
      >
        <div className="bg-gray-5 rounded-lg">
          <DropdownHeader setIsOpen={setIsOpen} inDropdown />
          <DropdownMenuItem>
            <span>Пригласить людей</span>
            <PeopleInvite size="s" className="ml-auto h-4 w-4" />
          </DropdownMenuItem>
          <DropdownMenuItem>
            <span>Настройки сообщества</span>
            <Settings size="s" className="ml-auto h-4 w-4" />
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <span>Создать канал</span>
            <ChannelAdd size="s" className="ml-auto h-4 w-4" />
          </DropdownMenuItem>
          <DropdownMenuItem>
            <span>Создать категорию</span>
            <CategoryAdd size="s" className="ml-auto h-4 w-4" />
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem error>
            <span>Покинуть сообщество</span>
            <Exit size="s" className="ml-auto h-4 w-4 fill-red-40" />
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
