import React from 'react';
import { Button } from '@xipkg/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@xipkg/dropdown';
import { Edit, Emotions, Link, MenuDots, Pin, Share, Trash } from '@xipkg/icons';
import { Avatar, AvatarFallback, AvatarImage } from '@xipkg/avatar';
import { DateChat } from './DateChat';
import { MessageT } from '../../models/Message';

type ChatMessageProps = {
  item: MessageT;
  prevItemCreatedAt: MessageT['createdAt'] | null;
};

const formatISODate = (isoString: string): string => {
  const date = new Date(isoString);

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Месяцы начинаются с 0
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${day}.${month}.${year} ${hours}:${minutes}`;
};

const getContainerClassNames = (
  itemId: string,
  hovered: string | null,
  lockedHovered: string | null,
): string => {
  const isActive = hovered === itemId || lockedHovered === itemId;
  return `group relative rounded-md ${isActive ? 'bg-gray-5' : 'hover:bg-gray-5'}`;
};

const getMenuClassNames = (itemId: string, hovered: string | null): string => {
  const isHovered = hovered === itemId;
  return `pointer-events-none absolute right-1 top-2 ${isHovered ? 'pointer-events-auto group-hover:opacity-100' : 'opacity-0'}`;
};

const getButtonClassNames = (itemId: string, lockedHovered: string | null): string => {
  const isLocked = lockedHovered === itemId;
  return `m-0 h-6 w-6 rounded p-1 ${isLocked ? 'bg-gray-10' : 'hover:bg-gray-10'}`;
};

export const ChatMessage = ({ item, prevItemCreatedAt }: ChatMessageProps) => {
  const [hovered, setHovered] = React.useState<string | null>(null);
  const [lockedHovered, setLockedHovered] = React.useState<string | null>(null);
  const menuRefs = React.useRef<{ [key: string]: HTMLDivElement | null }>({});

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const currentHovered = lockedHovered || hovered;
      if (
        currentHovered &&
        menuRefs.current[currentHovered] &&
        !menuRefs.current[currentHovered]!.contains(event.target as Node)
      ) {
        setLockedHovered(null);
        setHovered(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [lockedHovered, hovered]);

  const toggleHoverLock = (itemId: string) => {
    if (lockedHovered === itemId) {
      setLockedHovered(null);
      setHovered(null);
    } else {
      setLockedHovered(itemId);
      setHovered(itemId);
    }
  };

  const handleMouseLeave = (itemId: string) => {
    if (lockedHovered !== itemId) {
      setHovered(null);
    }
  };

  return (
    <div key={item.id}>
      {prevItemCreatedAt !== null && (
        <DateChat itemCreatedAt={item.createdAt} prevItemCreatedAt={prevItemCreatedAt} />
      )}
      <div
        className={getContainerClassNames(item.id, hovered, lockedHovered)}
        onMouseEnter={() => setHovered(item.id)}
        onMouseLeave={() => handleMouseLeave(item.id)}
      >
        <div className="flex w-full p-2 transition-colors">
          <Avatar size="l" className="mr-2">
            <AvatarImage
              src={`https://auth.xieffect.ru/api/users/${item.senderUserId}/avatar.webp`}
              imageProps={{
                src: `https://auth.xieffect.ru/api/users/${item.senderUserId}/avatar.webp`,
                alt: 'User Avatar',
              }}
              alt="User Avatar"
            />
            <AvatarFallback size="l">А</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center">
              <span className="mr-2 font-semibold">ААААА</span>
              {item.createdAt && (
                <span className="text-s-base text-gray-40 font-normal">
                  {formatISODate(item.createdAt)}
                </span>
              )}
            </div>
            <p className="relative mt-1 w-[600] text-gray-100">{item.content}</p>
          </div>
        </div>

        <div
          ref={(el: HTMLDivElement | null) => {
            menuRefs.current[item.id] = el;
          }}
          className={getMenuClassNames(item.id, hovered)}
        >
          <div className="border-gray-10 bg-gray-0 relative flex items-center justify-center gap-1 rounded border p-1">
            <Button
              variant="ghost"
              type="button"
              className="m-0 h-6 w-6 rounded p-1"
              onClick={() => setHovered(item.id)}
            >
              <Emotions />
            </Button>
            <Button
              variant="ghost"
              type="button"
              className="m-0 h-6 w-6 rounded p-1"
              onClick={() => setHovered(item.id)}
            >
              <Share />
            </Button>
            <Button
              variant="ghost"
              type="button"
              className="m-0 h-6 w-6 rounded p-1"
              onClick={() => setHovered(item.id)}
            >
              <Edit />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger className="cursor-pointer" asChild>
                <Button
                  variant="ghost"
                  type="button"
                  className={getButtonClassNames(item.id, lockedHovered)}
                  onClick={() => toggleHoverLock(item.id)}
                >
                  <MenuDots />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="mt-1">
                <DropdownMenuItem className="hover:bg-gray-5 active:bg-gray-5 focus:bg-gray-5">
                  <Pin className="mr-2 h-4 w-4" />
                  <span className="text-xs">Закрепить сообщение</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-gray-5 active:bg-gray-5 focus:bg-gray-5">
                  <Link className="mr-2 h-4 w-4" />
                  <span className="text-xs">Видео</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-gray-5 active:bg-gray-5 focus:bg-gray-5">
                  <Trash className="fill-red-60 mr-2 h-4 w-4" />
                  <span className="text-red-60 text-xs">Удалить</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  );
};