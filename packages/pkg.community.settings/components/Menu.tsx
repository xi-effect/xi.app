import { useMedia } from 'pkg.utils';
import React, { Dispatch, SetStateAction } from 'react';

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
    name: 'История активности',
  },
  {
    name: 'Участники',
  },
  {
    name: 'Приглашения',
  },
];

type ItemPropsT = {
  index: number;
  item: ItemT;
  activeContent: number;
  onMenuItemChange: (value: number) => void;
};

const Item = ({ index, item, activeContent, onMenuItemChange }: ItemPropsT) => {
  const isMobile = useMedia('(max-width: 719px)');

  const isActive = activeContent === index && !isMobile;

  return (
    <button
      type="button"
      onClick={() => onMenuItemChange(index)}
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

type MenuPropsT = {
  activeContent: number;
  setActiveContent: Dispatch<SetStateAction<number>>;
  setShowContent: Dispatch<SetStateAction<boolean>>;
};

export const Menu = ({ activeContent, setActiveContent, setShowContent }: MenuPropsT) => {
  const handleMenuItem = (index: number) => {
    setActiveContent(index);
    setShowContent(true);
  };

  return (
    <div className="flex w-full flex-col gap-1 sm:w-[220px]">
      {options.map((item, index) => (
        <Item
          item={item}
          index={index}
          key={index}
          activeContent={activeContent}
          onMenuItemChange={handleMenuItem}
        />
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
};
