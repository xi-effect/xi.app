'use client';

import { Button } from '@xipkg/button';
import { Close } from '@xipkg/icons';
import * as M from '@xipkg/modal';
import React, { useState } from 'react';
import Form from './components/Form';

type ChangePasswordModalT = {
  open: boolean;
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactElement<HTMLButtonElement>;
};

export const ChangePasswordModal = ({ open, onOpenChange, children }: ChangePasswordModalT) => {
  const [stage, setStage] = useState<'form' | 'success'>('form');

  return (
    <M.Modal open={open} onOpenChange={(value) => onOpenChange(value)}>
      <M.ModalTrigger asChild>{children}</M.ModalTrigger>
      <M.ModalContent>
        {(stage === 'form' && (
          <>
            <M.ModalCloseButton>
              <Close className="fill-gray-80 sm:fill-gray-0" />
            </M.ModalCloseButton>
            <M.ModalHeader>
              <M.ModalTitle>Изменение пароля</M.ModalTitle>
            </M.ModalHeader>
            <Form setStage={setStage} onOpenChange={onOpenChange} />
            {/* <M.ModalFooter className="flex justify-end gap-4">
              <Button variant="secondary">Отменить</Button>
              <Button onClick={() => setStage('success')}>Изменить</Button>
            </M.ModalFooter> */}
          </>
        )) ||
          (stage === 'success' && (
            <div className="border-gray-20 space-y-8 border-t p-8">
              <p className="text-center text-2xl font-semibold text-gray-100">Пароль изменён</p>
              <Button
                onClick={() => {
                  onOpenChange(false);
                  setStage('form');
                }}
                className="mt-4 w-full"
              >
                Продолжить
              </Button>
            </div>
          ))}
      </M.ModalContent>
    </M.Modal>
  );
};
