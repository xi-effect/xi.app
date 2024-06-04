import { Account, Exit, Home, Key, Palette } from '@xipkg/icons';
import { useMedia } from 'pkg.utils';
import React, { Dispatch, SetStateAction } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { createQueryString, deleteQuery } from 'pkg.router.url';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

type ItemT = {
  name: string;
  query: string;
};

const options: ItemT[] = [
  {
    name: 'Главная',
    query: 'home',
  },
  {
    name: 'Личные данные',
    query: 'personalInfo',
  },
  {
    name: 'Персонализация',
    query: 'personalisation',
  },
  {
    name: 'Безопасность',
    query: 'security',
  },
  // {
  //   name: 'Звук и видео',
  // },
];

type ItemPropsT = {
  index: number;
  item: ItemT;
  onMenuItemChange: (index: number, query: string) => void;
};

const Item = ({ index, item, onMenuItemChange }: ItemPropsT) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isMobile = useMedia('(max-width: 719px)');
  const category = searchParams.get('category');
  const isActive = category === item.query && !isMobile;

  const getIconClassName = (q: string) =>
    `transition-colors ease-in ${q === category ? 'fill-brand-80' : 'group-hover:fill-brand-80'}`;

  const iconsDict: React.ReactNode[] = [
    <Home className={getIconClassName('home')} />,
    <Account className={getIconClassName('personalInfo')} />,
    <Palette className={getIconClassName('personalisation')} />,
    <Key className={getIconClassName('security')} />,
    // <SoundTwo className={getIconClassName(4)} />,
  ];

  const handleClick = () => {
    onMenuItemChange(index, item.query);
    router.push(
      `${pathname}?${createQueryString(searchParams, 'category', item.query ? String(item.query) : '')}`,
    );
  };

  return (
    <button
      type="button"
      onClick={() => handleClick()}
      className={`${
        isActive
          ? 'bg-brand-0 text-brand-80'
          : 'text-gray-90 hover:bg-brand-0 hover:text-brand-80 bg-transparent'
      } group flex h-[40px] w-full flex-row items-center rounded-lg p-2 transition-colors ease-in  hover:cursor-pointer`}
      key={index.toString()}
    >
      {iconsDict[index]}
      <span className="pl-2 text-[14px] font-normal">{item.name}</span>
    </button>
  );
};

type MenuPropsT = {
  setActiveContent: Dispatch<SetStateAction<number>>;
  setShowContent: Dispatch<SetStateAction<boolean>>;
  setActiveQuery: Dispatch<SetStateAction<string>>;
  onExit: () => void;
};

export const Menu = ({ setActiveContent, setActiveQuery, setShowContent, onExit }: MenuPropsT) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const handleMenuItem = (index: number, query: string) => {
    setActiveQuery(query);
    setActiveContent(index);
    setShowContent(true);
  };

  const handleExit = () => {
    const updatedParams = deleteQuery(deleteQuery(searchParams, 'profileIsOpen'), 'category');
    router.replace(`${pathname}?${updatedParams}`);
    if (onExit) onExit();
  };

  return (
    <div className="flex w-full flex-col gap-1 sm:w-[220px]">
      {options.map((item, index) => (
        <Item item={item} index={index} key={index} onMenuItemChange={handleMenuItem} />
      ))}
      <button
        type="button"
        onClick={() => handleExit()}
        className="text-gray-60 hover:bg-red-0 group mt-10 flex h-[40px] w-full flex-row items-center rounded-lg bg-transparent p-2 transition-colors ease-in hover:cursor-pointer hover:text-red-100"
      >
        <Exit className="transition-colors ease-in group-hover:fill-red-100" />
        <span className="pl-2 text-[14px] font-normal">Выйти</span>
      </button>
    </div>
  );
};
