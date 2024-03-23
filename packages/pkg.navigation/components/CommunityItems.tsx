/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

'use client';

import { Announce, Calendar, Chat, Conference, Task, Updates } from '@xipkg/icons';
import { ReactNode } from 'react';
import { useRouter } from 'next/navigation';

type IconsDictT = {
  [key: string]: ReactNode;
};

const iconClassName = 'transition-colors ease-in group-hover:fill-brand-80';

const iconsDict: IconsDictT = {
  announce: <Announce className={iconClassName} />,
  calendar: <Calendar className={iconClassName} />,
  updates: <Updates className={iconClassName} />,
  task: <Task className={iconClassName} />,
  chat: <Chat className={iconClassName} />,
  camera: <Conference className={iconClassName} />,
};

const menuData = [
  {
    icon: 'announce',
    type: '',
    label: 'Объявления',
    link: '',
  },
  {
    icon: 'calendar',
    type: '',
    label: 'Календарь',
    link: '',
  },
  {
    elId: 'subitems-menu',
    title: 'B1.2',
    subtitle: 'Intermediate',
  },
  {
    icon: 'announce',
    type: '',
    label: 'Объявления',
    link: '/community/1/announce/1',
  },
  {
    icon: 'task',
    type: '',
    label: 'Задания',
    link: '/community/1/task/1',
  },
  {
    icon: 'chat',
    type: '',
    label: 'Чат',
    link: '/community/1/chat/1',
  },
  {
    elId: 'video-item-menu',
    icon: 'camera',
    type: '',
    label: 'Видеоконференция',
    link: '/community/1/videoconference/1',
  },
  {
    title: 'B2',
    subtitle: 'Upper-intermediate',
  },
  {
    icon: 'announce',
    type: '',
    label: 'Объявления',
    link: '',
  },
  {
    elId: 'chat-item-menu',
    icon: 'task',
    type: '',
    label: 'Задания',
    link: '/community/1/task/1',
  },
  {
    icon: 'chat',
    type: '',
    label: 'Чат',
    link: '',
  },
  {
    icon: 'camera',
    type: '',
    label: 'Видеоконференция',
    link: '',
  },
];

const Item = ({ index, item, setSlideIndex }: any) => {
  const router = useRouter();

  const handleRouteChange = () => {
    setSlideIndex(1);
    router.push(item.link);
  };

  if (item.title) {
    return (
      <div
        id={item?.elId}
        className="text-gray-90 group mt-8 flex w-full flex-col items-start rounded-lg p-2"
        key={index.toString()}
      >
        <span className="text-[16px] font-semibold">{item.title}</span>
        <span className="text-[14px] font-normal">{item.subtitle}</span>
      </div>
    );
  }

  return (
    <li
      id={item?.elId}
      className="text-gray-90 hover:bg-brand-0 hover:text-brand-80 group flex h-[40px] w-full flex-row items-center rounded-lg p-2 transition-colors ease-in hover:cursor-pointer"
      key={index.toString()}
      onClick={handleRouteChange}
    >
      {iconsDict[item.icon]}
      <span className="pl-2 text-[14px] font-normal">{item.label}</span>
    </li>
  );
};

type ItemPropsT = {
  setSlideIndex: (value: number) => void;
  className?: string;
};

export const CommunityItems = ({ className, setSlideIndex }: ItemPropsT) => (
  <ul
    id="community-services"
    className={`mt-3 flex h-[calc(100dvh-128px)] flex-col gap-1 overflow-y-auto px-5 sm:mb-[60px] sm:px-1 ${
      className ?? ''
    }`}
  >
    {menuData.map((item, index) => (
      <Item item={item} index={index} key={index} setSlideIndex={setSlideIndex} />
    ))}
  </ul>
);
