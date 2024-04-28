'use client';

import React from 'react';

import { Close } from '@xipkg/icons';
import * as M from '@xipkg/modal';

import { Form } from './components/Form';

type InviteCommunityModalPropsT = {
  open: boolean;
  onOpenChange: (value: React.SetStateAction<boolean>) => void;
};

export const InviteCommunityModal = ({ open, onOpenChange }: InviteCommunityModalPropsT) => (
  <M.Modal open={open} onOpenChange={onOpenChange}>
    <M.ModalContent className="w-full max-w-[639px] rounded-2xl">
      <M.ModalCloseButton>
        <Close className="fill-gray-80 sm:fill-gray-0" />
      </M.ModalCloseButton>
      <M.ModalHeader>
        <M.ModalTitle>Создание приглашения</M.ModalTitle>
      </M.ModalHeader>
      <Form setIsOpen={onOpenChange} />
    </M.ModalContent>
  </M.Modal>
);
