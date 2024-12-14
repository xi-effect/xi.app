import React, { useEffect } from 'react';
import { useMainSt } from 'pkg.stores';
import { convertSnakeToCamelCase } from '@xipkg/utils';
import { useChatStore } from '../../stores';
import { SkeletMessages, ZeroMessage } from '../Skelets';
import { Chat } from './Chat';
import { MessageSnakeCaseT, MessageT } from '../../models/Message';

export const ChatProvider = () => {
  const messages = useChatStore((state) => state.messages);
  const setMessages = useChatStore((state) => state.setMessages);
  const socket = useMainSt((state) => state.socket);

  const handleNewMessage = (data: MessageSnakeCaseT) => {
    const newMessage = convertSnakeToCamelCase(data) as MessageT;
    setMessages([...(messages ?? []), newMessage]);
  };

  useEffect(() => {
    if (!socket) return () => {};

    socket.on('send-chat-message', handleNewMessage);

    // Очистка обработчиков при размонтировании компонента
    return () => {
      socket.off('send-chat-message', handleNewMessage);
    };
  }, []);

  if (messages === null) {
    return <SkeletMessages length={20} />;
  }

  if (messages.length === 0) {
    return <ZeroMessage />;
  }

  return <Chat />;
};
