'use client';
/* eslint-disable react/jsx-no-useless-fragment */
import React from 'react';
import { useMedia } from 'pkg.utils';
import { Header } from './components/Header';
import { Menu } from './components/Menu';
import { Content } from './components/Content';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { deleteQuery } from 'pkg.router.url';

type UserSettingsT = {
  onExit: () => void;
};

export const UserSettings = ({ onExit }: UserSettingsT) => {
  const isMobile = useMedia('(max-width: 719px)', false);
  const [activeContent, setActiveContent] = React.useState<number>(0);
  const [showContent, setShowContent] = React.useState(false);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const handleClose = () => {
    setShowContent(false);
    router.push(pathname + '?' + deleteQuery(searchParams, 'profileIsOpen'));
  };

  return (
    <div className="flex w-full justify-center">
      <div className="flex h-full min-h-full w-full max-w-[1132px] flex-col">
        <Header
          activeItem={activeContent}
          showContent={showContent}
          setShowContent={setShowContent}
          handleClose={handleClose}
        />
        <div className="mt-4 flex flex-row">
          {isMobile ? (
            <>
              {showContent ? (
                <Content activeContent={activeContent} />
              ) : (
                <Menu
                  activeContent={activeContent}
                  setActiveContent={setActiveContent}
                  setShowContent={setShowContent}
                  onExit={onExit}
                />
              )}
            </>
          ) : (
            <>
              <Menu
                activeContent={activeContent}
                setActiveContent={setActiveContent}
                setShowContent={setShowContent}
                onExit={onExit}
              />
              <Content activeContent={activeContent} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};
