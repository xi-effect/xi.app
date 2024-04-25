'use client';

import React, { PropsWithChildren, useState } from 'react';

import { Close } from '@xipkg/icons';
import * as M from '@xipkg/modal';

import Form from './components/Form';

export const InviteCommunityModal = ({ children }: PropsWithChildren) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <M.Modal open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
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
        <Form setIsOpen={setIsOpen} />
      </M.ModalContent>
    </M.Modal>
  );
};
