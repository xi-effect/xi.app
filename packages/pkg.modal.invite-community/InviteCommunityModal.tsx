'use client';

/* eslint-disable camelcase */

import React from 'react';

import { useMainSt } from 'pkg.stores';
import { toast } from 'sonner';

import { Close } from '@xipkg/icons';
import * as M from '@xipkg/modal';
import { Form } from './components/Form';

type InviteCommunityModalPropsT = {
  open: boolean;
  onOpenChange: (value: React.SetStateAction<boolean>) => void;
  handleInviteCreate?: (requestData: {
    community_id: number | null;
    data: { expiry: string | null; usage_limit: string | null };
  }) => void;
};

export const InviteCommunityModal = ({
  open,
  onOpenChange,
  handleInviteCreate,
}: InviteCommunityModalPropsT) => {
  const socket = useMainSt((state) => state.socket);

  const defaultHandleInviteCreate = (requestData: {
    community_id: number | null;
    data: { expiry: string | null; usage_limit: string | null };
  }) => {
    const { community_id, data } = requestData;

    if (!socket) {
      console.error('Socket is not defined');
      return;
    }

    socket.emit(
      'create-invitation',
      {
        community_id,
        data,
      },
      (status: number) => {
        if (status === 200) {
          onOpenChange(false);
        } else {
          toast('Не удалось создать приглашение');
        }
      },
    );
  };

  const inviteCreateHandler = handleInviteCreate || defaultHandleInviteCreate;

  return (
    <M.Modal open={open} onOpenChange={onOpenChange}>
      <M.ModalContent className="w-full max-w-[639px] rounded-2xl">
        <M.ModalCloseButton>
          <Close className="fill-gray-80 sm:fill-gray-0" />
        </M.ModalCloseButton>
        <M.ModalHeader>
          <M.ModalTitle>Создание приглашения</M.ModalTitle>
        </M.ModalHeader>
        <Form setIsOpen={onOpenChange} handleInviteCreate={inviteCreateHandler} />
      </M.ModalContent>
    </M.Modal>
  );
};
