import React from 'react';
import { useMedia } from 'pkg.utils';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
// eslint-disable-next-line import/no-extraneous-dependencies
import { deleteQuery } from 'pkg.router.url';
import { Header } from './components/Header';
import { Menu } from './components/Menu';
import { Content } from './components/Content';

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

    const category = searchParams.get('category');
    const handleClose = () => {
        setShowContent(false);
        const updatedParams = deleteQuery(deleteQuery(searchParams, 'profileIsOpen'), 'category');
        router.push(`${pathname}?${updatedParams}`);
    };

    const [activeQuery, setActiveQuery] = React.useState<string>(category || 'home');

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
              <div>
                {showContent ? (
                  <Content activeQuery={activeQuery} />
                            ) : (
                              <Menu
                                setActiveQuery={setActiveQuery}
                                activeQuery={activeQuery}
                                setActiveContent={setActiveContent}
                                setShowContent={setShowContent}
                                onExit={onExit}
                              />
                            )}
              </div>
                    ) : (
                      <>
                        <Menu
                          setActiveQuery={setActiveQuery}
                          activeQuery={activeQuery}
                          setActiveContent={setActiveContent}
                          setShowContent={setShowContent}
                          onExit={onExit}
                        />
                        <Content activeQuery={activeQuery} />
                      </>
                    )}
          </div>
        </div>
      </div>
    );
};
