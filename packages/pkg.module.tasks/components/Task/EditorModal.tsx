import React from 'react';
import * as M from '@xipkg/modal';
import { Button } from '@xipkg/button';
import { Close } from '@xipkg/icons';

export type EditorModalPropsT = {
  isOpen: boolean;
  onOpenChange: (value: React.SetStateAction<boolean>) => void;
  onConfirm: () => void;
};

export const EditorModal = ({ isOpen, onConfirm, onOpenChange }: EditorModalPropsT) => {
  console.log(1);
  return (
    <M.Modal open={isOpen} onOpenChange={onOpenChange} defaultOpen={false} modal>
      <M.ModalContent className="flex h-full max-w-[80%] flex-col">
        <M.ModalCloseButton>
          <Close className="fill-gray-80 sm:fill-gray-0" />
        </M.ModalCloseButton>
        <M.ModalHeader className="flex flex-row items-baseline gap-1">
          <M.ModalTitle className="text-xl-base">Создание ответа</M.ModalTitle>
          <span className="text-s-base text-gray-60 font-normal">Черновик сохранен в 16:10</span>
        </M.ModalHeader>

        <div className="flex h-full flex-col gap-6 p-6">
          <div className="flex flex-col gap-4 p-6 xl:px-[376px]">
            <h3 contentEditable className="text-h3 text-gray-30 outline-none">
              Введите название
            </h3>
            <span className="text-l-base text-gray-30">Нажмите Tab для выбора инструмента</span>
          </div>
        </div>

        <M.ModalFooter className="flex items-center justify-start gap-4">
          <Button onClick={onConfirm}>Сохранить</Button>
          <Button onClick={() => onOpenChange(false)} variant="secondary">
            Отменить
          </Button>
        </M.ModalFooter>
      </M.ModalContent>
    </M.Modal>
  );
};
