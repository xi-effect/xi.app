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
      onClick={() => onMenuItemChange(index)}
      className={`${
        isActive
          ? 'bg-brand-0 text-brand-80'
          : 'bg-transparent text-gray-90 hover:bg-brand-0 hover:text-brand-80'
      } group h-[40px] w-full p-2 flex flex-row items-center rounded-lg transition-colors ease-in  hover:cursor-pointer`}
      key={index.toString()}
    >
      <span className="text-[14px] font-normal pl-2">{item.name}</span>
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
    <div className="w-full sm:w-[220px] flex flex-col gap-1">
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
        // onClick={() => handleExit()}
        className="bg-transparent group mt-10 h-[40px] w-full p-2 flex flex-row items-center rounded-lg text-gray-60 transition-colors ease-in hover:bg-brand-0 hover:text-red-100 hover:cursor-pointer"
      >
        <span className="text-[14px] font-normal pl-2">Удалить сообщество</span>
      </button>
    </div>
  );
};
