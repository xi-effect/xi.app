import React from 'react';

import { useMainSt } from 'pkg.stores';
import { DropdownMenuItem } from '@xipkg/dropdown';
import { Link, Pin, Trash } from '@xipkg/icons';
import { useChatStore } from '../../stores';

type MessageToolsPropsT = {
  id: string;
};

export const MessageTools = ({ id }: MessageToolsPropsT) => {
  const chatId = useChatStore((state) => state.chatId);
  const removeMessageById = useChatStore((state) => state.removeMessageById);
  const socket = useMainSt((state) => state.socket);

  const handleDelete = () => {
    if (!socket || !chatId) return null;

    socket.emit(
      'delete-my-chat-message',
      {
        message_id: id,
        chat_id: chatId,
      },
      (status: number) => {
        if (status === 204) {
          removeMessageById(id);
        }
      },
    );

    return null;
  };

  return (
    <>
      <DropdownMenuItem className="hover:bg-gray-5 active:bg-gray-5 focus:bg-gray-5">
        <Pin className="mr-2 h-4 w-4" />
        <span className="text-xs">Закрепить сообщение</span>
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
