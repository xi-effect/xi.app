'use client';

/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import { Modal, ModalContent } from '@xipkg/modal';
import { CategoryCreate } from 'pkg.modal.category-create';
import { CommunitySettings } from 'pkg.community.settings';
import { AddCommunityModal } from 'pkg.module.add-community';
import { CommunityChannelCreate } from 'pkg.community.channel-create';
import { InviteCommunityModal } from 'pkg.modal.invite-community';

import {
  CategoryAdd,
  ChannelAdd,
  ChevronSmallTop,
  Exit,
  PeopleInvite,
  Settings,
  Objects,
  Plus,
} from '@xipkg/icons';
import React, { useEffect, useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@xipkg/dropdown';

import Link from 'next/link';
import Image from 'next/image';
import { driver } from 'driver.js';
import 'driver.js/dist/driver.css';
import { useParams } from 'next/navigation';

// Временный список мок-сообществ
const communitiesTemplate = [
  {
    name: 'Иванова А.Г.',
    avatar: '/assets/avatarrep.svg',
    id: '1',
    isOwner: true,
  },
  {
    name: 'Мое пространство',
    avatar: '/assets/avatarrep3.svg',
    id: '2',
    isOwner: false,
  },
  {
    name: 'Изучаем фронтенд',
    avatar: '/assets/avatarrep2.svg',
    id: '3',
    isOwner: false,
  },
];

type CommunityTemplateT = {
  name: string;
  avatar: string;
  id: string;
  isOwner: boolean;
};

const Avatar = ({ avatar }: { avatar: string }) => (
  <div className="bg-green-0 flex h-8 w-8 flex-col items-center justify-center overflow-hidden rounded-[16px]">
    <Image
      style={{
        borderRadius: '50%',
      }}
      src={avatar}
      width={32}
      height={32}
      alt="user avatar"
    />
  </div>
);

const DropdownHeader = ({
  setIsOpen,
  inDropdown = false,
  name,
  avatar,
}: {
  setIsOpen: any;
  inDropdown?: boolean;
  name: string;
  avatar: string;
}) => (
  <div
    id="community-profile"
    onClick={() => setIsOpen((prev: boolean) => !prev)}
    className={`flex h-12 flex-wrap px-2.5 py-2 md:w-[302px] ${
      inDropdown ? '' : 'mt-0 sm:mt-8'
    } hover:bg-gray-5 items-center rounded-xl transition-colors ease-in hover:cursor-pointer`}
  >
    <Avatar avatar={avatar} />
    <div className="ml-2 self-center text-[16px] font-semibold">{name}</div>
    <div className="ml-auto flex h-4 w-4 flex-col items-center justify-center">
      <ChevronSmallTop
        size="s"
        className={`transition-transform ease-in ${inDropdown ? '' : 'rotate-180'}`}
      />
    </div>
  </div>
);

const CommunityLink = ({
  community,
  handleClose,
}: {
  community: CommunityTemplateT;
  handleClose: () => void;
}) => (
  <Link
    href={{
      pathname: `/communities/${community.id}/home`,
    }}
    onClick={handleClose}
    className="hover:bg-gray-5 flex h-12 flex-wrap items-center rounded-xl px-2.5 py-2 transition-colors ease-in hover:cursor-pointer md:w-[300px]"
  >
    <Avatar avatar={community.avatar} />
    <div className="ml-2 self-center text-[16px] font-semibold">{community.name}</div>
  </Link>
);

export const CommunityMenu = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isOpenCommunitySettings, setIsOpenCommunitySettings] = React.useState(false);
  const [isInviteCommunityModalOpen, setIsInviteCommunityModalOpen] = React.useState(false);
  const [isAddCommunityModalOpen, setIsAddCommunityModalOpen] = React.useState(false);
  const [isCategoryCreateOpen, setIsCategoryCreateOpen] = React.useState(false);
  const [isCommunityChannelCreateOpen, setIsCommunityChannelCreateOpen] = React.useState(false);

  // Берем community-id из URL
  const params = useParams();
  // Делим все сообщества пользователя на то, на странице которого мы сейчас
  // и на остальные
  const [currentCommunity, setCurrentCommunity] = useState<CommunityTemplateT>();
  const [otherCommunities, setOtherCommunities] = useState<CommunityTemplateT[]>();

  useEffect(() => {
    const currentCommunity = communitiesTemplate.find(
      (community) => community.id === params['community-id'],
    );
    const otherCommunities = communitiesTemplate.filter((community) => community.id !== params['community-id']);
    setCurrentCommunity(currentCommunity);
    setOtherCommunities(otherCommunities);
  }, [params]);

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
      <CategoryCreate
        open={isCategoryCreateOpen}
        onOpenChange={() => setIsCategoryCreateOpen((prev) => !prev)}
      />
      <CommunityChannelCreate
        open={isCommunityChannelCreateOpen}
        onOpenChange={() => setIsCommunityChannelCreateOpen((prev) => !prev)}
      />
      <InviteCommunityModal
        open={isInviteCommunityModalOpen}
        onOpenChange={() => setIsInviteCommunityModalOpen((prev) => !prev)}
      />
      <DropdownMenu open={isOpen}>
        {currentCommunity && (
          <>
            <DropdownMenuTrigger asChild>
              <div>
                <DropdownHeader
                  setIsOpen={setIsOpen}
                  name={currentCommunity.name}
                  avatar={currentCommunity.avatar}
                />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              onInteractOutside={handleClose}
              className="relative right-[1px] top-[-57px] w-[calc(100vw-22px)] sm:w-[312px]"
            >
              <div className="bg-gray-5 rounded-lg">
                <DropdownHeader
                  setIsOpen={setIsOpen}
                  inDropdown
                  name={currentCommunity.name}
                  avatar={currentCommunity.avatar}
                />
                {currentCommunity.isOwner && (
                  <>
                    <DropdownMenuItem
                      onClick={driverAction}
                      className="group hidden sm:w-[302px] md:flex"
                    >
                      <span>Пройти обучение</span>
                      <Objects size="s" className="ml-auto h-4 w-4 group-hover:fill-gray-100" />
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="hidden md:flex" />
                    <DropdownMenuItem
                      className="group sm:w-[302px]"
                      onClick={() => setIsInviteCommunityModalOpen((prev) => !prev)}
                    >
                      <span>Пригласить людей</span>
                      <PeopleInvite
                        size="s"
                        className="ml-auto h-4 w-4 group-hover:fill-gray-100"
                      />
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
                    <DropdownMenuItem
                      className="group sm:w-[302px]"
                      onClick={() => setIsCommunityChannelCreateOpen((prev) => !prev)}
                    >
                      <span>Создать канал</span>
                      <ChannelAdd size="s" className="ml-auto h-4 w-4 group-hover:fill-gray-100" />
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="group sm:w-[302px]"
                      onClick={() => setIsCategoryCreateOpen((prev) => !prev)}
                    >
                      <span>Создать категорию</span>
                      <CategoryAdd size="s" className="ml-auto h-4 w-4 group-hover:fill-gray-100" />
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                  </>
                )}
                <DropdownMenuItem className="group sm:w-[302px]" error>
                  <span>Покинуть сообщество</span>
                  <Exit size="s" className="fill-red-40 group-hover:fill-red-80 ml-auto h-4 w-4" />
                </DropdownMenuItem>
              </div>
              {otherCommunities && (
                <div className="mt-2">
                  {otherCommunities.map((community, index) => (
                    <CommunityLink key={index} community={community} handleClose={handleClose} />
                  ))}
                </div>
              )}
              <DropdownMenuSeparator />
              <AddCommunityModal
                open={isAddCommunityModalOpen}
                onOpenChange={setIsAddCommunityModalOpen}
              >
                <DropdownMenuItem
                  className="group text-gray-50 sm:w-[302px]"
                  onClick={() => setIsAddCommunityModalOpen(true)}
                >
                  <span>Присоединиться к сообществу</span>

                  <Plus
                    size="s"
                    className="ml-auto h-4 w-4 fill-gray-50 group-hover:fill-gray-100"
                  />
                </DropdownMenuItem>
              </AddCommunityModal>
            </DropdownMenuContent>
          </>
        )}
      </DropdownMenu>
    </>
  );
};
