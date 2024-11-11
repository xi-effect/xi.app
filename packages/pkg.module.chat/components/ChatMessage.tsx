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

type MessageItemT = {
  id: string;
  name: string;
  time: string;
  message: string;
};

type ChatMessageProps = {
  item: MessageItemT;
  index: number;
  mocksMessages: MessageItemT[];
};

export const ChatMessage: React.FC<ChatMessageProps> = ({ item, index, mocksMessages }) => {
  const { id, name, time, message } = item;

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
    <div key={id}>
      <DateChat index={index} mocksMessages={mocksMessages} time={time} />
      <div
        className={getContainerClassNames(id, hovered, lockedHovered)}
        onMouseEnter={() => setHovered(id)}
        onMouseLeave={() => handleMouseLeave(id)}
      >
        <div className="flex w-full p-2 transition-colors">
          <Avatar size="l" className="mr-2">
            <AvatarImage
              src="https://auth.xieffect.ru/api/users/3/avatar.webp"
              imageProps={{
                src: 'https://auth.xieffect.ru/api/users/3/avatar.webp',
                alt: 'User Avatar',
              }}
              alt="User Avatar"
            />
            <AvatarFallback size="l">{name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center">
              <span className="mr-2 font-semibold">{name}</span>
              <span className="text-s-base text-gray-40 font-normal">{time}</span>
            </div>
            <p className="relative mt-1 w-[600] text-gray-100">{message}</p>
          </div>
        </div>

        <div
          ref={(el: HTMLDivElement | null) => {
            menuRefs.current[id] = el;
          }}
          className={getMenuClassNames(id, hovered)}
        >
          <div className="border-gray-10 bg-gray-0 relative flex items-center justify-center gap-1 rounded border p-1">
            <Button
              variant="ghost"
              type="button"
              className="m-0 h-6 w-6 rounded p-1"
              onClick={() => setHovered(id)}
            >
              <Emotions />
            </Button>
            <Button
              variant="ghost"
              type="button"
              className="m-0 h-6 w-6 rounded p-1"
              onClick={() => setHovered(id)}
            >
              <Share />
            </Button>
            <Button
              variant="ghost"
              type="button"
              className="m-0 h-6 w-6 rounded p-1"
              onClick={() => setHovered(id)}
            >
              <Edit />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger className="cursor-pointer" asChild>
                <Button
                  variant="ghost"
                  type="button"
                  className={getButtonClassNames(id, lockedHovered)}
                  onClick={() => toggleHoverLock(id)}
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
