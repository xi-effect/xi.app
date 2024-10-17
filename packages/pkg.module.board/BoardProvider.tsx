'use client';

import { useMainSt } from 'pkg.stores';
import React from 'react';
import './index.css';
import { useParams } from 'next/navigation';
import { toast } from 'sonner';
import { Board } from './Board';

export const BoardProvider = () => {
  const [token, setToken] = React.useState<null | string>(null);

  const socket = useMainSt((state) => state.socket);
  const params = useParams<{ 'channel-id': string; 'community-id': string }>();

  React.useEffect(() => {
    if (token === null) {
      socket.emit(
        'retrieve-board-channel',
        {
          community_id: params['community-id'],
          channel_id: params['channel-id'],
        },
        (status: number, { ydoc_id: YdocId }: { ydoc_id: string }) => {
          console.log('status', status, YdocId);
          if (status === 200) {
            setToken(YdocId);
          } else {
            toast('Произошла ошибка при получении токена');
          }
        },
      );
    }
  }, []);

  if (token === null) {
    return <span> Loading </span>;
  }

  return <Board token={token} />;
};
