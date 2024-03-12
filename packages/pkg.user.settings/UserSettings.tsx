import React from 'react';
import { Header } from './components/Header';
import { Menu } from './components/Menu';
import { Content } from './components/Content';
import { useMedia } from 'pkg.utils';

type UserSettingsT = {
  onExit: () => void;
};

export const UserSettings = ({  onExit }: UserSettingsT) => {
  const isMobile = useMedia('(max-width: 719px)', false);

  const [activeContent, setActiveContent] = React.useState<number>(0);
  const [showContent, setShowContent] = React.useState(false);

  return (
    <div className="flex w-full justify-center">
      <div className="flex h-full min-h-full w-full max-w-[1132px] flex-col">
        <Header
          activeItem={activeContent}
          showContent={showContent}
          setShowContent={setShowContent}
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
