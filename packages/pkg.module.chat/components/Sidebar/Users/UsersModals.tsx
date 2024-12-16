import React from 'react';
import { Close } from '@xipkg/icons';
import * as M from '@xipkg/modal';
import { useInterfaceStore } from '../../../stores/interfaceStore';
import { User } from './User';

export const UsersModals = () => {
  const currentSidebar = useInterfaceStore((state) => state.currentSidebar);
  const setCurrentSidebar = useInterfaceStore((state) => state.setCurrentSidebar);
  return (
    <M.Modal open={currentSidebar === 'users' && window.innerWidth < 959}>
      <M.ModalContent>
        <M.ModalCloseButton
          onClick={() => {
            setCurrentSidebar(null);
          }}
        >
          <Close className="fill-gray-80 sm:fill-gray-0" />
        </M.ModalCloseButton>
        <M.ModalHeader>
          <M.ModalTitle>Участники</M.ModalTitle>
        </M.ModalHeader>
        <div className="max-h-[calc(100vh-182px)] space-y-6 overflow-auto p-6">
          <User />
        </div>
      </M.ModalContent>
    </M.Modal>
  );
};
