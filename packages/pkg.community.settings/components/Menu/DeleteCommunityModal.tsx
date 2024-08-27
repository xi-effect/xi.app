import * as M from '@xipkg/modal';
import { Button } from '@xipkg/button';
import React from 'react';
import { Close } from '@xipkg/icons';

type DeleteCommunityModalPropsT = {
  isOpen: boolean;
  onOpenChange: (value: React.SetStateAction<boolean>) => void;
  onConfirm: () => void;
};

export const DeleteCommunityModal = ({
  isOpen,
  onConfirm,
  onOpenChange,
}: DeleteCommunityModalPropsT) => (
  <M.Modal open={isOpen} onOpenChange={onOpenChange}>
    <M.ModalContent className="flex w-full max-w-[400px] flex-col items-center gap-6 rounded-2xl p-8 text-center">
      <M.ModalCloseButton>
        <Close className="fill-gray-80 sm:fill-gray-0" />
      </M.ModalCloseButton>
      <M.ModalTitle>Удалить сообщество?</M.ModalTitle>
      <Button variant="error" className="text-gray-0 w-full" onClick={onConfirm}>
        <span className="text-l-base">Удалить</span>
      </Button>
      <Button
        variant="ghost"
        className="text-gray-80 h-auto px-1"
        onClick={() => onOpenChange(false)}
      >
        Вернуться назад
      </Button>
    </M.ModalContent>
  </M.Modal>
);
