/* eslint-disable no-irregular-whitespace */
import React from 'react';
import { ChevronRight, Key, Mail } from '@xipkg/icons';
import { useMedia } from 'pkg.utils.client';
import { ChangePasswordModal } from 'pkg.modal.change-password';
import { ChangeEmailModal } from 'pkg.modal.change-email';
import { useMainSt } from 'pkg.stores';
import { ConfirmEmail } from './ConfirmEmail';

export const Secure = () => {
  const user = useMainSt((state) => state.user);
  const isMobile = useMedia('(max-width: 719px)', false);

  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] = React.useState(false);
  const [isChangeEmailModalOpen, setIsChangeEmailModalOpen] = React.useState(false);

  return (
    <>
      {!isMobile && <h1 className="mb-4 text-3xl font-semibold">Безопасность</h1>}
      <div className="flex flex-col gap-6 sm:gap-8">
        <ConfirmEmail buttonText="Оправить повторно" />
        <div className="border-gray-80 flex w-full flex-col rounded-2xl border p-1">
          <div className="flex w-full flex-col p-3">
            <span className="text-xl font-semibold">Данные аккаунта</span>
            <span className="text-sm font-normal">Видны только вам</span>
          </div>
          <ChangePasswordModal
            open={isChangePasswordModalOpen}
            onOpenChange={setIsChangePasswordModalOpen}
          >
            <button
              type="button"
              className="hover:bg-gray-5 flex h-[66px] flex-row items-center gap-4 rounded-xl bg-transparent p-3"
            >
              <Key size="l" className="fill-brand-80" />
              <div className="items-star flex flex-col">
                <span className="w-fit font-semibold">Пароль</span>
                <span className="text-xs font-normal">Обновлён год назад</span>
              </div>
              <ChevronRight className="fill-gray-80 ml-auto" />
            </button>
          </ChangePasswordModal>
          <ChangeEmailModal
            open={isChangeEmailModalOpen}
            onOpenChange={setIsChangeEmailModalOpen}
          >
            <button
              type="button"
              className="hover:bg-gray-5 flex h-[66px] flex-row items-center gap-4 rounded-xl bg-transparent p-3"
            >
              <Mail size="l" className="fill-brand-80" />
              <div className="items-star flex flex-col">
                <span className="w-fit font-semibold">Почта</span>
                <span className="text-xs font-normal">{user?.email}</span>
              </div>
              <ChevronRight className="fill-gray-80 ml-auto" />
            </button>
          </ChangeEmailModal>
        </div>
      </div>
    </>
  );
};
