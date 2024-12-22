import React, { useMemo, useState } from 'react';
import { Button } from '@xipkg/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@xipkg/dropdown';
import { Edit, Emotions, MenuDots, Share } from '@xipkg/icons';
import { MarkdownPreview, slateToMarkdown } from '@xipkg/inputsmart';
import { cn } from '@xipkg/utils';
import { DateChat } from './DateChat';
import { MessageT } from '../../models/Message';
import { UserName } from './UserName';
import { UserAvatar } from './UserAvatar';
import { areDatesDifferent, formatTimeFromISO } from '../../utils';
import { MessageTools } from './MessageTools';

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

const ChatMessage = React.memo(({ item, prevItemCreatedAt, nextId }: ChatMessageProps) => {
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

  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div key={item.id}>
      {showDate && <DateChat itemCreatedAt={item.createdAt} />}
      <div className={cn('hover:bg-gray-5 group relative rounded-md transition-opacity')}>
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
          className={cn(
            'absolute right-1 top-[4px]',
            'pointer-events-none opacity-0',
            'group-hover:pointer-events-auto group-hover:opacity-100',
            showDropdown && 'pointer-events-auto opacity-100',
          )}
        >
          <div className="border-gray-10 bg-gray-0 relative flex items-center justify-center gap-1 rounded border p-1">
            <Button variant="ghost" type="button" className="m-0 h-6 w-6 rounded p-1">
              <Emotions />
            </Button>
            <Button variant="ghost" type="button" className="m-0 h-6 w-6 rounded p-1">
              <Share />
            </Button>
            <Button variant="ghost" type="button" className="m-0 h-6 w-6 rounded p-1">
              <Edit />
            </Button>
            <DropdownMenu open={showDropdown} onOpenChange={(value) => setShowDropdown(value)}>
              <DropdownMenuTrigger className="cursor-pointer" asChild>
                <Button variant="ghost" type="button" className="m-0 h-6 w-6 rounded p-1">
                  <MenuDots />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent alignOffset={-4} align="end" className="mt-1 rounded-lg">
                <MessageTools id={item.id} />
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
