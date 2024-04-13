/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

'use client';

import { Announce, Calendar, Chat, Conference, Task, Updates } from '@xipkg/icons';
import { ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import {
  DndContext,
  useSensors,
  useSensor,
  MouseSensor,
  TouchSensor,
  KeyboardSensor,
} from '@dnd-kit/core';

import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { coordinateGetter } from '../utils/multipleContainersKeyboardCoordinates';

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
    elId: '1',
    icon: 'announce',
    type: 'announce',
    label: 'Объявления',
    link: '',
  },
  {
    elId: '2',
    icon: 'calendar',
    type: 'calendar',
    label: 'Календарь',
    link: '',
  },
  {
    elId: '3',
    title: 'B1.2',
    subtitle: 'Intermediate',
    isCategory: true,
    channels: [
      {
        elId: '31',
        icon: 'announce',
        type: 'announce',
        label: 'Объявления',
        link: '/community/1/announce/1',
      },
      {
        elId: '32',
        icon: 'task',
        type: 'task',
        label: 'Задания',
        link: '/community/1/task/1',
      },
    ],
  },
  {
    elId: '4',
    icon: 'announce',
    type: 'announce',
    label: 'Объявления',
    link: '/community/1/announce/1',
  },
  {
    elId: '5',
    icon: 'task',
    type: 'task',
    label: 'Задания',
    link: '/community/1/task/1',
  },
  {
    elId: '6',
    icon: 'chat',
    type: 'chat',
    label: 'Чат',
    link: '/community/1/chat/1',
  },
  {
    elId: '7',
    icon: 'camera',
    type: 'videoconference',
    label: 'Видеоконференция',
    link: '/community/1/videoconference/1',
  },
  {
    elId: '8',
    title: 'B2',
    subtitle: 'Intermediate',
    isCategory: true,
    channels: [
      {
        elId: '81',
        icon: 'announce',
        type: '',
        label: 'Объявления',
        link: '/community/1/announce/1',
      },
      {
        elId: '82',
        icon: 'task',
        type: '',
        label: 'Задания',
        link: '/community/1/task/1',
      },
    ],
  },
  {
    elId: '9',
    icon: 'announce',
    type: 'announce',
    label: 'Объявления',
    link: '',
  },
  {
    elId: '10',
    icon: 'task',
    type: 'task',
    label: 'Задания',
    link: '/community/1/task/1',
  },
  {
    elId: '11',
    icon: 'chat',
    type: 'chat',
    label: 'Чат',
    link: '',
  },
  {
    elId: '12',
    icon: 'camera',
    type: 'videconference',
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

export const CommunityItems = ({ className, setSlideIndex }: ItemPropsT) => {
  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter,
    }),
  );

  return (
    <DndContext sensors={sensors}>
      <ul
        id="community-services"
        className={`mt-3 flex h-[calc(100dvh-128px)] flex-col gap-1 overflow-y-auto px-5 sm:mb-[60px] sm:px-1 ${
          className ?? ''
        }`}
      >
        <SortableContext
          items={[...menuData.map((item) => item.elId)]}
          strategy={verticalListSortingStrategy}
        >
          {menuData.map((item, index) => (
            <Item item={item} index={index} key={index} setSlideIndex={setSlideIndex} />
          ))}
        </SortableContext>
      </ul>
    </DndContext>
  );
};
