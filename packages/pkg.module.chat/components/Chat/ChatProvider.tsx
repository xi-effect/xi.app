import React from 'react';
import { useChatStore } from '../../stores';
import { SkeletMessages, ZeroMessage } from '../Skelets';
import { Chat } from './Chat';

export const ChatProvider = () => {
  const messages = useChatStore((state) => state.messages);

  if (messages === null) {
    return <SkeletMessages length={20} />;
  }

  if (messages.length === 0) {
    return <ZeroMessage />;
  }

  return <Chat />;
};
