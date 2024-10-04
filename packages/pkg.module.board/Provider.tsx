'use client';

import { useMainSt } from 'pkg.stores';
import React from 'react';
import './index.css';
import { useParams } from 'next/navigation';
import { Board } from './Board';

export const Provider = () => {
  const [token, setToken] = React.useState<null | string>(null);

  const socket = useMainSt((state) => state.socket);
  const params = useParams<{ 'channel-id': string; 'community-id': string }>();

  React.useEffect(() => {
    socket.emit(
      'retrieve-board-channel',
      {
        community_id: params['community-id'],
        channel_id: params['channel-id'],
      },
      (status: number, { ydoc_id: YdocId }: { ydoc_id: string }) => {
        console.log('status', status);
        setToken(YdocId);
      },
    );
  }, []);

  if (token === null) {
    return <span> Loading </span>;
  }

  return <Board token={token} />;
};
