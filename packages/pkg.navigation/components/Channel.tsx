/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */

'use client';

import { Announce, Calendar, Chat, Conference, Task, Updates } from '@xipkg/icons';
import React, { ReactNode } from 'react';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { useSessionStorage } from 'pkg.utils';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

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

export type ChannelT = {
  elId: string;
  icon: string;
  label: string;
  type: string;
  link: string;
};

export const Channel = ({ elId, icon, label, type, link }: ChannelT) => {
  const [slideIndex, setSlideIndex] = useSessionStorage('slide-index-menu', 1);
  console.log('slideIndex', slideIndex);

  const params = useParams<{ id: string }>();
  const pathname = usePathname();
  const router = useRouter();

  const activeType = pathname.split('/')[3];

  const isActive = params.id === elId && type === activeType;

  const handleRouteChange = () => {
    setSlideIndex(1);
    router.push(link);
  };

  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: elId });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <li
      id={elId}
      className={`text-gray-90 ${isActive ? 'bg-brang-0' : ''}hover:bg-brand-0 hover:text-brand-80 group flex h-[40px] w-full flex-row items-center rounded-lg p-2 transition-colors ease-in hover:cursor-pointer`}
      onClick={handleRouteChange}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      {iconsDict[icon]}
      <span className="pl-2 text-[14px] font-normal"> {label} </span>
    </li>
  );
};
