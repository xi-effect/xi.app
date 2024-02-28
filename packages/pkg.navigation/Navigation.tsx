'use client';
import { ReactNode } from 'react';
import { CommunityItems, CommunityMenu, BottomBar, Menu } from './components';

import { useMedia, useSessionStorage } from 'pkg.utils';
import Image from 'next/image';

type NavigationProp = {
  children: ReactNode;
  onExit: () => void;
};

export const Navigation = ({ children, onExit }: NavigationProp) => {
  const isTablet = useMedia('(max-width: 960px)', false);
  const [slideIndex, setSlideIndex] = useSessionStorage('slide-index-menu', 1);

  if (isTablet)
    return (
      <BottomBar slideIndex={slideIndex} setSlideIndex={setSlideIndex} onExit={onExit}>
        {children}
      </BottomBar>
    );

  return (
    <div className="relative flex flex-row">
      <div className="fixed flex h-screen min-h-screen min-w-[350px] flex-col p-6">
        <Menu onExit={onExit} slideIndex={slideIndex} setSlideIndex={setSlideIndex} />
      </div>
      <div className="ml-[350px]">{children}</div>
    </div>
  );
};
