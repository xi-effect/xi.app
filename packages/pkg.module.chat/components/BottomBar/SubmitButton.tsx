'use client';

import React from 'react';
import { Button } from '@xipkg/button';
import { Send } from '@xipkg/icons';
import { useMainSt } from 'pkg.stores';
import { CustomEditor } from '@xipkg/inputsmart';
import { useChatStore } from '../../stores/chatStore';

type SubmitButtonPropsT = {
  editorRef: React.MutableRefObject<CustomEditor | null>;
};

export const SubmitButton = ({ editorRef }: SubmitButtonPropsT) => {
  const socket = useMainSt((state) => state.socket);
  const chatId = useChatStore((state) => state.chatId);

  const handleReset = () => {
    if (!editorRef || !editorRef.current) return;

    editorRef.current?.resetContent();
  };

  const handleClick = () => {
    if (!socket) return;

    console.log('handleClick', chatId);

    socket.emit(
      'send-chat-message',
      {
        chat_id: chatId,
        data: {
          content: '123',
        },
      },
      (status: number) => {
        console.log('status', status);
        if (status === 201) {
          handleReset();
        }
      },
    );
  };

  return (
    <Button onClick={handleClick} size="m" className="h-12 w-12 min-w-12 p-0">
      <Send className="fill-gray-0 h-6 w-6" />
    </Button>
  );
};
