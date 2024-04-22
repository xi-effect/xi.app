'use client';

import React, { PropsWithChildren } from 'react';

import { Close } from '@xipkg/icons';
import * as M from '@xipkg/modal';

import Form from './components/Form';

type InviteCommunityModalT = PropsWithChildren<{
  // open: boolean;
  // onOpenChange: (value: boolean) => void;
}>;

export const InviteCommunityModal = ({ children }: InviteCommunityModalT) => (
  <M.Modal>
    <M.ModalTrigger className="flex w-full items-center justify-between bg-transparent">
      {children}
    </M.ModalTrigger>
    <M.ModalContent className="w-full max-w-[600px] rounded-2xl">
      <M.ModalCloseButton>
        <Close className="fill-gray-80 sm:fill-gray-0" />
      </M.ModalCloseButton>
      <M.ModalHeader>
        <M.ModalTitle>Создание приглашения</M.ModalTitle>
      </M.ModalHeader>
      <Form />
    </M.ModalContent>
  </M.Modal>
);
