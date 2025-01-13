import React from 'react';

import { useMainSt } from 'pkg.stores';
import { DropdownMenuItem } from '@xipkg/dropdown';
import { Link, Pin, Trash } from '@xipkg/icons';
import { useChatStore } from '../../stores';

type MessageToolsPropsT = {
  id: string;
  isPinned: boolean;
};

export const MessageTools = ({ id, isPinned }: MessageToolsPropsT) => {
  const chatId = useChatStore((state) => state.chatId);
  const removeMessageById = useChatStore((state) => state.removeMessageById);
  const updateMessageById = useChatStore((state) => state.updateMessageById);
  const socket = useMainSt((state) => state.socket);

  const emitSocketEvent = (
    event: string,
    data: { message_id: string; chat_id: string | null },
    callBack: (status: number) => void,
  ) => {
    if (!socket || !chatId) return null;

    socket.emit(event, data, callBack);
    return null;
  };

  const handleDelete = () => {
    emitSocketEvent(
      'delete-my-chat-message',
      { message_id: id, chat_id: chatId },
      (status: number) => {
        if (status === 204) {
          removeMessageById(id);
        }
      },
    );
  };

  const handlePinMessage = () => {
    emitSocketEvent('pin-chat-message', { message_id: id, chat_id: chatId }, (status: number) => {
      if (status === 204) {
        updateMessageById(id, { pinned: true });
      }
    });
  };

  const handleUnpinMessage = () => {
    emitSocketEvent('unpin-chat-message', { message_id: id, chat_id: chatId }, (status: number) => {
      if (status === 204) {
        updateMessageById(id, { pinned: false });
      }
    });
  };

  const handleTogglePin = () => {
    if (isPinned) {
      handleUnpinMessage();
    } else {
      handlePinMessage();
    }
  };

  return (
    <>
      <DropdownMenuItem
        onClick={handleTogglePin}
        className="hover:bg-gray-5 active:bg-gray-5 focus:bg-gray-5"
      >
        <Pin className="mr-2 h-4 w-4" />
        <span className="text-xs">{isPinned ? 'Открепить сообщение' : 'Закрепить сообщение'}</span>
      </DropdownMenuItem>
      <DropdownMenuItem className="hover:bg-gray-5 active:bg-gray-5 focus:bg-gray-5">
        <Link className="mr-2 h-4 w-4" />
        <span className="text-xs">Скопировать ссылку</span>
      </DropdownMenuItem>
      <DropdownMenuItem
        onClick={() => handleDelete()}
        className="hover:bg-gray-5 active:bg-gray-5 focus:bg-gray-5"
      >
        <Trash className="fill-red-60 mr-2 h-4 w-4" />
        <span className="text-red-60 text-xs">Удалить</span>
      </DropdownMenuItem>
    </>
  );
};
