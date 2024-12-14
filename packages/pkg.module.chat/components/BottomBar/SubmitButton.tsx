'use client';

import React, { memo } from 'react';
import { Button } from '@xipkg/button';
import { Send } from '@xipkg/icons';
import { useMainSt } from 'pkg.stores';
import { CustomEditor } from '@xipkg/inputsmart';
import { convertSnakeToCamelCase } from '@xipkg/utils';
import { useKeyPress } from 'pkg.utils.client';
import { useChatStore } from '../../stores/chatStore';
import { MessageT } from '../../models/Message';

type SubmitButtonPropsT = {
  storageKey: string;
  editorRef: React.MutableRefObject<CustomEditor | null>;
};

const SubmitButton = memo(({ editorRef, storageKey }: SubmitButtonPropsT) => {
  const socket = useMainSt((state) => state.socket);
  const chatId = useChatStore((state) => state.chatId);
  const messages = useChatStore((state) => state.messages);
  const setMessages = useChatStore((state) => state.setMessages);

  const handleReset = () => {
    if (!editorRef || !editorRef.current) return;

    editorRef.current?.resetContent();
  };

  const handleClick = () => {
    if (!socket) return;

    const slateString = localStorage.getItem(storageKey);

    if (!slateString) return;

    let parsedContent;

    try {
      // Попытка распарсить строку
      parsedContent = JSON.parse(slateString);

      // Иногда может понадобиться распарсить ещё раз
      if (typeof parsedContent !== 'object') {
        parsedContent = JSON.parse(parsedContent);
      }
    } catch (e) {
      // Если парсинг не удался, то ничего не отправляем
      return;
    }

    // не даём отправить пустую строку
    if (parsedContent[0].children[0].text.trim().length === 0) {
      return;
    }

    console.log('ff', chatId, JSON.stringify(localStorage.getItem(storageKey)));

    socket.emit(
      'send-chat-message',
      {
        chat_id: chatId,
        data: {
          content: JSON.stringify(localStorage.getItem(storageKey)),
        },
      },
      (status: number, data: any) => {
        console.log('status', status);
        if (status === 201) {
          handleReset();

          const newMessage = convertSnakeToCamelCase(data) as MessageT;
          setMessages([...(messages ?? []), newMessage]);
          localStorage.removeItem(storageKey);
        }
      },
    );
  };

  useKeyPress('Enter', handleClick);

  return (
    <Button size="m" className="h-12 w-12 min-w-12 p-0">
      <Send className="fill-gray-0 h-6 w-6" />
    </Button>
  );
});

SubmitButton.displayName = 'SubmitButton';

export { SubmitButton };
