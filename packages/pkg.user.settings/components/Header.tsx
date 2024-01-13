import React, { Dispatch, SetStateAction } from 'react';
import { ArrowLeft, Close } from '@xipkg/icons';
import { ModalCloseButton } from '@xipkg/modal';
import { useMedia } from 'pkg.utils';

const menuLabels = ['Главная', 'Личные данные', 'Безопасность'];

type HeaderPropsT = {
  activeItem: number | 'menu';
  showContent: boolean;
  setShowContent: Dispatch<SetStateAction<boolean>>;
};

export const Header = ({ activeItem, showContent, setShowContent }: HeaderPropsT) => {
  const isMobile = useMedia('(max-width: 719px)');

  return (
    <div className="relative h-[40px] sm:mt-4 flex w-full justify-start items-center">
      {isMobile && showContent && (
        <button onClick={() => setShowContent(false)} className="h-10 w-10 p-2 bg-transparent">
          <ArrowLeft />
        </button>
      )}
      {isMobile && showContent && (
        <span className="ml-4 font-semibold">{menuLabels[Number(activeItem)]}</span>
      )}
      <ModalCloseButton
        variant="full"
        className="h-10 w-10 ml-auto sm:absolute bg-transparent flex p-2 sm:top-0 xl:top-0 right-[16px] sm:right-0 xl:right-[-56px]"
      >
        <Close />
      </ModalCloseButton>
    </div>
  );
};
