'use client';

import React, { ReactNode } from 'react';
import { Close, Burger, Notification } from '@xipkg/icons';
import { Avatar } from '@xipkg/avatar';
import Image from 'next/image';
import { useSessionStorage } from 'react-use';
// @ts-ignore
import SwipeableViews from 'react-swipeable-views-react-18-fix';
import { Menu } from './Menu';
import { CommunityMenu } from './CommunityMenu';
import { CommunityItems } from './CommunityItems';

type BottomBarT = {
  children: ReactNode;
};

type ValuesT = {
  [key: string]: 0 | 1;
};

const values: ValuesT = {
  0: 1,
  1: 0,
};

export const BottomBar = ({ children }: BottomBarT) => {
  const [slideIndex, setSlideIndex] = useSessionStorage('slide-index-menu', 1);

  const handleMenu = () => {
    setSlideIndex(values[slideIndex]);
  };

  const onSwipeEnd = (value: number) => {
    setSlideIndex(value);
  };

  return (
    <div className={`w-full h-[100dvh] overflow-hidden relative`}>
      <SwipeableViews animateHeight index={slideIndex} onChangeIndex={onSwipeEnd}>
        <div className={`relative w-full h-fit p-4`}>
          <div>
            <CommunityMenu />
          </div>
          <CommunityItems className="overflow-hidden" />
        </div>
        <div className={`w-full h-full overflow-auto mb-2`}>{children}</div>
      </SwipeableViews>
      <div className="fixed bottom-0 flex flex-row items-center w-screen h-[80px] p-4 bg-gray-0 z-10">
        <button
          onClick={handleMenu}
          className="h-[48px] w-[48px] p-3 flex items-center mr-4 bg-gray-0"
        >
          {slideIndex === 0 ? <Close /> : <Burger />}
        </button>
        <Image src="/assets/brand/navigationlogo.svg" alt="xieffect logo" width={134} height={16} />
        <div className="h-[32px] w-[32px] flex content-center items-center ml-auto">
          <Avatar size="m" src="/test/avatar.png" className="justify-self-end" />
        </div>
        <button className="h-[48px] w-[48px] p-3 flex content-center justify-center ml-4 bg-gray-0 justify-self-end">
          <Notification />
        </button>
      </div>
    </div>
  );
};
