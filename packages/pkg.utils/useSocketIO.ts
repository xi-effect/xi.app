'use client';

import io from 'socket.io-client';

export const useSocketIO = (url?: string) => {
  const socket = io(url || 'https://api.xieffect.ru/', {
    withCredentials: true,
    transports: ['websocket'],
  });

  return socket;
};
