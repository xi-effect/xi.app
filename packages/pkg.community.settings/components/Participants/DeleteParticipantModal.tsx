import * as M from '@xipkg/modal';
import { Close } from '@xipkg/icons';
import { Button } from '@xipkg/button';
import React from 'react';

const DeleteParticipantModal = (
    { open, onOpenChange, onConfirm }:
        {
            open: boolean,
            onOpenChange: (value: React.SetStateAction<boolean>) => void;
            onConfirm: () => void
}) => (
  <M.Modal open={open} onOpenChange={onOpenChange}>
    <M.ModalContent className="w-full max-w-[420px] rounded-2xl text-center flex flex-col gap-6 p-8">
      <M.ModalCloseButton>
        <Close className="fill-gray-80 sm:fill-gray-0" />
      </M.ModalCloseButton>
      <M.ModalTitle>Исключить участника?</M.ModalTitle>
      <M.ModalDescription>
        <Button variant="error" className="w-full" onClick={onConfirm}>Исключить</Button>
      </M.ModalDescription>
      <M.ModalDescription>
        <Button onClick={() => onOpenChange(false)} variant="ghost" className="h-auto">Отмена</Button>
      </M.ModalDescription>
    </M.ModalContent>
  </M.Modal>
    );

export default DeleteParticipantModal;
