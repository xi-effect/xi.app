'use client';

import { Button } from '@xipkg/button';
import { Close } from '@xipkg/icons';
import * as M from '@xipkg/modal';
import { PropsWithChildren, useState } from 'react';
import Form from './components/Form';

type ChangeEmailModalT = PropsWithChildren<{}>;

export const ChangeEmailModal = (props: ChangeEmailModalT) => {
  const [stage, setStage] = useState<{ type: 'form' } | { type: 'success'; email: string }>({
    type: 'form',
  });

  return (
    <M.Modal>
      <M.ModalTrigger asChild>{props.children}</M.ModalTrigger>
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
            <M.ModalFooter className="gap-4 flex justify-end">
              <Button variant={'secondary'}>Отменить</Button>
              <Button onClick={() => setStage({ type: 'success', email: 'someemail' })}>
                Изменить
              </Button>
            </M.ModalFooter>
          </>
        )) ||
          (stage.type === 'success' && (
            <div className="p-8 space-y-8">
              <p className="text-2xl text-center font-semibold text-gray-100">
                На адрес {stage.email} отправлено письмо с подтверждением
              </p>
              <Button onClick={() => setStage({ type: 'form' })} className="w-full mt-4">
                Продолжить
              </Button>
            </div>
          ))}
      </M.ModalContent>
    </M.Modal>
  );
};
