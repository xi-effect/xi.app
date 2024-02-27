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
import { CommunityChannelCreate } from 'pkg.community.channel-create';

import Image from 'next/image';
import { driver } from 'driver.js';
import 'driver.js/dist/driver.css';
import { Modal, ModalContent, ModalTrigger } from '@xipkg/modal';
import { CommunitySettings } from 'pkg.community.settings';

const Avatar = () => {
  return (
    <div className="bg-green-0 flex h-8 w-8 flex-col items-center justify-center overflow-hidden rounded-[16px]">
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
      className={`flex h-12 flex-wrap px-2.5 py-2 md:w-[302px] ${
        inDropdown ? '' : 'mt-0 sm:mt-8'
      } hover:bg-gray-5 items-center rounded-xl transition-colors ease-in hover:cursor-pointer`}
    >
      <Avatar />
      <div className="ml-2 self-center text-[16px] font-semibold"> Иванова А. Г. </div>
      <div className="ml-auto flex h-4 w-4 flex-col items-center justify-center">
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
  const [isOpenCommunitySettings, setIsOpenCommunitySettings] = React.useState(false);

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
              'Это краткое руководство поможет вам ознакомиться с возможностями нашей платформы',
          },
        },
        {
          element: '#community-profile',
          popover: {
            title: 'Профиль сообщества',
            description:
              'Сообщество - цифровой хаб, построенный вокруг преподавателя или организации. Открыв меню, вы можете получить доступ к настройкам сообщества, системе приглашений, созданию сервисов',
          },
        },
        {
          element: '#community-services',
          popover: {
            title: 'Сервисы сообщества',
            description:
              'В рамках сообщества репетитор может создавать и настраивать необходимые ему модули - задания, чаты, видеоконференции, контент и т.д. ',
          },
        },
        {
          element: '#subitems-menu',
          popover: {
            title: 'Группировка сервисов',
            description:
              'Для удобства можно группировать сервисы и настраивать к ним доступ по ролям, предметам или, например, уровню владения языком',
          },
        },
        {
          element: '#video-item-menu',
          popover: {
            title: 'Сервис Видеоконференции',
            description:
              'Нажав на данный пункт меню можно присоединиться к видеоконференции или создать новую',
          },
        },
        {
          element: '#user-profile-menu',
          popover: {
            title: 'Профиль пользователя',
            description:
              'Нажав на профиль, пользователь открывает панель настроек - данные аккаунта, кастомизация, настройка микрофона, вебкамеры и т.д.',
          },
        },
        {
          element: '#notification-menu',
          popover: {
            title: 'Уведомления',
            description:
              'Сюда приходят уведомления со всех сервисов, напоминания о занятиях, результатах тестов и многом другом',
          },
        },
      ],
      nextBtnText: 'Вперёд',
      prevBtnText: 'Назад',
      doneBtnText: 'Завершить',
      progressText: '{{current}} из {{total}}',
    });
    driverObj.drive();
  };

  const handleClose = () => setIsOpen(false);

  return (
    <>
      <Modal
        open={isOpenCommunitySettings}
        onOpenChange={() => setIsOpenCommunitySettings((prev) => !prev)}
      >
        <ModalContent variant="full" className="p-4 lg:p-6">
          <CommunitySettings />
        </ModalContent>
      </Modal>
      <DropdownMenu open={isOpen}>
        <DropdownMenuTrigger asChild>
          <div>
            <DropdownHeader setIsOpen={setIsOpen} />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          onInteractOutside={handleClose}
          className="relative right-[1px] top-[-57px] w-[calc(100vw-22px)] sm:w-[312px]"
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
            <DropdownMenuItem
              onClick={() => {
                setIsOpenCommunitySettings(true);
                handleClose();
              }}
              className="group sm:w-[302px]"
            >
              <span>Настройки сообщества</span>
              <Settings size="s" className="ml-auto h-4 w-4 group-hover:fill-gray-100" />
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="group sm:w-[302px]">
              <CommunityChannelCreate>
                <span>Создать канал</span>
                <ChannelAdd size="s" className="ml-auto h-4 w-4 group-hover:fill-gray-100" />
              </CommunityChannelCreate>
            </DropdownMenuItem>
            <DropdownMenuItem className="group sm:w-[302px]">
              <span>Создать категорию</span>
              <CategoryAdd size="s" className="ml-auto h-4 w-4 group-hover:fill-gray-100" />
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="group sm:w-[302px]" error>
              <span>Покинуть сообщество</span>
              <Exit size="s" className="fill-red-40 group-hover:fill-red-80 ml-auto h-4 w-4" />
            </DropdownMenuItem>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
