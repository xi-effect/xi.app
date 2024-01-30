'use client';

import { Announce, Calendar, Chat, Conference, Task, Updates } from '@xipkg/icons';
import { ReactNode } from 'react';
import { toast } from 'sonner';
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
    link: '',
  },
  {
    icon: 'task',
    type: '',
    label: 'Задания',
    link: '',
  },
  {
    icon: 'chat',
    type: '',
    label: 'Чат',
    link: '',
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
    link: '',
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

const Item = ({ index, item }: any) => {
  const router = useRouter();

  const handleRouteChange = () => {
    router.push(item.link);
  };

  if (!!item.title)
    return (
      <div
        id={item?.elId}
        className="group w-full p-2 mt-8 flex flex-col items-start rounded-lg text-gray-90"
        key={index.toString()}
      >
        <span className="text-[16px] font-semibold">{item.title}</span>
        <span className="text-[14px] font-normal">{item.subtitle}</span>
      </div>
    );

  return (
    <div
      id={item?.elId}
      className="group h-[40px] w-full p-2 flex flex-row items-center rounded-lg text-gray-90 transition-colors ease-in hover:bg-brand-0 hover:text-brand-80 hover:cursor-pointer"
      key={index.toString()}
      onClick={handleRouteChange}
    >
      {iconsDict[item.icon]}
      <span className="text-[14px] font-normal pl-2">{item.label}</span>
    </div>
  );
};

export const CommunityItems = ({ className }: { className?: string }) => {
  return (
    <div
      id="community-services"
      className={`flex flex-col h-[calc(100dvh-128px)] sm:mb-[100px] mt-3 px-5 sm:px-1 gap-1 overflow-y-auto ${
        className ?? ''
      }`}
    >
      {menuData.map((item, index) => (
        <Item item={item} index={index} key={index} />
      ))}
    </div>
  );
};
