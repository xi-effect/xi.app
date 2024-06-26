'use client';

import React, { ReactNode } from 'react';
import { Close, Burger } from '@xipkg/icons';
import { Modal, ModalContent, ModalTrigger } from '@xipkg/modal';
// @ts-ignore
import SwipeableViews from 'react-swipeable-views-react-18-fix';
import { UserSettings } from 'pkg.user.settings';
import { Logo } from 'pkg.logo';
import { UserProfile } from '@xipkg/userprofile';
import { useMainSt } from 'pkg.stores';
import { CommunityItems } from './CommunityItems';
import { CommunityMenu } from './CommunityMenu';

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
  const user = useMainSt((state) => state.user);

  const handleMenu = () => {
    setSlideIndex(values[slideIndex]);
  };

  const onSwipeEnd = (value: number) => {
    setSlideIndex(value);
  };

  return (
    <div className="flex w-full overflow-hidden md:hidden">
      <SwipeableViews animateHeight index={slideIndex} onChangeIndex={onSwipeEnd}>
        <div className="w-full overflow-auto">
          <div className="sticky left-0 top-0 px-4 pt-4">
            <CommunityMenu />
          </div>
          <CommunityItems setSlideIndex={setSlideIndex} />
        </div>
        <div className="h-[calc(100dvh-80px)] overflow-auto">{children}</div>
      </SwipeableViews>
      <div className="bg-gray-0 fixed bottom-0 z-10 flex h-[80px] w-screen flex-row items-center p-4">
        <button
          type="button"
          onClick={handleMenu}
          className="bg-gray-0 mr-4 flex h-[48px] w-[48px] items-center p-3"
        >
          {slideIndex === 0 ? <Close /> : <Burger />}
        </button>
        <Logo height={16} width={134} logoVariant="navigation" logoSize="default" />
        <Modal>
          <ModalTrigger asChild>
            <div className="ml-auto flex h-[32px] w-[32px] content-center items-center">
              <UserProfile
                userId={user.id}
                text="Ivan Kovylyaev"
                label="@ikovylyaev"
                size="m"
                withOutText
              />
            </div>
          </ModalTrigger>
          <ModalContent variant="full" className="p-4 lg:p-6">
            <UserSettings onExit={onExit} />
          </ModalContent>
        </Modal>
        {/* <button className="bg-gray-0 ml-4 flex h-[48px] w-[48px] content-center
        //justify-center justify-self-end p-3">
          <Notification />
        </button> */}
      </div>
    </div>
  );
};
