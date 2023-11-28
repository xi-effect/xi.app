'use client';

import {
  CategoryAdd,
  ChannelAdd,
  ChevronSmallTop,
  Exit,
  PeopleInvite,
  Settings,
  Objects,
} from '@xipkg/icons';
import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@xipkg/dropdown';
import Image from 'next/image';
import { driver } from 'driver.js';
import 'driver.js/dist/driver.css';

const Avatar = () => {
  return (
    <div className="overflow-hidden bg-green-0 flex flex-col w-8 h-8 items-center justify-center rounded-[16px]">
      <Image
        style={{
          borderRadius: '50%',
        }}
        src="/assets/avatarrep.svg"
        width={32}
        height={32}
        alt="user avatar"
      />
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
      id="community-profile"
      onClick={() => setIsOpen((prev: boolean) => !prev)}
      className={`flex flex-wrap md:w-[302px] h-12 py-2 px-2.5 ${
        inDropdown ? '' : 'mt-0 sm:mt-8'
      } items-center rounded-xl hover:cursor-pointer hover:bg-gray-5 transition-colors ease-in`}
    >
      <Avatar />
      <div className="ml-2 text-[16px] font-semibold self-center"> Иванова А. Г. </div>
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

  const driverAction = () => {
    setIsOpen(false);
    const driverObj = driver({
      showProgress: true,
      steps: [
        {
          element: '#header-logo',
          popover: {
            title: 'Добро пожаловать!',
            description:
              'Это краткое обучение поможет вам ознакомиться с возможностями нашей платформы',
          },
        },
        {
          element: '#community-profile',
          popover: {
            title: 'Профиль сообщества',
            description: 'Visualize os detalhes do endereço e marque as casas nesta seção.',
          },
        },
        {
          element: '#community-services',
          popover: {
            title: 'Сервисы сообщества',
            description: 'Visualize os detalhes do endereço e marque as casas nesta seção.',
          },
        },
        {
          element: '#subitems-menu',
          popover: {
            title: 'Сервисы сообщества',
            description: 'Visualize os detalhes do endereço e marque as casas nesta seção.',
          },
        },
        {
          element: '#video-item-menu',
          popover: {
            title: 'Сервисы сообщества',
            description: 'Visualize os detalhes do endereço e marque as casas nesta seção.',
          },
        },
        {
          element: '#user-profile-menu',
          popover: {
            title: 'Профиль пользователя',
            description: 'Visualize os detalhes do endereço e marque as casas nesta seção.',
          },
        },
        {
          element: '#notification-menu',
          popover: {
            title: 'Уведомления',
            description: 'Visualize os detalhes do endereço e marque as casas nesta seção.',
          },
        }
      ],
      nextBtnText: 'Вперёд',
      prevBtnText: 'Назад',
      doneBtnText: 'Завершить',
      progressText: '{{current}} из {{total}}',
    });
    driverObj.drive();
  };

  return (
    <DropdownMenu open={isOpen}>
      <DropdownMenuTrigger asChild>
        <div>
          <DropdownHeader setIsOpen={setIsOpen} />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        onInteractOutside={() => setIsOpen(false)}
        className="w-[calc(100vw-22px)] sm:w-[312px] relative top-[-57px] right-[1px]"
      >
        <div className="bg-gray-5 rounded-lg">
          <DropdownHeader setIsOpen={setIsOpen} inDropdown />
          <DropdownMenuItem onClick={driverAction} className="group sm:w-[302px]">
            <span>Пройти обучение</span>
            <Objects size="s" className="ml-auto h-4 w-4 group-hover:fill-gray-100" />
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="group sm:w-[302px]">
            <span>Пригласить людей</span>
            <PeopleInvite size="s" className="ml-auto h-4 w-4 group-hover:fill-gray-100" />
          </DropdownMenuItem>
          <DropdownMenuItem className="group sm:w-[302px]">
            <span>Настройки сообщества</span>
            <Settings size="s" className="ml-auto h-4 w-4 group-hover:fill-gray-100" />
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="group sm:w-[302px]">
            <span>Создать канал</span>
            <ChannelAdd size="s" className="ml-auto h-4 w-4 group-hover:fill-gray-100" />
          </DropdownMenuItem>
          <DropdownMenuItem className="group sm:w-[302px]">
            <span>Создать категорию</span>
            <CategoryAdd size="s" className="ml-auto h-4 w-4 group-hover:fill-gray-100" />
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="group sm:w-[302px]" error>
            <span>Покинуть сообщество</span>
            <Exit size="s" className="ml-auto h-4 w-4 fill-red-40 group-hover:fill-red-80" />
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
