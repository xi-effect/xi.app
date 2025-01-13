import { convertSnakeToCamelCase } from '@xipkg/utils';
import React, { Fragment, useEffect, useState } from 'react';
import { useMainSt } from 'pkg.stores';
import { ChatMessage } from '../Chat/ChatMessage';
import { useChatStore } from '../../stores';
import { PinnedMessageSnakeCaseT, PinnedMessageT } from '../../models/Message';

export const Pinned = () => {
  const [pinnedMessages, setPinnedMessages] = useState<PinnedMessageT[] | null>(null);
  const socket = useMainSt((state) => state.socket);
  const chatId = useChatStore((state) => state.chatId);

  useEffect(() => {
    socket.emit(
      'list-chat-pinned-messages',
      {
        chat_id: chatId,
        created_before: new Date().toISOString(),
        limit: 15,
      },
      (status: number, pinnedMessages: PinnedMessageSnakeCaseT[]) => {
        if (status === 200) {
          setPinnedMessages(
            pinnedMessages.map((item) => convertSnakeToCamelCase(item) as PinnedMessageT),
          );
        }
      },
    );
  }, [chatId, socket, pinnedMessages]);

  return (
    <>
      <h6 className="mb-6 font-semibold">Закреплённые сообщения</h6>
      <ul className="flex h-[calc(100%-48px)] flex-col gap-4 overflow-y-auto">
        {pinnedMessages?.map((message, index) => (
          <ChatMessage
            key={message.id}
            item={message}
            prevItemCreatedAt={index !== 0 ? pinnedMessages[index - 1].createdAt : null}
            nextId={index !== 0 ? pinnedMessages[index - 1].senderUserId : null}
            hasControls={false}
          />
        ))}
      </ul>
    </>
  );
};
