'use client';

import { Button } from '@xipkg/button';
import { Close } from '@xipkg/icons';
import * as M from '@xipkg/modal';
import { PropsWithChildren, useState } from 'react';
import Form from './components/Form';
import { useMainSt } from 'pkg.stores';

type ChangeEmailModalT = PropsWithChildren<{}>;

interface IEmailModalStage {
  type: string;
  email: string;
}

export const ChangeEmailModal = ({ children }: ChangeEmailModalT) => {
  const onEmailChange = useMainSt((state) => state.onEmailChange);
  const [stage, setStage] = useState<IEmailModalStage>({
    type: 'form',
    email: '',
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
            <Form onEmailChange={onEmailChange} setStage={setStage} />
          </>
        )) ||
          (stage.type === 'success' && (
            <div className="space-y-8 p-8">
              <p className="text-center text-2xl font-semibold text-gray-100">
                На адрес {stage.email} отправлено письмо с подтверждением
              </p>
              <Button onClick={() => setStage({ type: 'form', email: '' })} className="mt-4 w-full">
                Продолжить
              </Button>
            </div>
          ))}
      </M.ModalContent>
    </M.Modal>
  );
};
