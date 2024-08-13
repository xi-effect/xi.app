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

export const DeletePostModal = ({ children } : DeletePostModalPropsT) => (
  <Modal>
    <ModalTrigger className="hover:bg-transparent" asChild>{children}</ModalTrigger>
    <ModalContent
      className="w-[420px] md:w-[420px] max-w-[calc(100vw-16px)] max-h-[calc(100dvh-16px)] flex flex-col gap-4 justify-center items-center p-8 pb-5"
      onOpenAutoFocus={(e) => e.preventDefault()}
    >
      <ModalHeader className="border-none p-0">
        <ModalTitle className="text-center text-xl-base">Удалить объявление</ModalTitle>
      </ModalHeader>
      <Button className="w-full" variant="error" size="l">Удалить</Button>
      <ModalCloseButton asChild className="static bg-transparent sm:bg-transparent h=[48px]">
        <Button className="w-full h-[48px] rounded-[12px]" variant="ghost" size="m">Отменить</Button>
      </ModalCloseButton>
    </ModalContent>
  </Modal>
);
