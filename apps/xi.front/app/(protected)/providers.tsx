'use client';

import React from 'react';
import { redirect, usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Load from '../load';
import { useMainSt } from 'pkg.stores';

const ProtectedProvider = ({ children }) => {
  const socket = useMainSt((state) => state.socket);
  const initSocket = useMainSt((state) => state.initSocket);
  const updateCommunityMeta = useMainSt((state) => state.updateCommunityMeta);

  const isLogin = useMainSt((state) => state.isLogin);

  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (socket !== null) {
      console.log('useEffect');
      socket.on('connect', () => {
        console.log('connect', socket);
        socket.emit(
          'retrieve-any-community',
          (stats: number, { community, participant }: { community: any; participant: any }) => {
            console.log('stats', stats, community, participant);

            if (stats === 200) {
              updateCommunityMeta({
                id: community.id,
                isOwner: participant.is_owner,
                name: community.name,
                description: community.description,
              });
            }

            router.push(`/communities/${community.id}/home`);
          },
        );
      });
    }
  }, [socket?.connected]);

  useEffect(() => {
    console.log('isLogin pathname', isLogin, pathname);
    if (isLogin === false && pathname !== '/communities') {
      redirect('/signin');
    } else {
      console.log('i');
      initSocket();
    }
  }, [isLogin]);

  if (isLogin === null) return <Load />;

  return children;
};

export default ProtectedProvider;
