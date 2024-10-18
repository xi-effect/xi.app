import React, { useCallback } from 'react';
import { AddCommunityModal } from 'pkg.modal.add-community';
import { InviteCommunityModal } from 'pkg.modal.invite-community';
import { CategoryCreate } from 'pkg.modal.category-create';
import { CommunityChannelCreate } from 'pkg.community.channel-create';
import { CommunitySettingsModal } from './components/Community/CommunitySettingsModal';
import { useCommunityStore } from './store/communityStore';
import {
  CATEGORY_CREATE,
  CHANNEL_CREATE,
  INVITE_COMMUNITY,
  ADD_COMMUNITY,
  OPEN_COMMUNITY_SETTINGS,
} from './store/modalConst';

export const NavigationModalsProvider = ({ children }: { children: React.ReactNode }) => {
  const { modal, setModal } = useCommunityStore();

  const closeModal = useCallback(() => setModal(null), []);

  return (
    <>
      <CommunitySettingsModal open={modal === OPEN_COMMUNITY_SETTINGS} onOpenChange={closeModal} />
      <CategoryCreate open={modal === CATEGORY_CREATE} onOpenChange={closeModal} />
      <CommunityChannelCreate open={modal === CHANNEL_CREATE} onOpenChange={closeModal} />
      <InviteCommunityModal open={modal === INVITE_COMMUNITY} onOpenChange={closeModal} />
      <AddCommunityModal open={modal === ADD_COMMUNITY} setModal={setModal} />
      {children}
    </>
  );
};
