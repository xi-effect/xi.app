import { Account, Home, Palette, Key, SoundTwo, Exit } from '@xipkg/icons';
import React, { Dispatch, SetStateAction } from 'react';

type ItemT = {
  name: string;
};

const options: ItemT[] = [
  {
    name: 'Главная',
  },
  {
    name: 'Личные данные',
  },
  // {
  //   name: 'Внешний вид',
  // },
  {
    name: 'Безопасность',
  },
  // {
  //   name: 'Звук и видео',
  // },
];

type ItemPropsT = {
  index: number;
  item: ItemT;
  activeContent: number;
  onMenuItemChange: (value: number) => void;
};

const Item = ({ index, item, activeContent, onMenuItemChange }: ItemPropsT) => {
  const isActive = activeContent === index;

  const getIconClassName = (i: number) =>
    `transition-colors ease-in ${
      i === activeContent ? 'fill-brand-80' : 'group-hover:fill-brand-80'
    }`;

  const iconsDict: React.ReactNode[] = [
    <Home className={getIconClassName(0)} />,
    <Account className={getIconClassName(1)} />,
    // <Palette className={getIconClassName(2)} />,
    <Key className={getIconClassName(3)} />,
    // <SoundTwo className={getIconClassName(4)} />,
  ];

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
      {iconsDict[index]}
      <span className="text-[14px] font-normal pl-2">{item.name}</span>
    </button>
  );
};

type MenuPropsT = {
  activeContent: number;
  setActiveContent: Dispatch<SetStateAction<number>>;
  onExit: () => void;
};

export const Menu = ({ activeContent, setActiveContent, onExit }: MenuPropsT) => {
  const handleMenuItem = (index: number) => {
    setActiveContent(index);
    console.log('index', index);
  };

  const handleExit = () => {
    if (onExit) onExit();
  };

  return (
    <div className="w-[220px] flex flex-col gap-1">
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
        onClick={() => handleExit()}
        className="bg-transparent group mt-10 h-[40px] w-full p-2 flex flex-row items-center rounded-lg text-gray-60 transition-colors ease-in hover:bg-brand-0 hover:text-red-100 hover:cursor-pointer"
      >
        <Exit className="transition-colors ease-in group-hover:fill-red-100" />
        <span className="text-[14px] font-normal pl-2">Выйти</span>
      </button>
    </div>
  );
};
