import React, { useState } from 'react';
import { Button } from '@xipkg/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@xipkg/dropdown';
import { Edit, Emotions, MenuDots, Share } from '@xipkg/icons';
import { MarkdownPreview } from '@xipkg/inputsmart';
import { cn } from '@xipkg/utils';
import { DateChat } from './DateChat';
import { MessageT } from '../../models/Message';
import { UserName } from './UserName';
import { UserAvatar } from './UserAvatar';
import { MessageTools } from './MessageTools';
import {
  areDatesDifferent,
  formatTimeFromISO,
  convertToMarkdown,
  formatISODate,
} from '../../utils';

type ChatMessageProps = {
  item: MessageT;
  prevItemCreatedAt: MessageT['createdAt'] | null;
  nextId: number | null;
  hasControls?: boolean;
};

const ChatMessage = React.memo(
  ({ item, prevItemCreatedAt, nextId, hasControls = true }: ChatMessageProps) => {
    const [showDropdown, setShowDropdown] = useState(false);

    const showDate = prevItemCreatedAt
      ? item.createdAt && areDatesDifferent(item.createdAt, prevItemCreatedAt)
      : item.createdAt;

    const showInfo = showDate || item.senderUserId !== nextId;

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
                  {formatTimeFromISO(item.createdAt)}
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
                <MarkdownPreview markdown={convertToMarkdown(item.content)} />
              </div>
            </div>
          </div>

          {hasControls && (
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
                    <MessageTools id={item.id} isPinned={item.pinned} />
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  },
);

ChatMessage.displayName = 'ChatMessage';

export { ChatMessage };
