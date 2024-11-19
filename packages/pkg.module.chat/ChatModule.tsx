'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useMainSt } from 'pkg.stores';
import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { convertSnakeToCamelCase } from '@xipkg/utils';
import { Chat } from './components/Chat';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { BottomBar } from './components/BottomBar';
import { useInterfaceStore } from './stores/interfaceStore';
import { useChatStore } from './stores/chatStore';
import { MessageSnakeCaseT } from './models/Message';

export const ChatModule = () => {
  const socket = useMainSt((state) => state.socket);
  const chatId = useChatStore((state) => state.chatId);
  const setChatId = useChatStore((state) => state.setChatId);

  const currentSidebar = useInterfaceStore((state) => state.currentSidebar);
  const params = useParams<{ 'channel-id': string; 'community-id': string }>();

  console.log('params', params);

  useEffect(() => {
    if (!socket) return () => {};

    const handleRetrieveChatChannel = (
      status: number,
      { chat_id: newChatId }: { chat_id: string },
    ) => {
      console.log('handleRetrieveChatChannel', status, newChatId);
      if (status === 204 && newChatId && typeof newChatId === 'number' && chatId !== newChatId) {
        setChatId(chatId);

        socket.emit(
          'open-chat',
          { chat_id: newChatId },
          (
            status: number,
            { latest_messages: latestMessages }: { latest_messages: MessageSnakeCaseT[] },
          ) => {
            if (status === 204) {
              const messages = convertSnakeToCamelCase(latestMessages);

              console.log('messages', messages);
            }
          },
        );
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
  }, [params['channel-id'], params['community-id']]);

  return (
    <div className="flex h-full max-h-full w-full flex-row overflow-x-hidden">
      <motion.div
        animate={{ marginRight: currentSidebar !== null ? '300px' : '0px' }} // Меняем размер шапки при открытии меню
        transition={{ type: 'tween', duration: 0.3 }}
        className="relative flex h-full w-full flex-col overflow-hidden"
      >
        <Header />
        <Chat />
        <BottomBar />
      </motion.div>
      <AnimatePresence>
        {currentSidebar !== null && (
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: '0%' }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="bg-green-0 z-15 fixed right-0 top-0 h-full min-w-[300px]"
          >
            <Sidebar />
          </motion.aside>
        )}
      </AnimatePresence>
    </div>
  );
};
