'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Chat } from './components/Chat';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { BottomBar } from './components/BottomBar';
import { useInterfaceStore } from './interfaceStore';

export const ChatModule = () => {
  const currentSidebar = useInterfaceStore((state) => state.currentSidebar);

  return (
    <div className="flex h-full max-h-full w-full flex-row overflow-x-hidden">
      <motion.div
        animate={{
          marginRight: currentSidebar !== null && window.innerWidth > 959 ? '300px' : '0px',
        }} // Меняем размер шапки при открытии меню
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
            className="bg-green-0 z-15 fixed right-0 top-0 hidden h-full min-w-[300px] md:block"
          >
            <Sidebar />
          </motion.aside>
        )}
      </AnimatePresence>
    </div>
  );
};
