'use client';

import { ReactNode } from 'react';
import { Close, Burger } from '@xipkg/icons';
import { Modal, ModalContent, ModalTrigger } from '@xipkg/modal';
// @ts-ignore
import SwipeableViews from 'react-swipeable-views-react-18-fix';
import { UserSettings } from 'pkg.user.settings';
import { Logo } from 'pkg.logo';
import { UserProfile } from '@xipkg/userprofile';
import { useMainSt } from 'pkg.stores';
import { useParams } from 'next/navigation';
import { CommunityItems } from './CommunityItems';
import { CommunityMenu } from './CommunityMenu';

type BottomBarT = {
  slideIndex: number;
  children: ReactNode;
  setSlideIndex: (value: number) => void;
};

type ValuesT = {
  [key: string]: 0 | 1;
};

const values: ValuesT = {
  0: 1,
  1: 0,
};

export const BottomBar = ({ children, slideIndex, setSlideIndex }: BottomBarT) => {
  const params = useParams<{ 'community-id': string }>();

  const isNotCommunityId = typeof params['community-id'] !== 'string';

  const user = useMainSt((state) => state.user);

  const handleMenu = () => {
    setSlideIndex(values[slideIndex]);
  };

  const onSwipeEnd = (value: number) => {
    setSlideIndex(value);
  };

  return (
    <div className="flex w-full overflow-hidden md:hidden">
      <SwipeableViews
        animateHeight
        index={slideIndex}
        onChangeIndex={onSwipeEnd}
        className="w-full"
      >
        <div className="w-full overflow-auto">
          <div className="sticky left-0 top-0 px-4 pt-4">
            <CommunityMenu />
          </div>
          <CommunityItems setSlideIndex={setSlideIndex} />
        </div>
        <div className="overflow-none h-[calc(100dvh-80px)]">{children}</div>
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
                loading={isNotCommunityId || user?.id === null || user?.id === undefined}
                userId={user?.id || null}
                size="m"
                withOutText
              />
            </div>
          </ModalTrigger>
          <ModalContent variant="full" className="p-4 lg:p-6">
            <UserSettings />
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
};
