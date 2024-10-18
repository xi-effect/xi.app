'use client';

import * as M from '@xipkg/modal';
import { Close } from '@xipkg/icons';
import { Form } from './components/Form';

type CategoryCreatePropsT = {
  open: boolean;
  onOpenChange: () => void;
};

export const CategoryCreate = ({ open, onOpenChange }: CategoryCreatePropsT) => (
  <M.Modal open={open} onOpenChange={onOpenChange}>
    <M.ModalContent className="w-full max-w-[600px] rounded-2xl">
      <M.ModalCloseButton>
        <Close className="fill-gray-80 sm:fill-gray-0" />
      </M.ModalCloseButton>
      <M.ModalHeader>
        <M.ModalTitle>Создание категории</M.ModalTitle>
      </M.ModalHeader>
      <Form onOpenChange={onOpenChange} />
    </M.ModalContent>
  </M.Modal>
);
