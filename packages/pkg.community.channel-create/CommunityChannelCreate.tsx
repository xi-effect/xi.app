import React, { ReactNode } from 'react';
import {
  Modal,
  ModalTrigger,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalTitle,
  ModalDescription,
  ModalCloseButton,
} from '@xipkg/modal';

import { Close } from '@xipkg/icons';
import { Button } from '@xipkg/button';

interface CommunityChannelCreateT {
  children: ReactNode;
}

export const CommunityChannelCreate = ({ children }: CommunityChannelCreateT) => {
  return (
    <Modal>
      <ModalTrigger className="bg-[transparent] flex justify-between w-full items-center">
        {children}
      </ModalTrigger>
      <ModalContent>
        <ModalHeader className="flex flex-row items-center justify-between ">
          <ModalTitle>Создание канала</ModalTitle>
          <ModalCloseButton className="static sm:fixed">
            <Close className="fill-[#404040] sm:fill-[#FFFFFF] " />
          </ModalCloseButton>
        </ModalHeader>
        <ModalDescription>Описание</ModalDescription>
        <p>Содержимое диалогового окна</p>
        <ModalFooter>
          <Button className="w-full">Создать</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
