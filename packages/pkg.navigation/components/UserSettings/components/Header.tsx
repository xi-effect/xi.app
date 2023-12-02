import React from 'react';
import { Close } from '@xipkg/icons';
import { ModalCloseButton } from '@xipkg/modal';

export const Header = () => {
  return (
    <div className="relative h-[40px] w-full pb-4">
      <ModalCloseButton className="w-10 h-10 absolute bg-transparent flex p-2 right-0">
        <Close />
      </ModalCloseButton>
    </div>
  );
};
