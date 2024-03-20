'use client';

import { Button } from '@xipkg/button';
import { Close } from '@xipkg/icons';
import * as M from '@xipkg/modal';
import { PropsWithChildren, useState } from 'react';
import Form from './components/Form';

type ChangeEmailModalT = PropsWithChildren<{}>;

export const ChangeEmailModal = ({ children }: ChangeEmailModalT) => {
  const [stage, setStage] = useState<{ type: 'form' } | { type: 'success'; email: string }>({
    type: 'form',
  });

  return (
    <M.Modal>
      <M.ModalTrigger asChild>{children}</M.ModalTrigger>
      <M.ModalContent>
        {(stage.type === 'form' && (
          <>
            <M.ModalCloseButton>
              <Close className="fill-gray-80 sm:fill-gray-0" />
            </M.ModalCloseButton>
            <M.ModalHeader>
              <M.ModalTitle>Изменение электронной почты</M.ModalTitle>
            </M.ModalHeader>
            <Form />
            <M.ModalFooter className="flex justify-end gap-4">
              <Button variant={'secondary'}>Отменить</Button>
              <Button onClick={() => setStage({ type: 'success', email: 'someemail' })}>
                Изменить
              </Button>
            </M.ModalFooter>
          </>
        )) ||
          (stage.type === 'success' && (
            <div className="space-y-8 p-8">
              <p className="text-center text-2xl font-semibold text-gray-100">
                На адрес {stage.email} отправлено письмо с подтверждением
              </p>
              <Button onClick={() => setStage({ type: 'form' })} className="mt-4 w-full">
                Продолжить
              </Button>
            </div>
          ))}
      </M.ModalContent>
    </M.Modal>
  );
};
