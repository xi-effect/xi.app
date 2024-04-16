/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

'use client';

import { Announce, Calendar, Chat, Conference, Task, Updates } from '@xipkg/icons';
import { ReactNode, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  DndContext,
  useSensors,
  useSensor,
  MouseSensor,
  TouchSensor,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
} from '@dnd-kit/core';
import { CSS } from "@dnd-kit/utilities";

import { arrayMove, sortableKeyboardCoordinates, useSortable } from "@dnd-kit/sortable";

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

const Item = ({ index, item , id,  setSlideIndex }: any) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };
  const router = useRouter();

  const handleRouteChange = () => {
    setSlideIndex(1);
    router.push(item.link);
  };

  if (item.title) {
    return (
      <div ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
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
    <li ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
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
  const [menu , setMenu ] = useState(menuData)
  
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  const getTaskPos = (id : string) => menu.findIndex((item) => item.elId === id);

  const handleDragEnd = (event : any) => {
    const { active, over } = event;

    if (active.id === over.id) return;
    console.log(active.id === over.id)

    setMenu((menus) => {
      const originalPos = getTaskPos(active.id);
      const newPos = getTaskPos(over.id);

      return arrayMove(menus, originalPos, newPos);
    });
  };

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd} collisionDetection={closestCorners}>
      <ul
        id="community-services"
        className={`mt-3 flex h-[calc(100dvh-128px)] flex-col gap-1 overflow-y-auto px-5 sm:mb-[60px] sm:px-1 ${
          className ?? ''
        }`}
      >
        <SortableContext
          items={[...menu.map((item) => item.elId)]}
          strategy={verticalListSortingStrategy}
        >
          {menu.map((item, index) => (
            <Item item={item} index={index} id={item.elId} key={index} setSlideIndex={setSlideIndex} />
          ))}
        </SortableContext>
      </ul>
    </DndContext>
  );
};
