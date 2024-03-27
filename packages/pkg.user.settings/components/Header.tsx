/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { Dispatch, SetStateAction } from 'react';
import { ArrowLeft, Close } from '@xipkg/icons';
import { ModalCloseButton } from '@xipkg/modal';
import { useMedia } from 'pkg.utils';

const menuLabels = ['Главная', 'Личные данные', 'Безопасность'];

type HeaderPropsT = {
  activeItem: number | 'menu';
  showContent: boolean;
  setShowContent: Dispatch<SetStateAction<boolean>>;
  handleClose: () => void;
};

export const Header = ({ activeItem, showContent, setShowContent, handleClose }: HeaderPropsT) => {
  const isMobile = useMedia('(max-width: 719px)');

  return (
    <div className="relative flex h-[40px] w-full items-center justify-start sm:mt-4">
      {isMobile && showContent && (
        <button
          type="button"
          onClick={() => setShowContent(false)}
          className="h-10 w-10 bg-transparent p-2"
        >
          <ArrowLeft />
        </button>
      )}
      {isMobile && showContent && (
        <span className="ml-4 font-semibold">{menuLabels[Number(activeItem)]}</span>
      )}
      <ModalCloseButton
        onClick={() => handleClose()}
        variant="full"
        className="right-[16px] ml-auto flex h-10 w-10 bg-transparent p-2 sm:absolute sm:right-0 sm:top-0 sm:bg-transparent xl:right-[-56px] xl:top-0"
      >
        <Close />
      </ModalCloseButton>
    </div>
  );
};
