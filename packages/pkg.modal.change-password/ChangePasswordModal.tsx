'use client';

import { Button } from '@xipkg/button';
import { Close } from '@xipkg/icons';
import * as M from '@xipkg/modal';
import { PropsWithChildren, useState } from 'react';
import Form from './components/Form';

type ChangePasswordModalT = PropsWithChildren<{}>;

export const ChangePasswordModal = (props: ChangePasswordModalT) => {
  const [stage, setStage] = useState<'form' | 'success'>('form');

  return (
    <M.Modal>
      <M.ModalTrigger asChild>{props.children}</M.ModalTrigger>
      <M.ModalContent>
        {(stage === 'form' && (
          <>
            <M.ModalCloseButton>
              <Close className="fill-gray-80 sm:fill-gray-0" />
            </M.ModalCloseButton>
            <M.ModalHeader>
              <M.ModalTitle>Изменение пароля</M.ModalTitle>
            </M.ModalHeader>
            <Form />
            <M.ModalFooter className="gap-4 flex justify-end">
              <Button variant={'secondary'}>Отменить</Button>
              <Button onClick={() => setStage('success')}>Изменить</Button>
            </M.ModalFooter>
          </>
        )) ||
          (stage === 'success' && (
            <div className="p-8 space-y-8 border-t border-gray-20">
              <p className="text-2xl text-center font-semibold text-gray-100">Пароль изменён</p>
              <Button onClick={() => setStage('success')} className="w-full mt-4">
                Продолжить
              </Button>
            </div>
          ))}
      </M.ModalContent>
    </M.Modal>
  );
};
