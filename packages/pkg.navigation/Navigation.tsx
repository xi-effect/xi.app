'use client';

import { ReactNode } from 'react';
import { useSessionStorage } from 'pkg.utils';
import { BottomBar, Menu } from './components';

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
          <Menu onExit={onExit} setSlideIndex={setSlideIndex} />
        </div>
        <div className="ml-[350px] w-[calc(100vw-350px)] overflow-auto">{children}</div>
      </div>
      <BottomBar slideIndex={slideIndex} setSlideIndex={setSlideIndex} onExit={onExit}>
        {children}
      </BottomBar>
    </>
  );
};
