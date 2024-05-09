import { useMedia } from 'pkg.utils';
import React from 'react';
import { useInterfaceStore } from '../interfaceStore';

type ItemT = {
  name: string;
};

const options: ItemT[] = [
  {
    name: 'Обзор',
  },
  {
    name: 'Роли',
  },
  {
    name: 'Участники',
  },
];

type ItemPropsT = {
  index: number;
  item: ItemT;
};

const Item = ({ index, item }: ItemPropsT) => {
  const isMobile = useMedia('(max-width: 719px)');
  const page = useInterfaceStore((state) => state.page);
  const setPage = useInterfaceStore((state) => state.setPage);
  const isCloseActive = useInterfaceStore((state) => state.isCloseActive);
  const setIsAnimate = useInterfaceStore((state) => state.setIsAnimate);

  const isActive = page === index && !isMobile;

  const handleChangePage = () => {
    if (isCloseActive) {
      setPage(index);
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
      } group flex h-[40px] w-full flex-row items-center rounded-lg p-2 transition-colors ease-in  hover:cursor-pointer`}
      key={index.toString()}
    >
      <span className="pl-2 text-[14px] font-normal">{item.name}</span>
    </button>
  );
};

export const Menu = () => (
  <div className="flex w-full flex-col gap-1 sm:mt-[56px] sm:w-[220px]">
    {options.map((item, index) => (
      <Item item={item} index={index} key={index} />
    ))}
    <button
      type="button"
      // onClick={() => handleExit()}
      className="text-gray-60 hover:bg-brand-0 group mt-10 flex h-[40px] w-full flex-row items-center rounded-lg bg-transparent p-2 transition-colors ease-in hover:cursor-pointer hover:text-red-100"
    >
      <span className="pl-2 text-[14px] font-normal">Удалить сообщество</span>
    </button>
  </div>
);
