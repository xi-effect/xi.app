/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import * as M from '@xipkg/modal';
import { Button } from '@xipkg/button';
import { Close } from '@xipkg/icons';
import { Input } from '@xipkg/input';
import { ChannelT } from './types';

export type EditChannelModalPropsT = {
  isOpen: boolean;
  onOpenChange: (value: React.SetStateAction<boolean>) => void;
  onConfirm: (value: ChannelT) => void;
  channel: ChannelT;
};

export const EditChannelModal = ({
  isOpen,
  onConfirm,
  onOpenChange,
  channel,
}: EditChannelModalPropsT) => {
  const [channelName, setChannelName] = useState(channel.name);

  const handleConfirmUpdate = () => {
    onConfirm({ ...channel, name: channelName });
    onOpenChange(false);
  };

  return (
    <M.Modal open={isOpen} onOpenChange={onOpenChange}>
      <M.ModalContent>
        <M.ModalCloseButton>
          <Close className="fill-gray-80 sm:fill-gray-0" />
        </M.ModalCloseButton>
        <M.ModalHeader>
          <M.ModalTitle>Редактирование канала</M.ModalTitle>
        </M.ModalHeader>
        <div className="flex flex-col gap-1 p-6">
          <label>Название</label>
          <Input value={channelName} onChange={(e) => setChannelName(e.currentTarget.value)} />
        </div>
        <M.ModalFooter className="flex items-center justify-start gap-4">
          <Button disabled={!channelName} onClick={handleConfirmUpdate} className="w-full">
            Сохранить
          </Button>
        </M.ModalFooter>
      </M.ModalContent>
    </M.Modal>
  );
};
