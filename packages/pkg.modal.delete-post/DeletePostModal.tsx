'use client';

import React from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalCloseButton,
  ModalTrigger,
} from '@xipkg/modal';
import { Button } from '@xipkg/button';

type DeletePostModalPropsT = {
  children: React.ReactNode;
};

export const DeletePostModal = ({ children }: DeletePostModalPropsT) => (
  <Modal>
    <ModalTrigger className="hover:bg-transparent" asChild>
      {children}
    </ModalTrigger>
    <ModalContent
      className="flex max-h-[calc(100dvh-16px)] w-[420px] max-w-[calc(100vw-16px)] flex-col items-center justify-center gap-4 p-8 pb-5 md:w-[420px]"
      onOpenAutoFocus={(e) => e.preventDefault()}
    >
      <ModalHeader className="border-none p-0">
        <ModalTitle className="text-xl-base text-center">Удалить объявление</ModalTitle>
      </ModalHeader>
      <Button className="w-full" variant="error" size="l">
        Удалить
      </Button>
      <ModalCloseButton asChild className="static h-[48px] bg-transparent sm:bg-transparent">
        <Button className="h-[48px] w-full rounded-[12px]" variant="ghost" size="m">
          Отменить
        </Button>
      </ModalCloseButton>
    </ModalContent>
  </Modal>
);
