import * as M from '@xipkg/modal';
import { Close } from '@xipkg/icons';
import { Button } from '@xipkg/button';
import React from 'react';

export type DeleteParticipantModalPropsT = {
  open: boolean;
  onOpenChange: (value: React.SetStateAction<boolean>) => void;
  onConfirm: () => void;
};
export const DeleteParticipantModal = ({
  open,
  onOpenChange,
  onConfirm,
}: DeleteParticipantModalPropsT) => (
  <M.Modal open={open} onOpenChange={onOpenChange}>
    <M.ModalContent className="flex w-full max-w-[420px] flex-col gap-6 rounded-2xl p-8 text-center">
      <M.ModalCloseButton>
        <Close className="fill-gray-80 sm:fill-gray-0" />
      </M.ModalCloseButton>
      <M.ModalTitle>Исключить участника?</M.ModalTitle>
      <M.ModalDescription>
        <Button variant="error" className="w-full" onClick={onConfirm}>
          Исключить
        </Button>
      </M.ModalDescription>
      <M.ModalDescription>
        <Button onClick={() => onOpenChange(false)} variant="ghost" className="h-auto">
          Отмена
        </Button>
      </M.ModalDescription>
    </M.ModalContent>
  </M.Modal>
);
