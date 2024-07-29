'use client';

import React, { ComponentProps } from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalFooter,
  ModalCloseButton,
} from '@xipkg/modal';
import { Button } from '@xipkg/button';
import { Close } from '@xipkg/icons';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { deleteQuery } from '@xipkg/routerurl';

type WelcomeModalPropsT = {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
} & ComponentProps<typeof Modal>;

export const WelcomeModal = ({ ...props }: WelcomeModalPropsT) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // При закрытии окна изменять значение в параметрах URL
  const onClose = () => {
    const updatedParams = deleteQuery(searchParams, 'welcome-modal');
    router.push(`${pathname}?${updatedParams}`);
  };

  return (
    <Modal {...props} onOpenChange={onClose}>
      <ModalContent className="max-w-[calc(100vw-16px)] xs:max-w-[440px] sm:max-w-[500px] md:max-w-[800px]" onOpenAutoFocus={(e) => e.preventDefault()}>
        <div className="flex flex-row items-center w-full md:h-[400px] max-h-[calc(100dvh-16px)] rounded-2xl overflow-auto md:overflow-hidden">
          <div className="hidden md:flex flex-col pl-6 pr-4">
            <div className="rounded-full h-[160px] w-[160px] bg-gray-10" />
            <div className="rounded-full h-[160px] w-[160px] bg-[url('/assets/welcome/welcome-modal-image.jpg')]" />
            <div className="rounded-full h-[160px] w-[160px] bg-gray-10" />
          </div>
          <div className="flex flex-col flex-1 w-full h-full">
            <ModalHeader className="md:border-b-0">
              <ModalTitle className="max-w-[230px] sm:max-w-fit">Добро пожаловать в xi.effect!</ModalTitle>
            </ModalHeader>
            <div className="p-6 text-l-base">
              <p className="block mb-2 md:mb-0">Наш сервис создан для того, чтобы обучение стало удобным, доступным и комфортным.</p>
              <p className="block mb-2 md:mb-0">Начните путь к новым вершинам вместе с нашей командой.</p>
              <p className="block">Для начала предлагаем пройти тур по сервису.</p>
            </div>
            <div className="md:hidden w-full min-h-[160px] flex flex-row justify-center items-center overflow-hidden mt-10 mb-[58px]">
              <div className="flex flex-row justify-center min-w-[480px]">
                <div className="rounded-full h-[160px] w-[160px] bg-gray-10" />
                <div className="rounded-full h-[160px] w-[160px] bg-[url('/assets/welcome/welcome-modal-image.jpg')]" />
                <div className="rounded-full h-[160px] w-[160px] bg-gray-10" />
              </div>
            </div>
            <ModalFooter className="flex flex-1 flex-row justify-end items-end gap-4 p-6 md:border-t-0">
              <Button className="w-[142px]" variant="ghost" onClick={onClose}>Пропустить</Button>
              <Button className="w-[106px]">Начать</Button>
            </ModalFooter>
          </div>
        </div>
        <ModalCloseButton onClick={onClose}>
          <Close className="fill-gray-80 sm:fill-white" />
        </ModalCloseButton>
      </ModalContent>
    </Modal>
  );
};
