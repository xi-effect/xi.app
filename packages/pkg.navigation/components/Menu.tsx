import { UserProfile } from '@xipkg/userprofile';
import { toast } from 'sonner';
import { Notification } from '@xipkg/icons';
import { Modal, ModalContent, ModalTrigger } from '@xipkg/modal';

import { CommunityItems, CommunityMenu } from './';

import { UserSettings } from 'pkg.user.settings';
import { Logo } from 'pkg.logo';
import { useMainSt } from 'pkg.stores';
import { useSessionStorage } from 'pkg.utils';

type MenuT = {
  slideIndex: number;
  setSlideIndex: (value: number) => void;
  onExit: () => void;
};

export const Menu = ({ onExit, setSlideIndex }: MenuT) => {
  const user = useMainSt((state) => state.user);

  return (
    <>
      <div id="header-logo" className="flex h-8 w-fit flex-wrap p-2">
        <Logo height={16} width={134} logoVariant="navigation" logoSize="default" />
      </div>
      <CommunityMenu />
      <CommunityItems setSlideIndex={setSlideIndex} />
      <div className="bg-gray-0 fixed bottom-0 flex flex-col pb-6 sm:w-[302px]">
        <Modal>
          <ModalTrigger asChild>
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
          className="text-gray-90 hover:bg-brand-0 hover:text-brand-80 group mx-1 mt-2 flex h-[40px] w-full flex-row items-center rounded-lg p-2 transition-colors ease-in hover:cursor-pointer"
        >
          <Notification className="group-hover:fill-brand-80 transition-colors ease-in" />
          <span className="pl-2 text-[14px] font-normal">Уведомления</span>
        </div> */}
      </div>
    </>
  );
};
