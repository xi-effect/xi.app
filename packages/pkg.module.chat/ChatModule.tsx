'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useMainSt } from 'pkg.stores';
import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { convertSnakeToCamelCase } from '@xipkg/utils';
import { ChatProvider } from './components/Chat';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { BottomBar } from './components/BottomBar';
import { useInterfaceStore } from './stores/interfaceStore';
import { useChatStore } from './stores/chatStore';
import { MessageSnakeCaseT, MessageT } from './models/Message';

export const ChatModule = () => {
  const socket = useMainSt((state) => state.socket);
  const chatId = useChatStore((state) => state.chatId);
  const setChatId = useChatStore((state) => state.setChatId);
  const setMessages = useChatStore((state) => state.setMessages);
  const setHasNextPage = useChatStore((state) => state.setHasNextPage);

  const currentSidebar = useInterfaceStore((state) => state.currentSidebar);
  const params = useParams<{ 'channel-id': string; 'community-id': string }>();

  useEffect(() => {
    if (!socket) return () => {};

    const handleRetrieveChatChannel = (
      status: number,
      { chat_id: newChatId }: { chat_id: string },
    ) => {
      if (status === 200 && newChatId && typeof newChatId === 'number' && chatId !== newChatId) {
        setChatId(newChatId);
      }
    };

    socket.emit(
      'retrieve-chat-channel',
      {
        community_id: params['community-id'],
        channel_id: params['channel-id'],
      },
      handleRetrieveChatChannel,
    );

    return () => {};
  }, []);

  useEffect(() => {
    if (!chatId) return () => {};

    socket.emit(
      'open-chat',
      {
        chat_id: chatId,
        limit: 20,
      },
      (
        status: number,
        { latest_messages: latestMessages }: { latest_messages: MessageSnakeCaseT[] },
      ) => {
        if (status === 200) {
          const messages: MessageT[] = latestMessages
            .map((item) => convertSnakeToCamelCase(item) as MessageT)
            .reverse();

          if (messages.length === 20) {
            setHasNextPage(true);
          }

          setMessages(messages);
        }
      },
    );

    return () => {
      if (!chatId || !socket) return;

      socket.emit('close-chat', { chat_id: chatId }, (status: number) => {
        console.log('close-chat', status);
      });
    };
  }, [chatId]);

  return (
    <div className="flex h-full max-h-full w-full flex-row overflow-x-hidden">
      <motion.div
        animate={{ marginRight: currentSidebar !== null ? '300px' : '0px' }} // Меняем размер шапки при открытии меню
        transition={{ type: 'tween', duration: 0.3 }}
        // @ts-expect-error TODO: чёт странное
        className="relative flex h-full w-full flex-col overflow-hidden"
      >
        <Header />
        <ChatProvider />
        <BottomBar />
      </motion.div>
      <AnimatePresence>
        {currentSidebar !== null && (
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: '0%' }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            // @ts-expect-error TODO: чёт странное
            className="bg-green-0 z-15 fixed right-0 top-0 h-full min-w-[300px]"
          >
            <Sidebar />
          </motion.aside>
        )}
      </AnimatePresence>
    </div>
  );
};
