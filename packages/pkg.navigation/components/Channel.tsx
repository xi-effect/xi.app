/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-unused-expressions */

import React, { ReactNode, useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useRouter } from 'next/navigation';
import {
  Announce,
  Calendar,
  Chat,
  Conference,
  Home,
  Task,
  Updates,
  Move,
  WhiteBoard,
} from '@xipkg/icons';
import { useMainSt } from 'pkg.stores';
import { IChannel } from './types';

interface IChannelProps {
  channel: IChannel;
  setSlideIndex?: (arg: number) => void;
}

interface IIconsDict {
  [key: string]: ReactNode;
}

const iconClassName = 'transition-colors ease-in group-hover:fill-brand-80';

const iconsDict: IIconsDict = {
  announce: <Announce className={iconClassName} />,
  calendar: <Calendar className={iconClassName} />,
  updates: <Updates className={iconClassName} />,
  task: <Task className={iconClassName} />,
  chat: <Chat className={iconClassName} />,
  camera: <Conference className={iconClassName} />,
  home: <Home className={iconClassName} />,
  whiteboard: <WhiteBoard className={iconClassName} />,
};

export function Channel({ channel, setSlideIndex }: IChannelProps) {
  const communityId = useMainSt((state) => state.communityMeta.id);
  const [mouseOver, setMouseOver] = useState(false);
  const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
    id: channel.elId,
    data: {
      type: 'Channel',
      channel,
    },
  });

  const router = useRouter();

  const handleRouteChange = () => {
    setSlideIndex && setSlideIndex(1);
    if (channel.type !== 'home') {
      return router.push(`/communities/${communityId}/channels/${channel.elId}/${channel.type}`);
    }

    return router.push(`/communities/${communityId}/${channel.type}`);
  };

  const style = {
    height: '40px',
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    return (
      <div ref={setNodeRef} style={style}>
        <div className="bg-brand-80 h-[4px] rounded-[2px]" />
      </div>
    );
  }

  return (
    <div
      onMouseEnter={() => setMouseOver(true)}
      onMouseLeave={() => setMouseOver(false)}
      ref={setNodeRef}
      style={style}
      onClick={() => handleRouteChange()}
    >
      <div className="text-gray-90 hover:bg-brand-0 hover:text-brand-80 group flex h-[40px] w-full flex-row items-center justify-between rounded-lg p-2 transition-colors ease-in hover:cursor-pointer">
        <div className="flex items-center">
          {iconsDict[channel.icon]}
          <span className="pl-2 text-[14px] font-normal">{channel.label}</span>
        </div>
        {mouseOver ? (
          <div {...attributes} {...listeners}>
            <Move />
          </div>
        ) : null}
      </div>
    </div>
  );
}
