'use client';

import React, { ReactNode } from 'react';
import * as M from '@xipkg/modal';
import { Close } from '@xipkg/icons';
import Form from './components/Form';

type CategoryCreatePropsT = {
  children: ReactNode;
};

export const CategoryCreate = ({ children }: CategoryCreatePropsT) => {
  return (
    <M.Modal>
      <M.ModalTrigger className="flex w-full items-center justify-between bg-transparent">
        {children}
      </M.ModalTrigger>
      <M.ModalContent className="w-full max-w-[600px] gap-6 rounded-2xl">
        <M.ModalCloseButton>
          <Close className="fill-gray-80 sm:fill-gray-0" />
        </M.ModalCloseButton>
        <M.ModalHeader>
          <M.ModalTitle>Редактирование категории</M.ModalTitle>
        </M.ModalHeader>
        <Form />
      </M.ModalContent>
    </M.Modal>
  );
};
