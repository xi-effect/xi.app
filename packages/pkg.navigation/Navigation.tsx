'use client';

import { ReactNode } from 'react';
import { BottomBar, Menu } from './components';

import { useSessionStorage } from 'pkg.utils';

type NavigationProp = {
  children: ReactNode;
  onExit: () => void;
};

export const Navigation = ({ children, onExit }: NavigationProp) => {
  const [slideIndex, setSlideIndex] = useSessionStorage('slide-index-menu', 1);

  return (
    <>
      <div className="relative hidden flex-row md:flex">
        <div className="fixed flex h-screen min-h-screen min-w-[350px] flex-col p-6">
          <Menu onExit={onExit} slideIndex={slideIndex} setSlideIndex={setSlideIndex} />
        </div>
        <div className="w-[calc(100vw-350px)] ml-[350px] overflow-auto">{children}</div>
      </div>
      <BottomBar slideIndex={slideIndex} setSlideIndex={setSlideIndex} onExit={onExit}>
        {children}
      </BottomBar>
    </>
  );
};
