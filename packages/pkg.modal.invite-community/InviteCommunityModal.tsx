'use client';

import React from 'react';

import { Close } from '@xipkg/icons';
import * as M from '@xipkg/modal';

import { Form } from './components/Form';

type InviteCommunityModalPropsT = {
  open: boolean;
  onOpenChange: (value: React.SetStateAction<boolean>) => void;
  handleInviteCreate: (requestData: {
    community_id: number | null;
    data: { expiry: string | null; usage_limit: string | null };
  }) => void;
};

export const InviteCommunityModal = ({
  open,
  onOpenChange,
  handleInviteCreate,
}: InviteCommunityModalPropsT) => (
  <M.Modal open={open} onOpenChange={onOpenChange}>
    <M.ModalContent className="w-full max-w-[639px] rounded-2xl">
      <M.ModalCloseButton>
        <Close className="fill-gray-80 sm:fill-gray-0" />
      </M.ModalCloseButton>
      <M.ModalHeader>
        <M.ModalTitle>Создание приглашения</M.ModalTitle>
      </M.ModalHeader>
      <Form setIsOpen={onOpenChange} handleInviteCreate={handleInviteCreate} />
    </M.ModalContent>
  </M.Modal>
);
