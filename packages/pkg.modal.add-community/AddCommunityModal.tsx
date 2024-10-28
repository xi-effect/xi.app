'use client';

import { Button } from '@xipkg/button';
import { Close } from '@xipkg/icons';
import * as M from '@xipkg/modal';
import React, { useState } from 'react';
import FormCreate from './components/FormCreateStage';
import FormJoin from './components/FormJoinStage';

type AddCommunityModalT = {
  open: boolean;
  setModal: (modalType: string | null) => void;
};

export const AddCommunityModal = ({ open, setModal }: AddCommunityModalT) => {
  const [stage, setStage] = useState<'create' | 'join'>('create');

  const handleOpenChange = () => {
    setModal(null);
    setStage('create');
  };

  return (
    <M.Modal open={open} onOpenChange={handleOpenChange}>
      <M.ModalContent>
        <M.ModalCloseButton>
          <Close className="fill-gray-80 sm:fill-gray-0" />
        </M.ModalCloseButton>
        {stage === 'create' ? (
          <>
            <M.ModalHeader>
              <M.ModalTitle>Создание сообщества</M.ModalTitle>
            </M.ModalHeader>
            <FormCreate onOpenChange={handleOpenChange} />
            <div className="bg-gray-5 flex flex-col items-center rounded-b-[16px] p-8">
              <p className="text-xl font-semibold">У вас есть приглашение?</p>
              <Button
                className="ml-0 mt-4 w-full"
                variant="secondary"
                onClick={() => setStage('join')}
              >
                Присоединиться к сообществу
              </Button>
            </div>
          </>
        ) : (
          <>
            <M.ModalHeader>
              <M.ModalTitle className="max-w-60 min-[450px]:max-w-full">
                Присоединение к сообществу
              </M.ModalTitle>
            </M.ModalHeader>
            <FormJoin setStage={setStage} onOpenChange={handleOpenChange} />
          </>
        )}
      </M.ModalContent>
    </M.Modal>
  );
};
