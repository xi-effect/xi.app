'use client';

/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Modal, ModalContent } from '@xipkg/modal';
import { CommunitySettings } from 'pkg.community.settings';
import { useCommunityStore } from '../../store/communityStore';
import { DropdownMenuBasic } from '../Dropdown';

export const CommunityMenu = () => {
  const { isOpenCommunitySettings, setIsOpenCommunitySettings } = useCommunityStore();

  return (
    <>
      <Modal
        open={isOpenCommunitySettings}
        onOpenChange={() => setIsOpenCommunitySettings(!isOpenCommunitySettings)}
      >
        <ModalContent variant="full" className="p-4 lg:p-6">
          <CommunitySettings />
        </ModalContent>
      </Modal>

      <DropdownMenuBasic />
    </>
  );
};
