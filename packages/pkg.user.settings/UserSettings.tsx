import React from 'react';
import { useMedia } from 'pkg.utils.client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { deleteQuery } from 'pkg.router.url';
import { Header } from './components/Header';
import { Menu } from './components/Menu';
import { Content } from './components/Content';

export const UserSettings = () => {
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
    <div className="flex w-full items-center justify-center">
      <div className="flex h-full min-h-full w-full max-w-[1132px] flex-col">
        <Header
          activeItem={activeContent}
          showContent={showContent}
          setShowContent={setShowContent}
          handleClose={handleClose}
        />
        <div className="mt-4 flex h-full flex-row">
          {isMobile ? (
            <div className="flex-1">
              {showContent ? (
                <Content activeQuery={activeQuery} />
              ) : (
                <Menu
                  setActiveQuery={setActiveQuery}
                  setActiveContent={setActiveContent}
                  setShowContent={setShowContent}
                />
              )}
            </div>
          ) : (
            <>
              <Menu
                setActiveQuery={setActiveQuery}
                setActiveContent={setActiveContent}
                setShowContent={setShowContent}
              />
              <Content activeQuery={activeQuery} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};
