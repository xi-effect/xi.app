'use client';

import React, { ReactNode } from 'react';
import { Close, Burger, Notification } from '@xipkg/icons';
import { Modal, ModalContent, ModalTrigger, ModalCloseButton } from '@xipkg/modal';
import Image from 'next/image';
import { useSessionStorage } from 'pkg.utils';
// @ts-ignore
import SwipeableViews from 'react-swipeable-views-react-18-fix';
import { CommunityMenu } from './CommunityMenu';
import { CommunityItems } from './CommunityItems';
import { UserSettings } from 'pkg.user.settings';

type BottomBarT = {
  slideIndex: number;
  children: ReactNode;
  onExit: () => void;
  setSlideIndex: (value: number) => void;
};

type ValuesT = {
  [key: string]: 0 | 1;
};

const values: ValuesT = {
  0: 1,
  1: 0,
};

export const BottomBar = ({ children, onExit, slideIndex, setSlideIndex }: BottomBarT) => {
  const handleMenu = () => {
    setSlideIndex(values[slideIndex]);
  };

  const onSwipeEnd = (value: number) => {
    setSlideIndex(value);
  };

  return (
    <div className={`w-full overflow-auto`}>
      <SwipeableViews animateHeight index={slideIndex} onChangeIndex={onSwipeEnd}>
        <div className={`w-full overflow-auto`}>
          <div className={`sticky left-0 top-0 px-4 pt-4`}>
            <CommunityMenu />
          </div>
          <CommunityItems setSlideIndex={setSlideIndex} />
        </div>
        <div className="h-[calc(100dvh-80px)] overflow-auto">{children}</div>
      </SwipeableViews>
      <div className="bg-gray-0 fixed bottom-0 z-10 flex h-[80px] w-screen flex-row items-center p-4">
        <button
          onClick={handleMenu}
          className="bg-gray-0 mr-4 flex h-[48px] w-[48px] items-center p-3"
        >
          {slideIndex === 0 ? <Close /> : <Burger />}
        </button>
        <Image src="/assets/brand/navigationlogo.svg" alt="xieffect logo" width={134} height={16} />
        <Modal>
          <ModalTrigger asChild>
            <div className="ml-auto flex h-[32px] w-[32px] content-center items-center">
              {/* <Avatar size="m" src="/test/avatar.png" className="justify-self-end" /> */}
              <Image
                style={{
                  borderRadius: '50%',
                }}
                src="/test/avatar.svg"
                width={32}
                height={32}
                alt="user avatar"
              />
            </div>
          </ModalTrigger>
          <ModalContent variant="full" className="p-4 lg:p-6">
            <UserSettings onExit={onExit} />
          </ModalContent>
        </Modal>
        <button className="bg-gray-0 ml-4 flex h-[48px] w-[48px] content-center justify-center justify-self-end p-3">
          <Notification />
        </button>
      </div>
    </div>
  );
};
