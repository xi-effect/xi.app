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

const iconsDict: IconsDictT = {
  announce: <Announce />,
  calendar: <Calendar />,
  updates: <Updates />,
  task: <Task />,
  chat: <Chat />,
  camera: <Camera />,
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

export const CommunityItems = () => {
  return (
    <div className="flex flex-col mb-[100px] mt-3 px-1 gap-1 overflow-y-auto">
      {menuData.map((item, index) => (
        <div
          onClick={() => toast(`Нажатие на ${item.label}`)}
          className="h-[40px] w-[294px] p-2 flex flex-row items-center rounded-lg text-gray-90 hover:bg-brand-0 hover:text-brand-80 hover:cursor-pointer"
          key={index.toString()}
        >
          {iconsDict[item.icon]}
          <span className="text-[14px] font-normal pl-2">{item.label}</span>
        </div>
      ))}
    </div>
  );
};
