import * as M from '@xipkg/modal';
import { Button } from '@xipkg/button';
import React from 'react';

export type DeleteTaskModalPropsT = {
  isOpen: boolean;
  onOpenChange: (value: React.SetStateAction<boolean>) => void;
  onConfirm: () => void;
};

export const DeleteTaskModal = ({ isOpen, onConfirm, onOpenChange }: DeleteTaskModalPropsT) => (
  <M.Modal open={isOpen} onOpenChange={onOpenChange}>
    <M.ModalContent className="flex w-full max-w-[420px] flex-col gap-4 rounded-2xl p-8 text-center">
      <Button variant="error" className="w-full" onClick={onConfirm}>
        Удалить задание
      </Button>
      <Button variant="ghost" onClick={() => onOpenChange(false)}>
        Отменить
      </Button>
    </M.ModalContent>
  </M.Modal>
);
