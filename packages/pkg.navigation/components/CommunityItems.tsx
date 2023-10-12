'use client';

import {
  Announce,
  Calendar,
  Camera,
  CategoryAdd,
  ChannelAdd,
  Chat,
  ChevronSmallTop,
  Exit,
  PeopleInvite,
  Settings,
  Task,
  Updates,
} from '@xipkg/icons';
import { ReactNode } from 'react';
import { toast } from 'sonner';

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
  camera: <Camera className={iconClassName} />,
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
    icon: 'updates',
    type: '',
    label: 'Обновления',
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
    label: 'Чат со студентами',
    link: '',
  },
  {
    icon: 'camera',
    type: '',
    label: 'Видеоконференция',
    link: '',
  },
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
    icon: 'updates',
    type: '',
    label: 'Обновления',
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
    label: 'Чат со студентами',
    link: '',
  },
  {
    icon: 'camera',
    type: '',
    label: 'Видеоконференция',
    link: '',
  },
];

export const CommunityItems = ({ className }: { className?: string }) => {
  return (
    <div className={`flex flex-col mb-[100px] mt-3 px-1 gap-1 overflow-y-auto ${className}`}>
      {menuData.map((item, index) => (
        <div
          onClick={() => toast(`Нажатие на ${item.label}`)}
          className="group h-[40px] w-full p-2 flex flex-row items-center rounded-lg text-gray-90 transition-colors ease-in hover:bg-brand-0 hover:text-brand-80 hover:cursor-pointer"
          key={index.toString()}
        >
          {iconsDict[item.icon]}
          <span className="text-[14px] font-normal pl-2">{item.label}</span>
        </div>
      ))}
    </div>
  );
};
