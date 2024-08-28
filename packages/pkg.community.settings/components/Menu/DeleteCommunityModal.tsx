import * as M from '@xipkg/modal';
import { Button } from '@xipkg/button';
import React from 'react';
import { Close } from '@xipkg/icons';

type DeleteCommunityModalPropsT = {
  isOpen: boolean;
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
  onConfirm: () => void;
};

export const DeleteCommunityModal = ({
  isOpen,
  onConfirm,
  onOpenChange,
}: DeleteCommunityModalPropsT) => (
  <M.Modal open={isOpen} onOpenChange={onOpenChange}>
    <M.ModalContent className="flex w-full max-w-[400px] flex-col gap-6 rounded-2xl p-8 pb-5 text-center">
      <M.ModalCloseButton>
        <Close className="fill-gray-80 sm:fill-gray-0" />
      </M.ModalCloseButton>
      <M.ModalTitle className="text-2xl">Удалить сообщество?</M.ModalTitle>
      <div className="flex flex-col gap-2.5">
        <Button variant="error" className="text-gray-0 w-full" onClick={onConfirm}>
          <span className="text-l-base">Удалить</span>
        </Button>
        <Button variant="ghost" className="text-gray-80 w-full" onClick={() => onOpenChange(false)}>
          <span className="text-m-base">Вернуться назад</span>
        </Button>
      </div>
    </M.ModalContent>
  </M.Modal>
);
