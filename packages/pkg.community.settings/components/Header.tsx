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
    <div className="relative h-[40px] sm:pb-4 flex w-full justify-start items-center">
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
        className="w-10 h-10 ml-auto xl:ml-0 xl:absolute bg-transparent flex p-2 right-0 xl:right-[-56px]"
      >
        <Close />
      </ModalCloseButton>
    </div>
  );
};
