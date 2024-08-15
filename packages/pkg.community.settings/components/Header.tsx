/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { ArrowLeft, Close } from '@xipkg/icons';
import { ModalCloseButton } from '@xipkg/modal';
import { Button } from '@xipkg/button';
import { useInterfaceStore } from '../interfaceStore';

const menuLabels = ['Главная', 'Безопасность', 'Участники']; // 'Роли',

const buttonStyles =
  'right-[16px] ml-auto flex h-10 w-10 bg-transparent p-2 sm:absolute sm:right-0 sm:top-0 sm:bg-transparent xl:right-[-56px] xl:top-0';

export const Header = () => {
  const page = useInterfaceStore((state) => state.page);
  const isMenu = useInterfaceStore((state) => state.isMenu);
  const isCloseActive = useInterfaceStore((state) => state.isCloseActive);
  const setIsMenu = useInterfaceStore((state) => state.setIsMenu);
  const setIsAnimate = useInterfaceStore((state) => state.setIsAnimate);

  const createAnimation = () => {
    setIsAnimate(true);

    setTimeout(() => {
      setIsAnimate(false);
    }, 2000);
  };

  const handleArrow = () => {
    if (isCloseActive) {
      return setIsMenu(true);
    }

    return createAnimation();
  };

  return (
    <div className="relative flex h-[40px] w-full items-center justify-start">
      {!isMenu && (
        <button
          type="button"
          onClick={handleArrow}
          className="flex h-10 w-10 bg-transparent p-2 sm:hidden"
        >
          <ArrowLeft />
        </button>
      )}
      {!isMenu && (
        <span className="ml-4 flex font-semibold sm:hidden">{menuLabels[Number(page)]}</span>
      )}
      {isCloseActive ? (
        <ModalCloseButton variant="full" className={buttonStyles}>
          <Close />
        </ModalCloseButton>
      ) : (
        <Button variant="ghost" onClick={createAnimation} className={buttonStyles}>
          <Close />
        </Button>
      )}
    </div>
  );
};
