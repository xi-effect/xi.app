import React, { useMemo } from 'react';
import { Button } from '@xipkg/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@xipkg/dropdown';
import { Edit, Emotions, Link, MenuDots, Pin, Share, Trash } from '@xipkg/icons';
import { MarkdownPreview, slateToMarkdown } from '@xipkg/inputsmart';
import { cn } from '@xipkg/utils';
import { DateChat } from './DateChat';
import { MessageT } from '../../models/Message';
import { UserName } from './UserName';
import { UserAvatar } from './UserAvatar';
import { areDatesDifferent, formatTimeFromISO } from '../../utils';

type ChatMessageProps = {
  item: MessageT;
  prevItemCreatedAt: MessageT['createdAt'] | null;
  nextId: number | null;
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

const ChatMessage = React.memo(({ item, prevItemCreatedAt, nextId }: ChatMessageProps) => {
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

  const markdownedContent = useMemo(() => {
    let parsedContent;

    try {
      // Попытка распарсить строку
      parsedContent = JSON.parse(item.content);

      // Иногда может понадобиться распарсить ещё раз
      if (typeof parsedContent !== 'object') {
        parsedContent = JSON.parse(parsedContent);
      }
    } catch (e) {
      // Если парсинг не удался, возвращаем исходную строку
      return item.content;
    }

    // Проверяем, является ли результат парсинга массивом объектов
    if (Array.isArray(parsedContent) && parsedContent.every((el) => typeof el === 'object')) {
      return slateToMarkdown(parsedContent);
    }

    // Если это не массив объектов, возвращаем строку как есть
    return item.content;
  }, [item.content]);

  const showDate =
    item.createdAt && prevItemCreatedAt && areDatesDifferent(item.createdAt, prevItemCreatedAt);
  const showInfo = showDate || item.senderUserId !== nextId;

  return (
    <div key={item.id}>
      {showDate && <DateChat itemCreatedAt={item.createdAt} />}
      <div
        className={getContainerClassNames(item.id, hovered, lockedHovered)}
        onMouseEnter={() => setHovered(item.id)}
        onMouseLeave={() => handleMouseLeave(item.id)}
      >
        <div
          className={cn(
            'flex w-full gap-2 transition-colors',
            showInfo ? 'px-2 pb-1 pt-2' : 'px-2 py-1',
          )}
        >
          {!showInfo && item.createdAt && (
            <div className="flex w-[48px] justify-end">
              <span className="text-s-base text-gray-40 font-normal opacity-0 transition-all ease-linear group-hover:opacity-100">
                {' '}
                {formatTimeFromISO(item.createdAt)}{' '}
              </span>
            </div>
          )}
          {showInfo && <UserAvatar userId={item.senderUserId} />}
          <div className="flex flex-1 flex-col gap-1">
            {showInfo && (
              <div className="flex items-center">
                <UserName userId={item.senderUserId} />
                {item.createdAt && (
                  <span className="text-s-base text-gray-40 font-normal">
                    {formatISODate(item.createdAt)}
                  </span>
                )}
              </div>
            )}
            <div className="relative w-full text-[14px] text-gray-100">
              <MarkdownPreview markdown={markdownedContent} />
            </div>
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
});

ChatMessage.displayName = 'ChatMessage';

export { ChatMessage };
