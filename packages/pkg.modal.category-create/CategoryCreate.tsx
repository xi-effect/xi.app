'use client';

import React from 'react';
import * as M from '@xipkg/modal';
import { Close } from '@xipkg/icons';
import Form from './components/Form';

type CategoryCreatePropsT = {
  open: boolean;
  onOpenChange: (value: React.SetStateAction<boolean>) => void;
};

export const CategoryCreate = ({ open, onOpenChange }: CategoryCreatePropsT) => (
  <M.Modal open={open} onOpenChange={onOpenChange}>
    <M.ModalContent className="w-full max-w-[600px] gap-6 rounded-2xl">
      <M.ModalCloseButton>
        <Close className="fill-gray-80 sm:fill-gray-0" />
      </M.ModalCloseButton>
      <M.ModalHeader>
        <M.ModalTitle>Создание категории</M.ModalTitle>
      </M.ModalHeader>
      <Form />
    </M.ModalContent>
  </M.Modal>
);
