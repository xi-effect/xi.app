import React from 'react';
import { AddCommunityModal } from 'pkg.modal.add-community';
import { InviteCommunityModal } from 'pkg.modal.invite-community';
import { CategoryCreate } from 'pkg.modal.category-create';
import { CommunityChannelCreate } from 'pkg.community.channel-create';
import { useCommunityStore } from './store/communityStore';

export const NavigationModalsProvider = ({ children }: { children: React.ReactNode }) => {
  const {
    isInviteCommunityModalOpen,
    isAddCommunityModalOpen,
    isCategoryCreateOpen,
    isCommunityChannelCreateOpen,
    setIsInviteCommunityModalOpen,
    setIsAddCommunityModalOpen,
    setIsCategoryCreateOpen,
    setIsCommunityChannelCreateOpen,
  } = useCommunityStore();

  return (
    <>
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
        setIsAddCommunityModalOpen={setIsAddCommunityModalOpen}
      />
      {children}
    </>
  );
};
