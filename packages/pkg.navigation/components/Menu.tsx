'use client';

import { UserProfile } from '@xipkg/userprofile';
import { Modal, ModalContent, ModalTrigger } from '@xipkg/modal';
import { UserSettings } from 'pkg.user.settings';
import { createQueryString } from 'pkg.router.url';
import { Logo } from 'pkg.logo';
import { useMainSt } from 'pkg.stores';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Close, Objects } from '@xipkg/icons';
import { Button } from '@xipkg/button';
import { driver } from 'driver.js';
import 'driver.js/dist/driver.css';
import '../utils/driver.scss';
import { CommunityMenu } from './CommunityMenu';
import { CommunityItems } from './CommunityItems';
import ReactDOM from 'react-dom';

type MenuT = {
  setSlideIndex: (value: number) => void;
  onExit: () => void;
};

export const Menu = ({ onExit, setSlideIndex }: MenuT) => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const user = useMainSt((state) => state.user);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const profileIsOpenValue: string | null = searchParams.get('profileIsOpen');

  useEffect(() => {
    const profileIsOpen = searchParams.has('profileIsOpen');
    setMenuIsOpen(profileIsOpen);
  }, [searchParams]);
  type PopoverDOM = {
    closeButton: HTMLElement;
  };

  const driverAction = () => {
    const driverObj = driver({
      popoverClass: 'my-custom-popover-class',
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
          element: '#community-profile',
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
      onPopoverRender: (popover, opts) => {
        const defaultCloseButton = popover.closeButton;
        const customCloseButton = document.createElement('button');
        customCloseButton.className = 'driver-popover-close-btn';
        ReactDOM.render(<Close className="h-[16px] w-[16px]" />, customCloseButton);
        defaultCloseButton.replaceWith(customCloseButton);
        customCloseButton.addEventListener('click', () => {
          driverObj.destroy();
        });
      },
      nextBtnText: 'Вперёд',
      prevBtnText: 'Назад',
      doneBtnText: 'Завершить',
      progressText: '{{current}} из {{total}}',
    });
    driverObj.drive();
  };

  return (
    <>
      <div id="header-logo" className="flex h-8 w-fit flex-wrap p-2">
        <Logo height={16} width={134} logoVariant="navigation" logoSize="default" />
      </div>
      <CommunityMenu />
      <CommunityItems setSlideIndex={setSlideIndex} />
      <div className="bg-gray-0 fixed bottom-0 flex flex-col pb-6 sm:w-[302px]">
        <Modal open={menuIsOpen}>
          <ModalTrigger
            onClick={() => {
              setMenuIsOpen(true);
              router.push(
                `${pathname}?${createQueryString(searchParams, 'profileIsOpen', profileIsOpenValue ? String(profileIsOpenValue) : 'true')}&${createQueryString(searchParams, 'category', 'home')}`,
              );
            }}
            asChild
          >
            <div
              id="user-profile-menu"
              className="hover:bg-gray-5 h-[48px] w-full rounded-lg p-2 hover:cursor-pointer"
            >
              <UserProfile
                userId={user.id}
                text={user.displayName}
                label={user.username}
                size="m"
              />
            </div>
          </ModalTrigger>
          <ModalContent variant="full" className="p-4 lg:p-6">
            <UserSettings onExit={onExit} />
          </ModalContent>
        </Modal>
        <Button
          variant="ghost"
          type="button"
          onClick={() => driverAction()}
          className="hover:bg-gray-5 mt-1 flex h-[48px] w-full flex-row items-center justify-start rounded-lg p-2 pl-4 hover:cursor-pointer"
        >
          <Objects size="s" className="h-4 w-4 group-hover:fill-gray-100" />
          <span className="pl-2 text-[14px] font-normal">Пройти обучение</span>
        </Button>
        {/* <div
          id="notification-menu"
          onClick={() => toast(`Уведомления пока в разработке`)}
          className="text-gray-90 hover:bg-brand-0 hover:text-brand-80
          group mx-1 mt-2 flex h-[40px] w-full flex-row items-center
          rounded-lg p-2 transition-colors
          ease-in hover:cursor-pointer"
        >
          <Notification className="group-hover:fill-brand-80 transition-colors ease-in" />
          <span className="pl-2 text-[14px] font-normal">Уведомления</span>
        </div> */}
      </div>
    </>
  );
};
