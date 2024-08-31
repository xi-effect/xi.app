import { useMedia } from 'pkg.utils.client';
import React from 'react';
import { useInterfaceStore } from '../../interfaceStore';
import { ItemPropsT } from './types';

export const MenuItem = ({ index, item }: ItemPropsT) => {
  const isMobile = useMedia('(max-width: 719px)');
  const page = useInterfaceStore((state) => state.page);
  const setIsMenu = useInterfaceStore((state) => state.setIsMenu);
  const setPage = useInterfaceStore((state) => state.setPage);
  const isCloseActive = useInterfaceStore((state) => state.isCloseActive);
  const setIsAnimate = useInterfaceStore((state) => state.setIsAnimate);

  const isActive = page === index && !isMobile;

  const handleChangePage = () => {
    if (isCloseActive) {
      setPage(index);
      setIsMenu(false);
    }

    if (!isActive) {
      setIsAnimate(true);

      setTimeout(() => {
        setIsAnimate(false);
      }, 2000);
    }
  };

  return (
    <button
      type="button"
      onClick={handleChangePage}
      className={`${
        isActive
          ? 'bg-brand-0 text-brand-80'
          : 'text-gray-90 hover:bg-brand-0 hover:text-brand-80 bg-transparent'
      } group flex h-[40px] w-full flex-row items-center rounded-lg px-2 py-2.5 transition-colors ease-in hover:cursor-pointer`}
      key={index.toString()}
    >
      <span className="pl-2 text-[14px] font-normal">{item.name}</span>
    </button>
  );
};
