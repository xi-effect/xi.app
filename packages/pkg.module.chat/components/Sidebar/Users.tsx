import React from 'react';
import { Close } from '@xipkg/icons';
import * as M from '@xipkg/modal';
import { UserProfile } from '@xipkg/userprofile';
import { useMainSt } from 'pkg.stores';
import { useInterfaceStore } from '../../stores/interfaceStore';

export const Users = () => {
  const currentSidebar = useInterfaceStore((state) => state.currentSidebar);
  const setCurrentSidebar = useInterfaceStore((state) => state.setCurrentSidebar);

  const user = useMainSt((state) => state.user);

  return (
    <div className="mx-auto w-full max-w-xl p-4">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <span className="text-m-base font-semibold">Преподаватели</span>
          <div className="flex gap-2">
            <div className="ml-auto flex h-[32px] w-[32px] content-center items-center">
              <UserProfile
                loading={user?.id === null || user?.id === undefined}
                userId={user?.id || null}
                size="m"
                withOutText
              />
            </div>

            <div className="flex-1">
              <div className="flex items-center">
                <span className="text-s-base font-semibold">Анна Иванова</span>
              </div>
              <p className="text-xxs-base text-gray-60 relative">@ivanova.a</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-m-base font-semibold">Студенты</span>
          <div className="flex gap-2">
            <div className="ml-auto flex h-[32px] w-[32px] content-center items-center">
              <UserProfile
                loading={user?.id === null || user?.id === undefined}
                userId={user?.id || null}
                size="m"
                withOutText
              />
            </div>

            <div className="flex-1">
              <div className="flex items-center">
                <span className="text-s-base font-semibold">Сергей Антипин</span>
              </div>
              <p className="text-xxs-base text-gray-60 relative">@antipin</p>
            </div>
          </div>
        </div>
      </div>

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
          <div className="flex flex-col gap-8 p-6">
            <div className="flex flex-col gap-2">
              <span className="text-m-base font-semibold">Преподаватели</span>
              <div className="flex gap-2">
                <div className="ml-auto flex h-[32px] w-[32px] content-center items-center">
                  <UserProfile
                    loading={user?.id === null || user?.id === undefined}
                    userId={user?.id || null}
                    size="m"
                    withOutText
                  />
                </div>

                <div className="flex-1">
                  <div className="flex items-center">
                    <span className="text-s-base font-semibold">Анна Иванова</span>
                  </div>
                  <p className="text-xxs-base text-gray-60 relative">@ivanova.a</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-m-base font-semibold">Студенты</span>
              <div className="flex gap-2">
                <div className="ml-auto flex h-[32px] w-[32px] content-center items-center">
                  <UserProfile
                    loading={user?.id === null || user?.id === undefined}
                    userId={user?.id || null}
                    size="m"
                    withOutText
                  />
                </div>

                <div className="flex-1">
                  <div className="flex items-center">
                    <span className="text-s-base font-semibold">Сергей Антипин</span>
                  </div>
                  <p className="text-xxs-base text-gray-60 relative">@antipin</p>
                </div>
              </div>
            </div>
          </div>
        </M.ModalContent>
      </M.Modal>
    </div>
  );
};
