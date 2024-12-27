'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const Chat = dynamic(() => import('pkg.module.chat').then((mod) => mod.Chat), { ssr: false });

export default function ChatPage() {
  return (
    <div
      id="chat-container"
      className="w-full md:w-[calc(100vw-350px)] md:min-h-screen md:h-screen md:overflow-auto bg-gray-0 overflow-x-hidden"
    >
      <Chat />
    </div>
  );
}
