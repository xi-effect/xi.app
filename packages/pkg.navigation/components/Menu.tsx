import { UserProfile } from '@xipkg/userprofile';
import { Modal, ModalContent, ModalTrigger } from '@xipkg/modal';

import { UserSettings } from 'pkg.user.settings';
import { Logo } from 'pkg.logo';
import { useMainSt } from 'pkg.stores';
import { CommunityItems, CommunityMenu } from '.';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { createQueryString } from 'pkg.router.url';

type MenuT = {
  setSlideIndex: (value: number) => void;
  onExit: () => void;
};

export const Menu = ({ onExit, setSlideIndex }: MenuT) => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const user = useMainSt((state) => state.user);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const profileIsOpenValue: string | null = searchParams.get('profileIsOpen');

  useEffect(() => {
    const profileIsOpen = searchParams.has('profileIsOpen');
    setMenuIsOpen(profileIsOpen);
  }, [searchParams]);

  return (
    <>
      <div id="header-logo" className="flex h-8 w-fit flex-wrap p-2">
        <Logo height={16} width={134} logoVariant="navigation" logoSize="default" />
      </div>
      <CommunityMenu />
      <CommunityItems setSlideIndex={setSlideIndex} />
      <div className="bg-gray-0 fixed bottom-0 flex flex-col pb-6 sm:w-[302px]">
        <Modal open={menuIsOpen}>
          <ModalTrigger
            onClick={() => {
              setMenuIsOpen(true);
              router.push(
                pathname +
                  '?' +
                  createQueryString(
                    searchParams,
                    'profileIsOpen',
                    profileIsOpenValue ? String(profileIsOpenValue) : 'true',
                  ) +
                  '&' +
                  createQueryString(searchParams, 'category', 'home'),
              );
            }}
            asChild
          >
            <div
              id="user-profile-menu"
              className="hover:bg-gray-5 h-[48px] w-full rounded-lg p-2 hover:cursor-pointer"
            >
              <UserProfile
                userId={user.id}
                text={user.displayName}
                label={user.username}
                size="m"
              />
            </div>
          </ModalTrigger>
          <ModalContent variant="full" className="p-4 lg:p-6">
            <UserSettings onExit={onExit} />
          </ModalContent>
        </Modal>
        {/* <div
          id="notification-menu"
          onClick={() => toast(`Уведомления пока в разработке`)}
          className="text-gray-90 hover:bg-brand-0 hover:text-brand-80
          group mx-1 mt-2 flex h-[40px] w-full flex-row items-center
          rounded-lg p-2 transition-colors
          ease-in hover:cursor-pointer"
        >
          <Notification className="group-hover:fill-brand-80 transition-colors ease-in" />
          <span className="pl-2 text-[14px] font-normal">Уведомления</span>
        </div> */}
      </div>
    </>
  );
};
