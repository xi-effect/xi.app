'use client';

import React, { ReactNode, useEffect } from 'react';
import { redirect, usePathname, useRouter } from 'next/navigation';
import { useMainSt } from 'pkg.stores';
import Load from '../load';

type ProtectedProviderPropsT = {
  children: ReactNode;
};

const ProtectedProvider = ({ children }: ProtectedProviderPropsT) => {
  const socket = useMainSt((state) => state.socket);
  const getUser = useMainSt((state) => state.getUser);
  const updateCommunityMeta = useMainSt((state) => state.updateCommunityMeta);
  const onboardingStage = useMainSt((state) => state.user.onboardingStage);

  const isLogin = useMainSt((state) => state.isLogin);

  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    console.log('onconnect', socket);
    socket?.on('connect', () => {
      socket.emit(
        'retrieve-any-community',
        (stats: number, { community, participant }: { community: any; participant: any }) => {
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
  }, [socket?.connected]);

  useEffect(() => {
    if (socket?.connected === false) {
      socket?.connect();
    }
  }, [socket?.connected]);

  useEffect(() => {
    if (pathname !== '/communities' || (pathname === '/communities' && isLogin === null)) {
      if (isLogin === false) {
        redirect('/signin');
      } else {
        getUser();
      }
    }
  }, []);

  useEffect(() => {
    console.log('onboardingStage', onboardingStage);
    if (onboardingStage && onboardingStage !== null && onboardingStage !== 'completed') {
      redirect('/welcome/user-info');
    }
  }, [isLogin]);

  if (isLogin === null) return <Load />;

  return children;
};

export default ProtectedProvider;
