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
import Image from 'next/image';
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
    router.replace(`${pathname}?${updatedParams}`);
  };

  return (
    <Modal {...props} onOpenChange={onClose}>
      <ModalContent
        className="xs:max-w-[440px] max-w-[calc(100vw-16px)] sm:max-w-[500px] md:max-w-[800px]"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <div className="flex max-h-[calc(100dvh-16px)] w-full flex-row items-center overflow-auto rounded-2xl md:h-[400px] md:overflow-hidden">
          <div className="hidden flex-col pl-6 pr-4 md:flex">
            <div className="bg-gray-10 h-[160px] w-[160px] rounded-full" />
            <Image
              className="rounded-full"
              height={160}
              width={160}
              src="/assets/welcome/welcome-modal-image.webp"
              alt="Девушка проходит тур по сервису"
            />
            <div className="bg-gray-10 h-[160px] w-[160px] rounded-full" />
          </div>
          <div className="flex h-full w-full flex-1 flex-col">
            <ModalHeader className="md:border-b-0">
              <ModalTitle className="max-w-[230px] sm:max-w-fit">
                Добро пожаловать в xi.effect!
              </ModalTitle>
            </ModalHeader>
            <div className="text-l-base p-6">
              <p className="mb-2 block md:mb-0">
                Наш сервис создан для того, чтобы обучение стало удобным, доступным и комфортным.
              </p>
              <p className="mb-2 block md:mb-0">
                Начните путь к новым вершинам вместе с нашей командой.
              </p>
              <p className="block">Для начала предлагаем пройти тур по сервису.</p>
            </div>
            <div className="mb-[58px] mt-10 flex min-h-[160px] w-full flex-row items-center justify-center overflow-hidden md:hidden">
              <div className="flex min-w-[480px] flex-row justify-center">
                <div className="bg-gray-10 h-[160px] w-[160px] rounded-full" />
                <Image
                  className="rounded-full"
                  height={160}
                  width={160}
                  src="/assets/welcome/welcome-modal-image.webp"
                  alt="Девушка проходит тур по сервису"
                />
                <div className="bg-gray-10 h-[160px] w-[160px] rounded-full" />
              </div>
            </div>
            <ModalFooter className="flex flex-1 flex-row items-end justify-end gap-4 p-6 md:border-t-0">
              <Button className="w-[142px]" variant="ghost" onClick={onClose}>
                Пропустить
              </Button>
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
