'use client';

/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import { Modal, ModalContent } from '@xipkg/modal';
import { CategoryCreate } from 'pkg.modal.category-create';
import { CommunitySettings } from 'pkg.community.settings';
import { AddCommunityModal } from 'pkg.modal.add-community';
import { CommunityChannelCreate } from 'pkg.community.channel-create';
import { InviteCommunityModal } from 'pkg.modal.invite-community';

import { useCommunityStore } from '../../store/communityStore';
import { DropdownMenuBasic } from '../Dropdown';

export const CommunityMenu = () => {
  const {
    isOpenCommunitySettings,
    isInviteCommunityModalOpen,
    isAddCommunityModalOpen,
    isCategoryCreateOpen,
    isCommunityChannelCreateOpen,
    setIsOpenCommunitySettings,
    setIsInviteCommunityModalOpen,
    setIsAddCommunityModalOpen,
    setIsCategoryCreateOpen,
    setIsCommunityChannelCreateOpen,
  } = useCommunityStore();

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
      <CategoryCreate
        open={isCategoryCreateOpen}
        onOpenChange={() => setIsCategoryCreateOpen(!isCategoryCreateOpen)}
      />
      <CommunityChannelCreate
        open={isCommunityChannelCreateOpen}
        onOpenChange={() => setIsCommunityChannelCreateOpen(!isCommunityChannelCreateOpen)}
      />
      <InviteCommunityModal
        open={isInviteCommunityModalOpen}
        onOpenChange={() => setIsInviteCommunityModalOpen(!isInviteCommunityModalOpen)}
      />
      <AddCommunityModal
        open={isAddCommunityModalOpen}
        onOpenChange={() => setIsAddCommunityModalOpen(!isAddCommunityModalOpen)}
      />
      <DropdownMenuBasic />
    </>
  );
};
