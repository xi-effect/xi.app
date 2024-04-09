import React, { useCallback } from 'react';
import { Input } from '@xipkg/input';
import { Search } from '@xipkg/icons';
import debounce from 'lodash/debounce';
import Breadcrumbs from './Breadcrumbs';

interface HeaderProps {
  onSearch: (searchValue: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch }) => {
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.trim().toLowerCase();
    debouncedSearch(value);
  };

  const debouncedSearch = useCallback(
    debounce((value) => {
      onSearch(value);
    }, 700),
    [],
  );

  // Временная логика отображения хлебных крошек
  const shouldShowBreadcrumbs = true;

  const breadcrumbs = [
    { title: 'МИПК И. Фёдорова', href: '/home' },
    { title: 'Объявления', href: '/announcements' },
    { title: 'Объявления', href: '/announcements' },
    { title: 'Объявления', href: '/announcements' },
  ];

  return (
    <div className="flex-col py-4 max-[520px]:py-7 sm:py-8">
      <Breadcrumbs isVisible={shouldShowBreadcrumbs} breadcrumbs={breadcrumbs} />
      <div className="flex items-end justify-between ">
        <h1 className="text-3xl font-semibold max-[520px]:text-2xl sm:inline-block sm:text-4xl">
          Объявления
        </h1>
        <div className="relative hidden w-[250px] md:block">
          <Input
            className="border-gray-30 size-full h-8 border-2 pb-3 pl-7 pr-2 pt-2 text-sm placeholder:text-base"
            placeholder="Поиск"
            before={
              <Search className="fill-gray-60 absolute -left-1 -top-1 flex h-4 w-4 items-center" />
            }
            onChange={(event) => {
              handleSearch(event);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
