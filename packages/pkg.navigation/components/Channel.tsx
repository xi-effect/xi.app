/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-unused-expressions */

import React, { ReactNode, useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useRouter, usePathname } from 'next/navigation';
import {
  Announce,
  Calendar,
  Chat,
  Conference,
  Task,
  Updates,
  Move,
  WhiteBoard,
  Settings,
} from '@xipkg/icons';
import { useMainSt } from 'pkg.stores';
import { toast } from 'sonner';
import { ChannelT } from './types';
import { ItemContextMenu } from './ItemContextMenu';
import { useMedia } from 'pkg.utils.client';

type ChannelPropsT = {
  channel: ChannelT;
  className?: string;
  setSlideIndex?: (arg: number) => void;
};

type IconsDictT = {
  [key: string]: ReactNode;
};

const stylesDict = {
  default: {
    icon: 'fill-gray-90 hover:bg-gray-5',
    channel: 'text-gray-90 hover:bg-gray-5',
    moveIcon: '',
  },
  active: {
    icon: 'fill-brand-80 group-hover:fill-brand-100',
    channel: 'text-brand-80 bg-brand-0 hover:text-brand-100',
    moveIcon: 'fill-brand-80',
  },
  disabled: {
    icon: 'fill-gray-30 group-hover:fill-gray-50',
    channel: 'text-gray-30 hover:bg-gray-5 hover:text-gray-50',
    moveIcon: 'fill-gray-50',
  },
};

export const Channel = ({ channel, className, setSlideIndex }: ChannelPropsT) => {
  const isOwner = useMainSt((state) => state.communityMeta.isOwner);
  const socket = useMainSt((state) => state.socket);
  const deleteChannel = useMainSt((state) => state.deleteChannel);
  const communityId = useMainSt((state) => state.communityMeta.id);
  const [mouseOver, setMouseOver] = useState(false);

  const isMobile = useMedia('(max-width: 960px)');

  const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
    id: channel.uid,
    data: {
      type: 'Channel',
      channel,
    },
    disabled: !isOwner || isMobile,
  });

  const pathname = usePathname();

  function checkIsChannelOpened(url: string): boolean | null {
    const match = url.match(/\/communities\/\d+(?:\/channels\/(\d+)\/(\w+)|\/(\w+))/);
    if (!match) return null;

    const [, channelId, channelType, pageType] = match;

    return (
      (channel.id.toString() === channelId && channel.kind === channelType) ||
      channel.kind === pageType ||
      null
    );
  }

  const activeChannel = checkIsChannelOpened(pathname);
  // eslint-disable-next-line no-nested-ternary
  const currentStyles = activeChannel
    ? stylesDict.active
    : channel.disabled
      ? stylesDict.disabled
      : stylesDict.default;

  const iconClassName = `transition-colors ease-in ${currentStyles.icon}`;

  const iconsDict: IconsDictT = {
    posts: <Announce className={iconClassName} />,
    calendar: <Calendar className={iconClassName} />,
    updates: <Updates className={iconClassName} />,
    tasks: <Task className={iconClassName} />,
    chats: <Chat className={iconClassName} />,
    video: <Conference className={iconClassName} />,
    board: <WhiteBoard className={iconClassName} />,
  };

  const router = useRouter();

  const handleRouteChange = () => {
    setSlideIndex && setSlideIndex(1);
    return router.push(`/communities/${communityId}/channels/${channel.id}/${channel.kind}`);
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

  const handleDelete = () => {
    socket?.emit(
      'delete-channel',
      {
        community_id: communityId,
        channel_id: channel.id,
      },
      (status: number) => {
        if (status === 204) {
          toast('Канал успешно удален');
          deleteChannel(channel.id);
        } else {
          toast(`Что-то пошло не так. Ошибка ${status}`);
        }
      },
    );
  };

  return (
    <ItemContextMenu
      isTriggerActive={isOwner}
      handleEdit={() => console.log('Редактировать канал')}
      handleDelete={handleDelete}
    >
      <div
        onMouseEnter={() => setMouseOver(true)}
        onMouseLeave={() => setMouseOver(false)}
        ref={setNodeRef}
        style={style}
        onClick={() => handleRouteChange()}
      >
        <div
          className={`${currentStyles.channel} ${className} group flex h-[40px] w-full flex-row items-center justify-between rounded-lg p-2 transition-colors ease-in hover:cursor-pointer`}
        >
          <div className="flex items-center">
            {iconsDict[channel.kind]}
            <span className="pl-2 text-[14px] font-normal">{channel.name}</span>
          </div>
          {isOwner && !isMobile && mouseOver ? (
            <div {...attributes} {...listeners} className="flex items-center gap-3">
              {activeChannel ? (
                <Settings size="s" className={activeChannel ? 'fill-brand-80' : ''} />
              ) : (
                ''
              )}
              <Move size="s" className={currentStyles.moveIcon} />
            </div>
          ) : null}
        </div>
      </div>
    </ItemContextMenu>
  );
};
